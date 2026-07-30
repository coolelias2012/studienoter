"""
grafer.py
---------
Her laver vi to grafer med matplotlib og gemmer dem som billedfiler:

  1) portefoeljevaerdi.png  - din samlede vaerdi over tid (fra history.csv)
  2) afkast_per_aktie.png   - et soejlediagram med afkast for hver aktie

Hvorfor gemmer vi som billeder i stedet for at vise dem paa skaermen?
Fordi programmet nogle gange koerer et sted uden skaerm (fx en server).
Billedfiler kan du altid aabne bagefter. Det er ogsaa nemmere at dele.
"""

# VIGTIGT: vi vaelger "Agg"-motoren FOER vi importerer pyplot.
# "Agg" tegner direkte til en fil og kraever ingen skaerm.
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from historik import laes_historik


def tegn_vaerdi_over_tid(filnavn="portefoeljevaerdi.png"):
    """
    Tegner en linjegraf over porteføljens vaerdi ud fra history.csv.
    Kraever mindst 2 snapshots for at give mening (ellers er der
    ingen "linje" at tegne - kun et enkelt punkt).
    """
    datoer, vaerdier = laes_historik()

    if len(vaerdier) < 2:
        print("  (Springer vaerdi-graf over - koer programmet et par "
              "gange mere, saa der er flere punkter at tegne.)")
        return

    # Lav en ny, tom tegning.
    plt.figure(figsize=(9, 5))

    # marker="o" saetter en lille prik paa hvert datapunkt.
    plt.plot(datoer, vaerdier, marker="o")

    plt.title("Min porteføljevaerdi over tid")
    plt.xlabel("Dato")
    plt.ylabel("Vaerdi (kr)")
    plt.xticks(rotation=45)   # drej datoerne saa de ikke overlapper
    plt.grid(True, alpha=0.3) # svage hjaelpelinjer
    plt.tight_layout()        # soerg for at intet bliver klippet af

    plt.savefig(filnavn)
    plt.close()               # ryd op efter os
    print(f"  Graf gemt: '{filnavn}'")


def tegn_afkast_per_aktie(resultater, filnavn="afkast_per_aktie.png"):
    """
    Tegner et soejlediagram med afkast i procent for hver aktie.
    Groenne soejler = plus, roede soejler = minus. Nemt at aflaese.
    """
    # Tag kun de aktier hvor vi faktisk har en kurs.
    med_kurs = [r for r in resultater if not r["mangler_kurs"]]

    if len(med_kurs) == 0:
        print("  (Ingen afkast-graf - der er ingen kurser at tegne.)")
        return

    navne = [r["ticker"] for r in med_kurs]
    afkast = [r["afkast_pct"] for r in med_kurs]

    # Vaelg farve ud fra om afkastet er plus eller minus.
    farver = ["green" if a >= 0 else "red" for a in afkast]

    plt.figure(figsize=(9, 5))
    plt.bar(navne, afkast, color=farver)

    plt.title("Afkast per aktie (i procent)")
    plt.xlabel("Aktie")
    plt.ylabel("Afkast (%)")
    plt.axhline(0, color="black", linewidth=0.8)  # streg ved 0%
    plt.grid(True, axis="y", alpha=0.3)
    plt.tight_layout()

    plt.savefig(filnavn)
    plt.close()
    print(f"  Graf gemt: '{filnavn}'")
