"""
hent_data.py
------------
Denne fil henter kurshistorik for MANGE aktier.

Naar man skal hente ~500 aktier, skal man goere det ROLIGT. Henter man
for mange paa en gang (parallelt), sker der to ting:
  - netvaerket og certifikat-tjekket bliver overbelastet (curl-fejl)
  - yfinance's lille cache-fil bliver der kamp om ("unable to open
    database file")

Derfor goer vi det pænt og stille:
  - faa aktier ad gangen (smaa "hold")
  - EN ad gangen i stedet for parallelt (threads=False)
  - en pause mellem hvert hold
  - og en ekstra runde til sidst for dem der alligevel glippede

Det er lidt langsommere, men til gengaeld virker det. :)
"""

import os
import time

import yfinance as yf


# Vi beder yfinance om at lægge sin cache et sted vi HELT SIKKERT maa
# skrive (en mappe ved siden af koden). Det fjerner "unable to open
# database file"-fejlen.
_CACHE_MAPPE = os.path.join(os.path.dirname(__file__), ".yf_cache")
os.makedirs(_CACHE_MAPPE, exist_ok=True)
try:
    yf.set_tz_cache_location(_CACHE_MAPPE)
except Exception:
    pass  # ikke alle yfinance-versioner har denne funktion - saa springer vi den over


def _del_op(liste, stoerrelse):
    """Deler en lang liste op i mindre bidder af 'stoerrelse' hver.
    Fx [1,2,3,4,5] med stoerrelse 2 -> [1,2], [3,4], [5]."""
    for i in range(0, len(liste), stoerrelse):
        yield liste[i:i + stoerrelse]


def hent_kurshistorik(tickers, periode="1y", hold_stoerrelse=20, pause=1.5):
    """
    Henter dagsluttekurser (Close) for alle tickers over den valgte periode.

    Returnerer en dict: { "AAPL": <liste af slutkurser>, ... }
    Tickers vi ikke kan hente (efter to forsoeg), springes bare over.
    """
    resultat = {}

    # ---- Foerste runde: alle tickers ----
    print(f"  Henter {len(tickers)} aktier roligt ({hold_stoerrelse} ad gangen) ...")
    _hent_i_hold(tickers, periode, hold_stoerrelse, pause, resultat)

    # ---- Anden runde: dem vi IKKE fik i foerste omgang ----
    mangler = [t for t in tickers if t not in resultat]
    if mangler:
        print(f"  {len(mangler)} kom ikke med. Holder en lille pause og "
              f"proever dem igen ...")
        time.sleep(3)
        # Endnu mindre hold og laengere pause i anden runde.
        _hent_i_hold(mangler, periode, max(8, hold_stoerrelse // 2),
                     pause + 1.0, resultat)

    print(f"  Faerdig med at hente: {len(resultat)} af {len(tickers)} aktier.")
    return resultat


def _hent_i_hold(tickers, periode, hold_stoerrelse, pause, resultat):
    """Henter en liste af tickers hold for hold og lægger dem i 'resultat'."""
    hold = list(_del_op(tickers, hold_stoerrelse))

    for nummer, gruppe in enumerate(hold, start=1):
        print(f"    Hold {nummer}/{len(hold)} ...", end=" ", flush=True)

        data = _hent_et_hold(gruppe, periode)

        fik = 0
        if data is not None:
            for ticker in gruppe:
                serie = _traek_close_ud(data, ticker, len(gruppe))
                if serie is not None and len(serie) > 0:
                    resultat[ticker] = serie
                    fik += 1

        print(f"fik {fik}/{len(gruppe)} (i alt {len(resultat)}).")

        # Pause mellem hold, saa vi ikke overbelaster noget. Ikke efter sidste.
        if nummer < len(hold):
            time.sleep(pause)


def _hent_et_hold(gruppe, periode, forsoeg=3):
    """Henter et enkelt hold med op til 'forsoeg' gentagelser ved fejl."""
    for n in range(forsoeg):
        try:
            data = yf.download(
                gruppe,
                period=periode,
                interval="1d",
                group_by="ticker",   # saa vi kan slaa op pr. ticker bagefter
                auto_adjust=True,    # justerer for udbytte/aktiesplit
                threads=False,       # EN ad gangen - meget mere stabilt
                progress=False,      # ingen fremdriftsbjaelke i terminalen
            )
            if data is not None and not data.empty:
                return data
        except Exception:
            pass  # vi proever igen efter en voksende pause

        # Vent laengere og laengere: 2s, saa 4s, saa 6s ("backoff").
        time.sleep(2 * (n + 1))

    return None


def _traek_close_ud(data, ticker, antal_i_gruppe):
    """
    Finder Close-kurserne for en enkelt ticker i det hentede data.

    yfinance pakker data forskelligt alt efter om vi hentede 1 eller
    flere tickers - derfor de to tilfaelde her.
    """
    try:
        if antal_i_gruppe == 1:
            # Kun en ticker -> kolonnerne er direkte (Close, Open ...).
            serie = data["Close"].dropna()
        else:
            # Flere tickers -> data er grupperet: data[ticker]["Close"].
            serie = data[ticker]["Close"].dropna()
        return list(serie)
    except Exception:
        return None
