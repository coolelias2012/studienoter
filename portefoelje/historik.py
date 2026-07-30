"""
historik.py
-----------
Hver gang du koerer programmet, gemmer vi EN linje i history.csv med
dagens dato og porteføljens vaerdi. Saadan bygger du langsomt en
tidsserie op, som vi senere kan tegne en graf ud fra.

Vi bruger igen Pythons indbyggede csv-modul.
"""

import csv
import os
from datetime import date


HISTORIK_FIL = "history.csv"


def gem_snapshot(totaler, filnavn=HISTORIK_FIL):
    """
    Tilfoejer en linje til history.csv:
      dato, total_koeb, vaerdi_nu, afkast_kr, afkast_pct

    Hvis filen ikke findes endnu, laver vi den og skriver en overskrift.
    """
    # "a" = append (tilfoej). Vi overskriver ALDRIG de gamle linjer.
    fil_findes = os.path.exists(filnavn)

    with open(filnavn, "a", newline="", encoding="utf-8") as fil:
        skriver = csv.writer(fil)

        # Skriv kun overskriften hvis filen er ny.
        if not fil_findes:
            skriver.writerow(
                ["dato", "koebsvaerdi", "vaerdi_nu", "afkast_kr", "afkast_pct"]
            )

        # date.today() giver dagens dato, fx 2026-07-30.
        # round(...) afrunder til 2 decimaler saa filen er paen.
        skriver.writerow([
            date.today().isoformat(),
            round(totaler["total_koeb"], 2),
            round(totaler["total_nu"], 2),
            round(totaler["total_afkast_kr"], 2),
            round(totaler["total_afkast_pct"], 2),
        ])

    print(f"  Snapshot gemt i '{filnavn}'.")


def laes_historik(filnavn=HISTORIK_FIL):
    """
    Laeser alle gemte snapshots tilbage. Bruges af graf-filen.
    Returnerer to lister: datoer og vaerdier.
    """
    datoer = []
    vaerdier = []

    if not os.path.exists(filnavn):
        return datoer, vaerdier  # ingen historik endnu

    with open(filnavn, newline="", encoding="utf-8") as fil:
        laeser = csv.DictReader(fil)
        for raekke in laeser:
            try:
                datoer.append(raekke["dato"])
                vaerdier.append(float(raekke["vaerdi_nu"]))
            except (ValueError, KeyError):
                continue  # spring beskadigede linjer over

    return datoer, vaerdier
