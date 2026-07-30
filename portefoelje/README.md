# 📈 Paper Trading – min aktieportefølje

Et lille Python-projekt der følger en **fiktiv** aktieportefølje ("paper
trading"). Du bruger ingen rigtige penge – du tester bare dine egne
investeringsbegrundelser over tid.

Programmet henter rigtige aktiekurser fra internettet, regner ud hvor godt
det ville være gået, og sammenligner med S&P 500 (det store amerikanske
aktieindeks). Dine egne begrundelser for hvert køb vises sammen med
resultatet, så du kan se om du havde ret. 🙂

---

## Hvad kan det?

1. Henter aktuelle kurser og regner **værdi nu**, **afkast i kroner** og
   **afkast i procent** ud for hver aktie.
2. Viser **totalen** for hele porteføljen.
3. Sammenligner dit samlede afkast med **S&P 500** – klarede du dig bedre
   end bare at købe et bredt indeks?
4. Gemmer et **snapshot** i `history.csv` hver gang du kører programmet, så
   du langsomt bygger en tidsserie op.
5. Laver **grafer** (billedfiler): porteføljeværdi over tid + søjlediagram
   over afkast per aktie.
6. Printer en **pæn tabel** i terminalen (ekstra flot hvis `rich` er
   installeret).

---

## Sådan sætter du det op

Du skal have **Python 3** installeret. Tjek det med:

```bash
python --version
```

### 1. Installer bibliotekerne

Stå i denne mappe (`portefoelje/`) og kør:

```bash
pip install -r requirements.txt
```

Det installerer `yfinance` (kurser), `matplotlib` (grafer) og `rich`
(pæn tabel).

> 💡 Tip: Hvis `pip` ikke virker, prøv `pip3` eller `python -m pip`.

### 2. Ret din portefølje til

Åbn `portfolio.csv` i en teksteditor (eller et regneark). Der ligger 5
eksempel-selskaber. Ret dem til dine egne. Kolonnerne betyder:

| Kolonne       | Betydning                                   | Eksempel     |
|---------------|---------------------------------------------|--------------|
| `ticker`      | Aktiens kode på børsen                       | `AAPL`       |
| `navn`        | Firmaets navn (kun til dig selv)             | `Apple`      |
| `antal`       | Hvor mange aktier du "købte"                 | `5`          |
| `koebsdato`   | Dato du købte (formatet ÅÅÅÅ-MM-DD)          | `2024-01-15` |
| `koebspris`   | Prisen pr. aktie da du købte                 | `185.50`     |
| `begrundelse` | **Din egen tekst** om HVORFOR du valgte den  | `...`        |

> ⚠️ **Vigtigt om ticker:** Amerikanske aktier er nemme (`AAPL`, `MSFT`).
> Danske aktier skal have `.CO` bagefter, fx Novo Nordisk = `NOVO-B.CO`.
> Du kan slå tickers op på [finance.yahoo.com](https://finance.yahoo.com).

### 3. Kør programmet

```bash
python main.py
```

Kør det gerne igen en anden dag – så vokser din historik og grafen bliver
mere spændende.

---

## Hvad bliver lavet, når du kører det?

- `history.csv` – én linje pr. gang du kører (bygger din tidsserie).
- `portefoeljevaerdi.png` – graf over din værdi over tid.
- `afkast_per_aktie.png` – søjlediagram med afkast pr. aktie.

Disse filer bliver **ikke** gemt i Git (se `.gitignore`) – de er dine egne.

---

## Filerne i projektet (og hvad de laver)

Projektet er delt op i små filer, så hver fil kun har ét job. Det gør det
nemmere at forstå:

| Fil                     | Job                                             |
|-------------------------|-------------------------------------------------|
| `main.py`               | "Dirigenten" – kører alt i rigtig rækkefølge    |
| `indlaes_portefolje.py` | Læser `portfolio.csv`                            |
| `hent_priser.py`        | Henter kurser fra internettet (yfinance)        |
| `beregninger.py`        | Regner afkast og S&P 500-sammenligning          |
| `historik.py`           | Gemmer/læser `history.csv`                       |
| `grafer.py`             | Tegner graferne                                 |
| `tabel.py`              | Printer den pæne tabel                           |

Start med at læse `main.py` – den viser rækkefølgen. Klik dig derfra ind i
de andre filer, én ad gangen.

---

## Prøv fejlhåndteringen (sjovt eksperiment)

Programmet er lavet til ikke at gå i stykker, selv når noget går galt.
Prøv det:

- **Ugyldig ticker:** Skriv en aktie der ikke findes, fx `BLABLA123`, i
  `portfolio.csv`. Programmet advarer og springer den over – resten virker.
- **Ingen internet:** Sluk for wifi og kør. Du får pæne advarsler i stedet
  for et grimt krak.
- **Tom fil:** Slet alt i `portfolio.csv` (undtagen overskriften). Du får
  en tydelig besked.

---

## Vigtigt at vide

- Det er **paper trading** – ingen rigtige penge, intet rigtigt køb.
- Kurserne kommer fra Yahoo Finance via `yfinance`. De kan være lidt
  forsinkede, og det er ikke investeringsrådgivning. 🙂
