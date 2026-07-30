"""
indlaes_portefolje.py
---------------------
Denne fil har ET job: at laese din portfolio.csv ind i programmet.

Jeg bruger Pythons indbyggede "csv"-modul. Det er den simpleste maade
at laese en CSV-fil paa, og det foelger allerede med Python - saa vi
behoever ikke installere noget ekstra til det.

En "CSV" er bare en tekstfil hvor vaerdierne er adskilt af komma.
Foerste linje er en overskrift der fortaeller hvad hver kolonne betyder.
"""

import csv
import os


def indlaes(filnavn="portfolio.csv"):
    """
    Laeser portfolio.csv og returnerer en liste af positioner.

    Hver position er en "dict" (en slags opslagsbog) med noeglerne:
      ticker, navn, antal, koebsdato, koebspris, begrundelse

    Vi haandterer de tre fejl som opgaven naevner:
      1) filen findes ikke
      2) filen er tom
      3) en linje har forkerte/manglende tal
    """

    # ---- Fejl 1: findes filen overhovedet? ----
    if not os.path.exists(filnavn):
        # Vi "raiser" (kaster) en fejl med en tydelig dansk besked.
        # Programmet der kalder os kan saa vise beskeden paent.
        raise FileNotFoundError(
            f"Kunne ikke finde filen '{filnavn}'. "
            f"Ligger den i samme mappe som scriptet?"
        )

    positioner = []  # her samler vi alle aktierne

    # "with open(...)" aabner filen og lukker den automatisk bagefter.
    # encoding="utf-8" goer at danske bogstaver (ae, oe, aa) virker.
    with open(filnavn, newline="", encoding="utf-8") as fil:
        laeser = csv.DictReader(fil)  # laeser hver linje som en dict

        # Gaa igennem hver raekke i filen. "nummer" starter ved 2,
        # fordi linje 1 er overskriften (praktisk til fejlbeskeder).
        for nummer, raekke in enumerate(laeser, start=2):

            # Spring helt tomme linjer over
            if not raekke.get("ticker"):
                continue

            # ---- Fejl 3: er tallene gyldige? ----
            # antal og koebspris SKAL kunne laves om til tal.
            try:
                antal = float(raekke["antal"])
                koebspris = float(raekke["koebspris"])
            except (ValueError, KeyError):
                # Vi springer den daarlige linje over og advarer,
                # i stedet for at hele programmet gaar ned.
                print(
                    f"  Advarsel: springer linje {nummer} over "
                    f"('{raekke.get('ticker')}') - antal eller koebspris "
                    f"er ikke et gyldigt tal."
                )
                continue

            # Alt er ok - gem positionen som en ryddelig dict.
            positioner.append({
                "ticker": raekke["ticker"].strip(),
                "navn": raekke.get("navn", "").strip(),
                "antal": antal,
                "koebsdato": raekke.get("koebsdato", "").strip(),
                "koebspris": koebspris,
                "begrundelse": raekke.get("begrundelse", "").strip(),
            })

    # ---- Fejl 2: var filen tom (ingen gyldige linjer)? ----
    if len(positioner) == 0:
        raise ValueError(
            f"Filen '{filnavn}' indeholder ingen gyldige aktier. "
            f"Har du husket at udfylde den?"
        )

    return positioner
