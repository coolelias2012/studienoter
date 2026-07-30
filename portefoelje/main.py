"""
main.py
-------
Dette er "dirigenten". Den koerer de andre filer i den rigtige raekkefoelge.
Naar du vil bruge programmet, koerer du kun DENNE fil:

    python main.py

Raekkefoelgen er:
  1. Laes portfolio.csv
  2. Hent aktuelle kurser
  3. Regn afkast ud (per aktie + total)
  4. Sammenlign med S&P 500
  5. Gem et snapshot i history.csv
  6. Tegn grafer
  7. Print en paen tabel i terminalen

Hver del bor i sin egen fil. Her limer vi det bare sammen.
"""

from indlaes_portefolje import indlaes
from hent_priser import hent_aktuel_kurs
from beregninger import beregn_position, beregn_totaler, sammenlign_med_sp500
from historik import gem_snapshot
from grafer import tegn_vaerdi_over_tid, tegn_afkast_per_aktie
from tabel import vis_tabel


def main():
    print("=" * 60)
    print("PAPER TRADING - portefoelje-tracker")
    print("=" * 60)

    # ---- 1. Laes CSV'en ----
    # Vi pakker det ind i try/except, saa en manglende eller tom fil
    # giver en paen besked i stedet for en grim fejl-udskrift.
    print("\n1) Laeser portfolio.csv ...")
    try:
        positioner = indlaes("portfolio.csv")
    except (FileNotFoundError, ValueError) as fejl:
        print(f"\nFEJL: {fejl}")
        print("Programmet stopper her.")
        return

    print(f"   Fandt {len(positioner)} aktier.")

    # ---- 2. Hent kurser + 3. regn ud ----
    print("\n2) Henter aktuelle kurser fra internettet ...")
    resultater = []
    for position in positioner:
        kurs = hent_aktuel_kurs(position["ticker"])
        resultater.append(beregn_position(position, kurs))

    # ---- 4. Total + S&P 500 ----
    print("\n3) Regner totaler og sammenligner med S&P 500 ...")
    totaler = beregn_totaler(resultater)
    sp500 = sammenlign_med_sp500(resultater)

    # ---- 5. Gem snapshot ----
    print("\n4) Gemmer dagens snapshot ...")
    gem_snapshot(totaler)

    # ---- 6. Tegn grafer ----
    print("\n5) Tegner grafer ...")
    tegn_afkast_per_aktie(resultater)
    tegn_vaerdi_over_tid()

    # ---- 7. Vis tabel ----
    print("\n6) Resultat:")
    vis_tabel(resultater, totaler, sp500)

    print("\nFaerdig! God fornoejelse med at foelge din portefoelje. :)")


# Denne linje betyder: "koer kun main() hvis filen startes direkte".
# Saa importerer vi main.py fra en anden fil, koerer den ikke af sig selv.
if __name__ == "__main__":
    main()
