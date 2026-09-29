# 🤖 Aktie-screener (S&P 500)

En lille "bot" der kigger på alle ~500 aktier i **S&P 500**, giver hver en
**score fra 0 til 100** ud fra tre målbare signaler, og viser hvilke der
lige nu har mest **medvind** og mest **modvind**.

---

## ⚠️ Vigtigt at forstå først

**Denne bot kan IKKE forudsige hvilke aktier der stiger eller falder.**
Det kan ingen — heller ikke de professionelle. Hvis en bot kunne det,
ville den være milliarder værd.

Det botten gør, er at måle hvordan hver aktie har opført sig **indtil nu**
(er den i optrend? stiger den hurtigt? er den overkøbt?) og rangordne dem.
Det er **signaler baseret på fortiden — ikke spådomme om fremtiden**, og
det er **ikke investeringsrådgivning**. Brug det til at lære, ikke til at
satse rigtige penge.

---

## De tre signaler (hvad scoren bygger på)

| Signal | Hvad det måler | Hvorfor |
|--------|----------------|---------|
| **Momentum** | Hvor meget kursen er steget de sidste 1 og 3 måneder | Aktier i bevægelse har ofte en tendens til at fortsætte et stykke tid |
| **Trend** | Ligger kursen over sit 50- og 200-dages gennemsnit? | Over gennemsnittet = peger opad |
| **RSI** | Et tal 0–100: er aktien "overkøbt" (>70) eller "oversolgt" (<30)? | Advarer hvis noget er steget for hurtigt |

De lægges sammen til én **rå score**, og botten laver den så om til en
score fra 0 til 100, hvor **100 = bedre end alle de andre** i feltet.

Du kan selv justere hvor meget hvert signal vejer — se `VAEGT_*`-tallene
øverst i filen `signaler.py`.

---

## Sådan sætter du det op

```bash
cd screener
pip install -r requirements.txt
python main.py
```

Første gang tager det **et par minutter**, fordi den henter kurser for
~500 aktier. Den henter i små "hold" med en pause imellem, så Yahoo
Finance ikke blokerer os.

> 💡 Vil du teste hurtigt? Så kan du nøjes med færre aktier — se
> reservelisten i `hent_liste.py`. Skriv `return RESERVE_LISTE` øverst i
> funktionen `hent_sp500_tickers()`, så bruger den kun ~40 aktier.

---

## Hvad kommer der ud af det?

- En **tabel i terminalen** med top 15 (medvind) og bund 15 (modvind).
- `screener_resultat.csv` — **hele listen** med alle ~500 aktier og deres
  tal, så du kan åbne den i et regneark.
- `screener_diagram.png` — et søjlediagram over top og bund.

---

## Filerne i projektet

| Fil | Job |
|-----|-----|
| `main.py` | Dirigenten — kører alt i rækkefølge |
| `hent_liste.py` | Henter listen over S&P 500 (fra Wikipedia) |
| `hent_data.py` | Henter kurshistorik for alle aktier (i hold) |
| `signaler.py` | Regner momentum, trend, RSI og score ud |
| `visning.py` | Tabeller, CSV-fil og diagram |

Start med at læse `main.py`, og klik dig derfra ind i de andre.

---

## Håndtering af fejl

- **Intet internet / Wikipedia driller:** botten bruger en indbygget
  reserveliste, så den stadig kører.
- **En aktie kan ikke hentes:** den springes bare over — resten kører.
- **For kort historik:** aktier med under ~200 dages data får ingen score
  (der er ikke nok til at regne 200-dages gennemsnittet).
- **Bliver du blokeret ("rate limited")?** Vent lidt, eller sæt
  `hold_stoerrelse` lavere og `pause` højere i `main.py`.

---

## Idéer til at bygge videre (spørg mig gerne)

- Vise resultatet som en **side du kan åbne på telefonen** (som porteføljen).
- **Gemme historik** så du kan se om de høje scorer faktisk klarede sig godt.
- Tilføje flere signaler (fx afstand til 52-ugers top).
