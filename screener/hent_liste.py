"""
hent_liste.py
-------------
Denne fil skaffer listen over de ca. 500 aktier i S&P 500.

Hvor kommer listen fra? Fra Wikipedia! Der findes en tabel med alle
S&P 500-selskaber, og biblioteket "pandas" kan lave en tabel om fra HTML
med funktionen read_html().

Vi henter selve siden med "requests" i stedet for at lade pandas hente
den. Hvorfor? Fordi requests medbringer sine egne "certifikater" (via
pakken certifi), saa det virker ogsaa paa en Mac. Ellers faar man tit
fejlen "SSL: CERTIFICATE_VERIFY_FAILED".

Hvis internettet er nede (eller Wikipedia driller), falder vi tilbage
til en kortere indbygget liste, saa programmet stadig kan koere.
"""

import io

import pandas as pd
import requests



# Reserveliste: ~40 kendte S&P 500-aktier. Bruges KUN hvis vi ikke kan
# hente den fulde liste fra internettet. Saa virker programmet altid.
RESERVE_LISTE = [
    "AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "BRK-B",
    "JPM", "V", "JNJ", "WMT", "PG", "MA", "HD", "CVX", "KO", "PEP",
    "ABBV", "BAC", "COST", "MRK", "AVGO", "MCD", "ADBE", "CRM", "NFLX",
    "AMD", "INTC", "DIS", "NKE", "PFE", "TMO", "CSCO", "ORCL", "ACN",
    "ABT", "XOM", "QCOM", "TXN",
]


def hent_sp500_tickers():
    """
    Returnerer en liste af ticker-koder for S&P 500.

    Proever foerst Wikipedia. Lykkes det ikke, bruges reservelisten.
    """
    url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"

    try:
        # Hent selve HTML-siden med requests. En "User-Agent" faar
        # Wikipedia til at behandle os som en almindelig browser.
        svar = requests.get(
            url,
            headers={"User-Agent": "Mozilla/5.0 (aktie-screener)"},
            timeout=15,
        )
        svar.raise_for_status()  # kaster en fejl hvis siden ikke kom ok

        # read_html finder ALLE tabeller i HTML'en og giver os en liste.
        # io.StringIO pakker teksten, som nyere pandas gerne vil have det.
        # Den foerste tabel [0] er selskabslisten.
        tabeller = pd.read_html(io.StringIO(svar.text))
        tabel = tabeller[0]

        # Kolonnen "Symbol" indeholder tickerne.
        tickers = tabel["Symbol"].tolist()

        # Yahoo Finance skriver punktum-tickers med bindestreg.
        # Fx bliver "BRK.B" til "BRK-B". Vi retter det her.
        tickers = [t.replace(".", "-") for t in tickers]

        print(f"  Hentede {len(tickers)} tickers fra Wikipedia.")
        return tickers

    except Exception as fejl:
        # Her lander vi hvis der ikke er internet, eller siden er aendret.
        print(f"  Kunne ikke hente listen fra internettet ({fejl}).")
        print(f"  Bruger i stedet reservelisten paa {len(RESERVE_LISTE)} aktier.")
        return RESERVE_LISTE
