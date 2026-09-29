"""
main.py
-------
Dirigenten for aktie-screeneren. Koer denne fil:

    python main.py

Den goer fem ting:
  1. Henter listen over S&P 500-aktier
  2. Henter kurshistorik for dem alle
  3. Regner de tre signaler ud og giver hver aktie en score
  4. Viser top 15 (medvind) og bund 15 (modvind) + gemmer hele listen
  5. Tegner et diagram

VIGTIGT: Det er signaler baseret paa fortiden - IKKE en spaadom om
fremtiden og IKKE investeringsraadgivning. Ingen bot kan vide hvilke
aktier der stiger eller falder.
"""

from hent_liste import hent_sp500_tickers
from hent_data import hent_kurshistorik
from signaler import analyser_aktie, lav_scoreboard
from visning import vis_top_og_bund, gem_csv, tegn_diagram


def main():
    print("=" * 60)
    print("AKTIE-SCREENER  (S&P 500)")
    print("=" * 60)
    print("OBS: Dette er signaler fra fortiden - ikke spaadomme og")
    print("ikke investeringsraadgivning. Ingen kan forudsige markedet.")
    print("=" * 60)

    # 1. Hent listen
    print("\n1) Henter listen over S&P 500 ...")
    tickers = hent_sp500_tickers()

    # 2. Hent kurshistorik
    print("\n2) Henter kurshistorik (kan tage et par minutter) ...")
    data = hent_kurshistorik(tickers, periode="1y")

    if len(data) == 0:
        print("\nFEJL: Kunne ikke hente kursdata for nogen aktier.")
        print("Tjek din internetforbindelse og proev igen.")
        return

    # 3. Analyser + score
    print(f"\n3) Analyserer {len(data)} aktier ...")
    analyser = []
    for ticker, kurser in data.items():
        resultat = analyser_aktie(ticker, kurser)
        if resultat is not None:
            analyser.append(resultat)

    if len(analyser) == 0:
        print("Ingen aktier havde nok historik til en analyse.")
        return

    scoreboard = lav_scoreboard(analyser)
    print(f"   {len(scoreboard)} aktier fik en score.")

    # 4. Vis + gem
    print("\n4) Resultat:\n")
    vis_top_og_bund(scoreboard, antal=15)
    print()
    gem_csv(scoreboard)

    # 5. Diagram
    print("\n5) Tegner diagram ...")
    tegn_diagram(scoreboard, antal=15)

    print("\nFaerdig! Husk: signaler, ikke spaadomme. :)")


if __name__ == "__main__":
    main()
