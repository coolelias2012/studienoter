"""
signaler.py
-----------
Hjertet i botten. Her regner vi de tre signaler ud for hver aktie og
laegger dem sammen til EN score.

VIGTIGT: det her er IKKE en spaadom. Vi maaler kun hvordan aktien har
opfoert sig indtil nu (medvind eller modvind). Ingen kan vide fremtiden.

De tre signaler:
  1) MOMENTUM - hvor meget er kursen steget for nylig? (1 og 3 maaneder)
  2) TREND    - ligger kursen over sine gennemsnit? (så peger den opad)
  3) RSI      - er aktien "overkoebt" (steget for hurtigt) eller
                "oversolgt" (faldet meget)? Et tal mellem 0 og 100.

Alle funktioner arbejder paa en simpel liste af slutkurser, saa de er
nemme at teste - ogsaa uden internet.
"""

# ---- Vaegte: hvor meget hvert signal betyder. Ret gerne i dem! ----
# Momentum vejer tungest, fordi det historisk er det staerkeste signal.
VAEGT_MOM_3M = 1.0     # 3-maaneders momentum (i procent) ganges med dette
VAEGT_MOM_1M = 0.5     # 1-maaneds momentum
POINT_TREND = 10       # point for hvert opfyldt trend-krav
STRAF_OVERKOEBT = 15   # traekkes fra hvis RSI > 70 (steget for hurtigt)
BONUS_OVERSOLGT = 10   # laegges til hvis RSI < 30 (kan maaske bounce)

# Hvor mange handelsdage svarer perioderne cirka til:
DAGE_1M = 21
DAGE_3M = 63
MINDST_DAGE = 200      # vi skal bruge mindst saa mange dage (til 200-gns.)


def gennemsnit(kurser, antal):
    """Beregner det simple gennemsnit (SMA) af de sidste 'antal' kurser."""
    udsnit = kurser[-antal:]
    return sum(udsnit) / len(udsnit)


def beregn_rsi(kurser, periode=14):
    """
    Beregner RSI (Relative Strength Index) - et tal mellem 0 og 100.

    Ideen: sammenlign de dage kursen STEG med de dage den FALDT.
      - RSI over 70 = "overkoebt" (er steget meget, maaske for meget)
      - RSI under 30 = "oversolgt" (er faldet meget)
      - RSI omkring 50 = neutralt

    Vi bruger den simple udgave (gennemsnit af stigninger/fald).
    """
    if len(kurser) < periode + 1:
        return None

    stigninger = []
    fald = []
    # Kig paa de sidste 'periode' aendringer fra dag til dag.
    for i in range(-periode, 0):
        aendring = kurser[i] - kurser[i - 1]
        if aendring >= 0:
            stigninger.append(aendring)
            fald.append(0)
        else:
            stigninger.append(0)
            fald.append(-aendring)  # gem faldet som et positivt tal

    gns_op = sum(stigninger) / periode
    gns_ned = sum(fald) / periode

    if gns_ned == 0:
        return 100.0  # kun stigninger -> maksimalt overkoebt

    rs = gns_op / gns_ned
    rsi = 100 - (100 / (1 + rs))
    return rsi


def analyser_aktie(ticker, kurser):
    """
    Regner alle signaler ud for EN aktie og laegger dem sammen til en
    "raa score". Returnerer en dict, eller None hvis der er for lidt data.
    """
    if kurser is None or len(kurser) < MINDST_DAGE:
        return None  # for kort historik til at sige noget fornuftigt

    pris = kurser[-1]
    sma50 = gennemsnit(kurser, 50)
    sma200 = gennemsnit(kurser, 200)
    rsi = beregn_rsi(kurser)

    # Momentum i procent
    mom_1m = (pris / kurser[-DAGE_1M] - 1) * 100
    mom_3m = (pris / kurser[-DAGE_3M] - 1) * 100

    # Trend: tre ja/nej-spoergsmaal
    over_50 = pris > sma50
    over_200 = pris > sma200
    golden = sma50 > sma200          # "golden cross" = laengere optrend

    # ---- Læg det hele sammen til en raa score ----
    raa = 0.0
    raa += mom_3m * VAEGT_MOM_3M
    raa += mom_1m * VAEGT_MOM_1M
    raa += POINT_TREND if over_50 else -POINT_TREND
    raa += POINT_TREND if over_200 else -POINT_TREND
    raa += POINT_TREND if golden else -POINT_TREND

    # RSI som justering
    if rsi is not None:
        if rsi > 70:
            raa -= STRAF_OVERKOEBT
        elif rsi < 30:
            raa += BONUS_OVERSOLGT

    # En kort tekst der beskriver trenden
    if over_50 and over_200:
        trend_tekst = "optrend"
    elif not over_50 and not over_200:
        trend_tekst = "nedtrend"
    else:
        trend_tekst = "blandet"

    # Et flag hvis RSI er i yderpunkterne
    if rsi is None:
        flag = ""
    elif rsi > 70:
        flag = "overkoebt"
    elif rsi < 30:
        flag = "oversolgt"
    else:
        flag = ""

    return {
        "ticker": ticker,
        "pris": pris,
        "mom_1m": mom_1m,
        "mom_3m": mom_3m,
        "rsi": rsi,
        "trend": trend_tekst,
        "flag": flag,
        "raa_score": raa,
    }


def lav_scoreboard(analyser):
    """
    Tager alle de analyserede aktier og giver hver en SCORE fra 0 til 100.

    Score = hvor stor en andel af de andre aktier denne slaar paa raa score.
    Score 100 = bedst i hele feltet. Score 0 = svagest.
    Det goer tallene nemme at sammenligne ("bedre end 95 % af de andre").
    """
    if not analyser:
        return []

    raa_liste = sorted(a["raa_score"] for a in analyser)
    antal = len(raa_liste)

    for a in analyser:
        # Hvor mange har en raa score der er lavere eller lig med denne?
        under = sum(1 for r in raa_liste if r <= a["raa_score"])
        a["score"] = round(under / antal * 100)

    # Sorter saa den bedste (hoejeste score) staar oeverst.
    return sorted(analyser, key=lambda a: a["score"], reverse=True)
