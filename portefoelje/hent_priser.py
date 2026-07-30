"""
hent_priser.py
--------------
Denne fil henter aktiekurser fra internettet med biblioteket yfinance.

yfinance er gratis og kraever ingen "API-noegle" (adgangskode).
Det henter tallene fra Yahoo Finance.

Jeg henter hver aktie for sig i en loekke med "try/except".
Det er lidt langsommere end at hente alt paa en gang, men til gengaeld
kan EN daarlig ticker ikke vaelte hele programmet - og koden er
nemmere at forstaa.
"""

import yfinance as yf


def hent_aktuel_kurs(ticker):
    """
    Henter den seneste kurs for EN ticker.

    Returnerer et tal (kursen) hvis det lykkes,
    eller None hvis tickeren ikke findes / der er en fejl.
    """
    try:
        aktie = yf.Ticker(ticker)

        # Vi henter de sidste 5 dages historik og tager den seneste
        # slutkurs ("Close"). Vi bruger 5 dage - ikke 1 - fordi
        # boersen er lukket i weekender og helligdage.
        historik = aktie.history(period="5d")

        # Hvis tickeren ikke findes, faar vi en TOM tabel tilbage.
        if historik.empty:
            print(f"  Advarsel: fandt ingen kurs for '{ticker}'. "
                  f"Er tickeren stavet rigtigt?")
            return None

        # "Close"-kolonnen er slutkurserne. iloc[-1] er den sidste (nyeste).
        seneste_kurs = float(historik["Close"].iloc[-1])
        return seneste_kurs

    except Exception as fejl:
        # Her lander vi typisk hvis der IKKE er internet.
        # Vi viser fejlen kort, men lader programmet koere videre.
        print(f"  Advarsel: kunne ikke hente '{ticker}' ({fejl}).")
        return None


def hent_historisk_kurs_serie(ticker, startdato):
    """
    Henter kurserne for en ticker fra 'startdato' og frem til i dag.

    Bruges til at sammenligne med S&P 500. Returnerer en pandas-serie
    (en slags liste med datoer som "noegler"), eller None ved fejl.
    """
    try:
        aktie = yf.Ticker(ticker)
        historik = aktie.history(start=startdato)

        if historik.empty:
            print(f"  Advarsel: ingen historik for '{ticker}'.")
            return None

        return historik["Close"]

    except Exception as fejl:
        print(f"  Advarsel: kunne ikke hente historik for '{ticker}' ({fejl}).")
        return None
