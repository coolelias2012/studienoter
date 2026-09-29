"""
visning.py
----------
Viser resultatet:
  - to tabeller i terminalen: top (medvind) og bund (modvind)
  - gemmer ALLE aktier i screener_resultat.csv (saa du kan se hele listen)
  - tegner et soejlediagram over top og bund

Vi bruger "rich" til pæne tabeller hvis det er installeret, ellers
falder vi tilbage til almindelig tekst.
"""

import csv

# matplotlib: vaelg "Agg" foer pyplot, saa det virker uden skaerm.
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

try:
    from rich.console import Console
    from rich.table import Table
    HAR_RICH = True
except ImportError:
    HAR_RICH = False


def _rsi_tekst(rsi):
    return "-" if rsi is None else f"{rsi:.0f}"


def vis_top_og_bund(scoreboard, antal=15):
    """Viser de 'antal' bedste og de 'antal' svageste aktier."""
    top = scoreboard[:antal]
    bund = scoreboard[-antal:][::-1]  # de svageste, men vend saa svagest er nederst

    if HAR_RICH:
        console = Console()
        console.print(_lav_rich_tabel(top,
            f"MEDVIND - top {antal} (hoejeste score)", "green"))
        console.print(_lav_rich_tabel(bund,
            f"MODVIND - bund {antal} (laveste score)", "red"))
    else:
        _lav_tekst_tabel(top, f"MEDVIND - top {antal}")
        _lav_tekst_tabel(bund, f"MODVIND - bund {antal}")


def _lav_rich_tabel(raekker, titel, farve):
    tabel = Table(title=titel, title_style=f"bold {farve}")
    tabel.add_column("Ticker", style="cyan", no_wrap=True)
    tabel.add_column("Score", justify="right")
    tabel.add_column("3 mdr", justify="right")
    tabel.add_column("1 mdr", justify="right")
    tabel.add_column("Trend")
    tabel.add_column("RSI", justify="right")
    tabel.add_column("Flag")

    for a in raekker:
        mom_farve = "green" if a["mom_3m"] >= 0 else "red"
        tabel.add_row(
            a["ticker"],
            str(a["score"]),
            f"[{mom_farve}]{a['mom_3m']:+.1f}%[/{mom_farve}]",
            f"{a['mom_1m']:+.1f}%",
            a["trend"],
            _rsi_tekst(a["rsi"]),
            a["flag"],
        )
    return tabel


def _lav_tekst_tabel(raekker, titel):
    print("\n" + "=" * 60)
    print(titel)
    print("=" * 60)
    print(f"{'Ticker':<10}{'Score':>6}{'3mdr':>9}{'1mdr':>9}  {'Trend':<9}{'RSI':>4}  Flag")
    for a in raekker:
        print(f"{a['ticker']:<10}{a['score']:>6}{a['mom_3m']:>8.1f}%"
              f"{a['mom_1m']:>8.1f}%  {a['trend']:<9}{_rsi_tekst(a['rsi']):>4}  {a['flag']}")


def gem_csv(scoreboard, filnavn="screener_resultat.csv"):
    """Gemmer ALLE aktier (hele listen) i en CSV-fil, sorteret efter score."""
    with open(filnavn, "w", newline="", encoding="utf-8") as fil:
        skriver = csv.writer(fil)
        skriver.writerow(
            ["ticker", "score", "mom_3m_pct", "mom_1m_pct", "rsi", "trend", "flag", "pris"]
        )
        for a in scoreboard:
            skriver.writerow([
                a["ticker"], a["score"],
                round(a["mom_3m"], 2), round(a["mom_1m"], 2),
                round(a["rsi"], 1) if a["rsi"] is not None else "",
                a["trend"], a["flag"], round(a["pris"], 2),
            ])
    print(f"  Hele listen gemt i '{filnavn}' ({len(scoreboard)} aktier).")


def tegn_diagram(scoreboard, antal=15, filnavn="screener_diagram.png"):
    """Tegner top og bund som et vandret soejlediagram."""
    top = scoreboard[:antal]
    bund = scoreboard[-antal:]

    udvalg = bund + top  # svagest nederst, staerkest oeverst
    navne = [a["ticker"] for a in udvalg]
    scorer = [a["score"] for a in udvalg]
    farver = ["#0f9d63" if a["score"] >= 50 else "#d1495b" for a in udvalg]

    plt.figure(figsize=(9, 10))
    plt.barh(navne, scorer, color=farver)
    plt.title(f"Screener: top {antal} (medvind) og bund {antal} (modvind)")
    plt.xlabel("Score (0-100)")
    plt.axvline(50, color="black", linewidth=0.8)  # midterlinje
    plt.grid(True, axis="x", alpha=0.3)
    plt.tight_layout()
    plt.savefig(filnavn)
    plt.close()
    print(f"  Diagram gemt: '{filnavn}'")
