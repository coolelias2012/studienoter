"""
hent_data.py
------------
Denne fil henter kurshistorik for MANGE aktier paa en gang.

Naar man skal hente 500 aktier, maa man IKKE spoerge om dem alle paa
en gang - saa bliver man blokeret ("rate limited"). Derfor deler vi dem
op i mindre "hold" (chunks) og henter et hold ad gangen, med en lille
pause imellem.

yfinance kan hente flere tickers i et enkelt kald med yf.download().
Det er meget hurtigere end at hente en aktie ad gangen.
"""

import time
import yfinance as yf


def _del_op(liste, stoerrelse):
    """Deler en lang liste op i mindre bidder af 'stoerrelse' hver.
    Fx [1,2,3,4,5] med stoerrelse 2 -> [1,2], [3,4], [5]."""
    for i in range(0, len(liste), stoerrelse):
        yield liste[i:i + stoerrelse]


def hent_kurshistorik(tickers, periode="1y", hold_stoerrelse=50, pause=1.0):
    """
    Henter dagsluttekurser (Close) for alle tickers over den valgte periode.

    Returnerer en dict: { "AAPL": <liste af slutkurser>, ... }
    Tickers vi ikke kunne hente, springes bare over.
    """
    resultat = {}
    hold = list(_del_op(tickers, hold_stoerrelse))

    print(f"  Henter {len(tickers)} aktier i {len(hold)} hold "
          f"(a {hold_stoerrelse} ad gangen) ...")

    for nummer, gruppe in enumerate(hold, start=1):
        print(f"    Hold {nummer}/{len(hold)} ...", end=" ", flush=True)

        # Vi forsoeger op til 3 gange, hvis det fejler (fx daarligt net).
        data = _hent_et_hold(gruppe, periode)

        if data is None:
            print("sprunget over (fejl).")
            continue

        # Traek Close-kurserne ud for hver ticker i holdet.
        for ticker in gruppe:
            serie = _traek_close_ud(data, ticker, len(gruppe))
            if serie is not None and len(serie) > 0:
                resultat[ticker] = serie

        print(f"ok ({len(resultat)} i alt).")

        # Lille pause saa vi ikke bliver blokeret. Ikke efter sidste hold.
        if nummer < len(hold):
            time.sleep(pause)

    return resultat


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
                threads=True,        # hent flere paa en gang (hurtigere)
                progress=False,      # ingen fremdriftsbjaelke i terminalen
            )
            if data is not None and not data.empty:
                return data
        except Exception:
            pass  # vi proever igen efter en voksende pause

        # Vent laengere og laengere: 2s, saa 4s, saa 8s ("backoff").
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
