"""
beregninger.py
--------------
Her laver vi regnestykkerne. Ingen internet-ting her - kun ren matematik
paa de tal vi allerede har hentet. Det goer filen nem at teste og forstaa.

De vigtigste tal for hver aktie:
  koebsvaerdi  = antal * koebspris     (hvad du gav for aktierne)
  vaerdi_nu    = antal * aktuel_kurs   (hvad de er vaerd i dag)
  afkast_kr    = vaerdi_nu - koebsvaerdi
  afkast_pct   = afkast_kr / koebsvaerdi * 100
"""

from hent_priser import hent_historisk_kurs_serie


def beregn_position(position, aktuel_kurs):
    """
    Tager EN position (fra CSV'en) + dens aktuelle kurs,
    og returnerer en ny dict med alle udregninger lagt til.

    Hvis aktuel_kurs er None (kunne ikke hentes), markerer vi
    positionen som "mangler_kurs", saa resten af programmet ved det.
    """
    koebsvaerdi = position["antal"] * position["koebspris"]

    if aktuel_kurs is None:
        # Vi kunne ikke hente kursen - returner det vi ved,
        # og saet resultat-felterne til None.
        return {
            **position,          # ** kopierer alle de gamle felter med
            "aktuel_kurs": None,
            "koebsvaerdi": koebsvaerdi,
            "vaerdi_nu": None,
            "afkast_kr": None,
            "afkast_pct": None,
            "mangler_kurs": True,
        }

    vaerdi_nu = position["antal"] * aktuel_kurs
    afkast_kr = vaerdi_nu - koebsvaerdi
    afkast_pct = (afkast_kr / koebsvaerdi) * 100

    return {
        **position,
        "aktuel_kurs": aktuel_kurs,
        "koebsvaerdi": koebsvaerdi,
        "vaerdi_nu": vaerdi_nu,
        "afkast_kr": afkast_kr,
        "afkast_pct": afkast_pct,
        "mangler_kurs": False,
    }


def beregn_totaler(resultater):
    """
    Laegger alle positionerne sammen til en samlet total.
    Vi springer positioner over som mangler en kurs.
    """
    total_koeb = 0.0
    total_nu = 0.0

    for r in resultater:
        if r["mangler_kurs"]:
            continue
        total_koeb += r["koebsvaerdi"]
        total_nu += r["vaerdi_nu"]

    total_afkast_kr = total_nu - total_koeb

    # Pas paa division med nul (hvis alt manglede kurs).
    if total_koeb > 0:
        total_afkast_pct = (total_afkast_kr / total_koeb) * 100
    else:
        total_afkast_pct = 0.0

    return {
        "total_koeb": total_koeb,
        "total_nu": total_nu,
        "total_afkast_kr": total_afkast_kr,
        "total_afkast_pct": total_afkast_pct,
    }


def _find_kurs_paa_dato(kurs_serie, dato_tekst):
    """
    Hjaelpefunktion: find S&P-kursen paa (eller taettest paa) en koebsdato.

    Boersen er lukket i weekender, saa den praecise dato findes maaske ikke.
    Derfor tager vi den foerste handelsdag paa eller EFTER koebsdatoen.
    (Understregningen "_" foran navnet betyder: kun til intern brug her.)
    """
    # Behold kun de datoer der er dato-koebsdatoen eller senere.
    efter = kurs_serie[kurs_serie.index >= dato_tekst]
    if len(efter) == 0:
        return None
    return float(efter.iloc[0])


def sammenlign_med_sp500(resultater):
    """
    Svarer paa spoergsmaalet: "Havde jeg klaret mig bedre end bare
    at koebe et bredt indeks (S&P 500)?"

    Ide: for hver aktie forestiller vi os, at DE SAMME penge var brugt
    paa S&P 500 paa DEN SAMME koebsdato. Saa er det aebler-mod-aebler.

    Returnerer en dict med hvad S&P 500 ville have givet, eller None
    hvis vi ikke kunne hente indekset (fx intet internet).
    """
    # Find den tidligste koebsdato, saa vi kun henter det vi skal bruge.
    datoer = [r["koebsdato"] for r in resultater if r["koebsdato"]]
    if not datoer:
        return None
    tidligste = min(datoer)

    # Hent S&P 500 ("^GSPC") fra den tidligste koebsdato og frem.
    sp_serie = hent_historisk_kurs_serie("^GSPC", tidligste)
    if sp_serie is None:
        return None

    # Den nyeste S&P-kurs (i dag).
    sp_nu = float(sp_serie.iloc[-1])

    sp_koeb_total = 0.0   # hvad vi "investerede" (samme som porteføljen)
    sp_nu_total = 0.0     # hvad det ville vaere vaerd i S&P i dag

    for r in resultater:
        # Spring positioner over uden kurs eller dato.
        if r["mangler_kurs"] or not r["koebsdato"]:
            continue

        sp_kurs_ved_koeb = _find_kurs_paa_dato(sp_serie, r["koebsdato"])
        if sp_kurs_ved_koeb is None:
            continue

        # Hvor meget voksede S&P siden koebet? (fx 1.20 = plus 20%)
        vaekstfaktor = sp_nu / sp_kurs_ved_koeb

        # Samme penge som vi brugte paa aktien:
        penge = r["koebsvaerdi"]
        sp_koeb_total += penge
        sp_nu_total += penge * vaekstfaktor

    if sp_koeb_total == 0:
        return None

    sp_afkast_kr = sp_nu_total - sp_koeb_total
    sp_afkast_pct = (sp_afkast_kr / sp_koeb_total) * 100

    return {
        "sp_nu_total": sp_nu_total,
        "sp_afkast_kr": sp_afkast_kr,
        "sp_afkast_pct": sp_afkast_pct,
    }
