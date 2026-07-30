"""
tabel.py
--------
Her printer vi resultatet paent i terminalen.

Hvis biblioteket "rich" er installeret, laver vi en flot farvet tabel.
Hvis det IKKE er installeret, falder vi tilbage til en simpel tabel
lavet med almindelig tekst. Programmet virker altsaa i begge tilfaelde.

Det moenster kaldes "graceful degradation": det pyntede er en bonus,
men mangler det, gaar programmet ikke i stykker.
"""

# Vi proever at importere rich. Lykkes det ikke, saetter vi et flag.
try:
    from rich.console import Console
    from rich.table import Table
    HAR_RICH = True
except ImportError:
    HAR_RICH = False


def _kr(tal):
    """Formaterer et tal som kroner, fx 1234.5 -> '1.234,50 kr'.
    (Dansk stil: punktum for tusinder, komma for decimaler.)"""
    if tal is None:
        return "-"
    tekst = f"{tal:,.2f}"                       # fx '1,234.50'
    tekst = tekst.replace(",", "X").replace(".", ",").replace("X", ".")
    return f"{tekst} kr"


def _pct(tal):
    """Formaterer et tal som procent med fortegn, fx 12.3 -> '+12,3 %'."""
    if tal is None:
        return "-"
    return f"{tal:+.1f} %".replace(".", ",")


def vis_tabel(resultater, totaler, sp500):
    """Vaelger den paene (rich) eller den simple tabel."""
    if HAR_RICH:
        _vis_med_rich(resultater, totaler, sp500)
    else:
        _vis_simpelt(resultater, totaler, sp500)


def _vis_med_rich(resultater, totaler, sp500):
    """Den flotte version med farver og rammer."""
    console = Console()
    tabel = Table(title="Min aktieportefølje (paper trading)")

    # Kolonnerne i tabellen
    tabel.add_column("Ticker", style="cyan", no_wrap=True)
    tabel.add_column("Navn")
    tabel.add_column("Antal", justify="right")
    tabel.add_column("Koebspris", justify="right")
    tabel.add_column("Kurs nu", justify="right")
    tabel.add_column("Vaerdi nu", justify="right")
    tabel.add_column("Afkast kr", justify="right")
    tabel.add_column("Afkast %", justify="right")

    for r in resultater:
        if r["mangler_kurs"]:
            # Vis raekken, men skriv tydeligt at kursen mangler.
            tabel.add_row(
                r["ticker"], r["navn"], f"{r['antal']:g}",
                _kr(r["koebspris"]), "[red]mangler[/red]",
                "-", "-", "-",
            )
            continue

        # Groen tekst ved plus, roed ved minus.
        farve = "green" if r["afkast_kr"] >= 0 else "red"
        tabel.add_row(
            r["ticker"], r["navn"], f"{r['antal']:g}",
            _kr(r["koebspris"]), _kr(r["aktuel_kurs"]),
            _kr(r["vaerdi_nu"]),
            f"[{farve}]{_kr(r['afkast_kr'])}[/{farve}]",
            f"[{farve}]{_pct(r['afkast_pct'])}[/{farve}]",
        )

    console.print(tabel)
    _vis_begrundelser(resultater, console)
    _vis_bund(totaler, sp500, console)


def _vis_simpelt(resultater, totaler, sp500):
    """Reserveversionen uden rich - kun almindelig tekst."""
    print("\n" + "=" * 60)
    print("MIN AKTIEPORTEFØLJE (paper trading)")
    print("=" * 60)

    for r in resultater:
        print(f"\n{r['ticker']} - {r['navn']} ({r['antal']:g} stk)")
        if r["mangler_kurs"]:
            print("   Kurs kunne ikke hentes.")
        else:
            print(f"   Kurs nu:   {_kr(r['aktuel_kurs'])}")
            print(f"   Vaerdi nu: {_kr(r['vaerdi_nu'])}")
            print(f"   Afkast:    {_kr(r['afkast_kr'])} ({_pct(r['afkast_pct'])})")

    _vis_begrundelser(resultater, None)
    _vis_bund(totaler, sp500, None)


def _vis_begrundelser(resultater, console):
    """Viser din egen begrundelse for hver aktie - det vigtige felt!"""
    overskrift = "\nDINE BEGRUNDELSER (hvorfor du valgte aktien):"
    if console:
        console.print(overskrift, style="bold")
    else:
        print(overskrift)

    for r in resultater:
        print(f"  - {r['ticker']}: {r['begrundelse']}")


def _vis_bund(totaler, sp500, console):
    """Viser totalen og sammenligningen med S&P 500."""
    linje = "\n" + "-" * 60
    print(linje)
    print("TOTAL FOR HELE PORTEFØLJEN")
    print(f"  Koebt for:  {_kr(totaler['total_koeb'])}")
    print(f"  Vaerd nu:   {_kr(totaler['total_nu'])}")
    print(f"  Afkast:     {_kr(totaler['total_afkast_kr'])} "
          f"({_pct(totaler['total_afkast_pct'])})")

    print("\nSAMMENLIGNING MED S&P 500 (^GSPC)")
    if sp500 is None:
        print("  Kunne ikke hente S&P 500 lige nu.")
        return

    print("  Hvis de samme penge var lagt i S&P 500 paa de samme datoer:")
    print(f"  Ville vaere vaerd: {_kr(sp500['sp_nu_total'])} "
          f"({_pct(sp500['sp_afkast_pct'])})")

    # Konklusionen: hvem vandt? "forskel" er i procentpoint.
    forskel = totaler["total_afkast_pct"] - sp500["sp_afkast_pct"]
    # Vis kun stoerrelsen (uden fortegn) - ordet BEDRE/DAARLIGERE siger retningen.
    stoerrelse = f"{abs(forskel):.1f}".replace(".", ",")
    if forskel >= 0:
        print(f"  ==> Du klarede dig {stoerrelse} procentpoint BEDRE "
              f"end indekset. Flot!")
    else:
        print(f"  ==> Du klarede dig {stoerrelse} procentpoint DAARLIGERE "
              f"end indekset denne gang.")
