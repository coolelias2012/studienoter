'use strict';
window.FAG_MATEMATIK = {
  name:'Matematik', icon:'🔢', color:'#2563eb',
  description:'Tal, algebra, geometri og statistik – fra 0. klasse til universitetet.',
  levels:{
    '0-3':{
      title:'0–3. klasse',
      description:'Tælle, lægge sammen, trække fra og møde de første former.',
      topics:[
        {id:'m03-1',title:'Tal 0–10',icon:'🔢',tags:['tal','tælle'],body:`<div class="def-box">Tallene 0 til 10 er de første tal vi lærer. Tæl på fingre: 1, 2, 3 … 10.</div>`},
        {id:'m03-2',title:'Tal 0–20',icon:'🔢',tags:['tal','tælle'],body:`<div class="def-box">Efter 10 kommer 11, 12 … 20. Øv dig i at tælle frem og tilbage.</div><div class="example-box"><span class="ex-label">Eks.</span> Tæl baglæns: 20, 19, 18 … 0</div>`},
        {id:'m03-3',title:'Tal 0–100',icon:'💯',tags:['hundrede','tiere'],body:`<div class="formula-box">10 tiere = 100</div><p>Tæl i tiere: 10, 20, 30 … 100. Fem tiere = 50.</p>`},
        {id:'m03-4',title:'Titalssystemet',icon:'🏗️',tags:['tiere','eenere'],body:`<div class="def-box">37 = <strong>3 tiere</strong> + <strong>7 eenere</strong>. Hvert ciffer har en pladsværdi.</div><div class="example-box"><span class="ex-label">Eks.</span> 45 = 40 + 5</div>`},
        {id:'m03-5',title:'Ordenstal',icon:'🥇',tags:['ordenstal','rækkefølge'],body:`<div class="def-box">1. (første), 2. (anden), 3. (tredje), 4. (fjerde), 5. (femte) …</div><p>Bruges til at beskrive rækkefølge: "Jeg kom 2. i løbet."</p>`},
        {id:'m03-6',title:'Sammenligning > < =',icon:'⚖️',tags:['større','mindre'],body:`<div class="formula-box">3 &lt; 7 &nbsp; 9 &gt; 4 &nbsp; 5 = 5</div><p>Krokodillen spiser det <strong>største</strong> tal. Munden peger mod det største.</p>`},
        {id:'m03-7',title:'Lige og ulige tal',icon:'✌️',tags:['lige','ulige'],body:`<div class="def-box"><strong>Lige:</strong> 2, 4, 6, 8, 10 … (kan deles i 2 ens grupper)<br><strong>Ulige:</strong> 1, 3, 5, 7, 9 … (én bliver til overs)</div>`},
        {id:'m03-8',title:'Addition op til 10',icon:'➕',tags:['plus','lægge sammen'],body:`<div class="formula-box">a + b = c</div><div class="example-box"><span class="ex-label">Eks.</span> 3 + 4 = 7 &nbsp;|&nbsp; 5 + 2 = 7</div><p>Tæl fremad fra det største tal.</p>`},
        {id:'m03-9',title:'Addition op til 20',icon:'➕',tags:['plus','bro til 10'],body:`<div class="def-box">Bro-til-10: 8 + 7 → 8+2=10, 10+5=<strong>15</strong></div>`},
        {id:'m03-10',title:'Addition med overflytning',icon:'➕',tags:['overflytning'],body:`<div class="example-box"><span class="ex-label">Eks.</span> 17 + 6 = 17+3+3 = 20+3 = <strong>23</strong></div><p>Når sum af eenerne ≥ 10 overflytter vi 1 tier.</p>`},
        {id:'m03-11',title:'Subtraktion op til 10',icon:'➖',tags:['minus','trækker fra'],body:`<div class="formula-box">a − b = c</div><div class="example-box"><span class="ex-label">Eks.</span> 9 − 4 = 5 &nbsp;|&nbsp; 7 − 3 = 4</div>`},
        {id:'m03-12',title:'Subtraktion op til 20',icon:'➖',tags:['minus'],body:`<div class="def-box">Hop-til-10: 15−8 → 15−5=10, 10−3=<strong>7</strong></div>`},
        {id:'m03-13',title:'Subtraktion med lån',icon:'➖',tags:['lån','subtraktion'],body:`<div class="example-box"><span class="ex-label">Eks.</span> 32−17: lån en tier → 12−7=5, 2−1=1 → <strong>15</strong></div>`},
        {id:'m03-14',title:'Dobbelttallene',icon:'✌️',tags:['dobbelt','plus'],body:`<div class="formula-box">n + n = 2n</div><div class="example-box"><span class="ex-label">Eks.</span> 4+4=8 &nbsp; 6+6=12 &nbsp; 7+7=14</div>`},
        {id:'m03-15',title:'Halvering',icon:'✂️',tags:['halvering','deling'],body:`<div class="formula-box">halvdelen af n = n÷2</div><div class="example-box"><span class="ex-label">Eks.</span> Halvdelen af 12 = 6 &nbsp; halvdelen af 20 = 10</div>`},
        {id:'m03-16',title:'Multiplikation – intro',icon:'✖️',tags:['gange','gentaget addition'],body:`<div class="def-box">3 × 4 = 4 + 4 + 4 = <strong>12</strong>. Multiplikation er gentaget addition.</div>`},
        {id:'m03-17',title:'2-tabellen',icon:'✖️',tags:['2-tabellen'],body:`<div class="formula-box">2×1=2 · 2×2=4 · 2×3=6 · 2×4=8 · 2×5=10 · 2×6=12 · 2×7=14 · 2×8=16 · 2×9=18 · 2×10=20</div>`},
        {id:'m03-18',title:'5-tabellen',icon:'✖️',tags:['5-tabellen'],body:`<div class="formula-box">5×1=5 · 5×2=10 · 5×3=15 · 5×4=20 · 5×5=25 · … · 5×10=50</div><p>Slutter altid på 0 eller 5.</p>`},
        {id:'m03-19',title:'10-tabellen',icon:'✖️',tags:['10-tabellen'],body:`<div class="formula-box">10×n = sæt et 0 bag n</div><div class="example-box"><span class="ex-label">Eks.</span> 10×7=70 &nbsp; 10×9=90</div>`},
        {id:'m03-20',title:'Division som deling',icon:'➗',tags:['dele','division'],body:`<div class="def-box">12 ÷ 3 = 4 fordi 3×4=12. Del 12 kager i 3 grupper → 4 til hver.</div>`},
        {id:'m03-21',title:'2D-former',icon:'🔷',tags:['geometri','former'],body:`<div class="def-box"><strong>Trekant</strong> 3 sider · <strong>Firkant</strong> 4 sider · <strong>Cirkel</strong> 0 hjørner · <strong>Pentagon</strong> 5 sider</div>`},
        {id:'m03-22',title:'3D-figurer',icon:'🧊',tags:['3D','rumfigurer'],body:`<div class="def-box"><strong>Terning</strong> 6 flader · <strong>Kugle</strong> rund · <strong>Cylinder</strong> 2 cirkler · <strong>Kegle</strong> spids top</div>`},
        {id:'m03-23',title:'Symmetri',icon:'🪞',tags:['symmetri','spejling'],body:`<div class="def-box">En figur er symmetrisk hvis den ser ens ud på begge sider af en akse.</div><p>Fold et hjerte på midten → begge sider ens ✓</p>`},
        {id:'m03-24',title:'Mønster og gentagelse',icon:'🔁',tags:['mønster','talmønster'],body:`<div class="example-box"><span class="ex-label">Eks.</span> 2, 4, 6, 8, <strong>?</strong> → 10 &nbsp;|&nbsp; 🔴🔵🔴🔵🔴 → 🔵</div><p>Find reglen og fortsæt.</p>`},
        {id:'m03-25',title:'Længde og måling',icon:'📏',tags:['cm','meter','måling'],body:`<div class="formula-box">100 cm = 1 m</div><div class="example-box"><span class="ex-label">Eks.</span> En lineal er 30 cm. En dør er ca. 2 m.</div>`},
        {id:'m03-26',title:'Vægt',icon:'⚖️',tags:['gram','kg','vægt'],body:`<div class="formula-box">1 000 g = 1 kg</div><div class="example-box"><span class="ex-label">Eks.</span> Et æble ≈ 150 g. En elev ≈ 30 kg.</div>`},
        {id:'m03-27',title:'Rumfang – væske',icon:'🥛',tags:['liter','dl','rumfang'],body:`<div class="formula-box">10 dl = 1 liter</div><div class="example-box"><span class="ex-label">Eks.</span> En mælkekartón = 1 l. Et glas ≈ 2 dl.</div>`},
        {id:'m03-28',title:'Tid – klokken',icon:'🕐',tags:['klokken','minutter','timer'],body:`<div class="def-box">60 min = 1 time. Hel: 3:00 · Halv: 2:30 · Kvart over: 2:15 · Kvart i: 2:45</div>`},
        {id:'m03-29',title:'Tid – kalender',icon:'📅',tags:['uger','måneder','år'],body:`<div class="formula-box">7 dage = 1 uge · 12 måneder = 1 år · 365 dage = 1 år</div>`},
        {id:'m03-30',title:'Penge',icon:'💶',tags:['kroner','øre','penge'],body:`<div class="formula-box">100 øre = 1 kr.</div><div class="example-box"><span class="ex-label">Eks.</span> Is koster 12 kr. Giver 20 kr. → 20−12 = <strong>8 kr. tilbage</strong></div>`},
      ]
    },
    '4-6':{
      title:'4–6. klasse',
      description:'Store tal, brøker, decimaltal, procent og grundlæggende geometri.',
      topics:[
        {id:'m46-1',title:'Store tal',icon:'🔢',tags:['millioner','hundrede-tusinde'],body:`<div class="def-box">Tusinde (1.000) · Ti-tusinde (10.000) · Hundrede-tusinde (100.000) · Million (1.000.000)</div><div class="example-box"><span class="ex-label">Eks.</span> 347.628 = 3 ht + 4 tt + 7 t + 628</div>`},
        {id:'m46-2',title:'Afrunding',icon:'🎯',tags:['afrunding','nærmeste tier'],body:`<div class="def-box">Se på eenerne: ≥5 → op, &lt;5 → ned.</div><div class="example-box"><span class="ex-label">Eks.</span> 47→50 · 62→60 · 85→90</div>`},
        {id:'m46-3',title:'De fire regningsarter',icon:'🧮',tags:['plus','minus','gange','dividere'],body:`<div class="formula-box">+ addition &nbsp; − subtraktion &nbsp; × multiplikation &nbsp; ÷ division</div>`},
        {id:'m46-4',title:'Regnerækkefølge',icon:'📋',tags:['PMDAS','parenteser'],body:`<div class="def-box"><strong>P</strong>arenteser → <strong>P</strong>otenser → <strong>M</strong>ult/Div → <strong>A</strong>dd/Sub</div><div class="example-box"><span class="ex-label">Eks.</span> 2+3×4 = 2+12 = <strong>14</strong> (ikke 20!)</div>`},
        {id:'m46-5',title:'Multiplikationstabeller 1–10',icon:'✖️',tags:['tabeller','udenad'],body:`<div class="def-box">Lær 1–10 udenad. 9-trick: 9×7=63 (6+3=9✓).</div><div class="example-box"><span class="ex-label">Eks.</span> 7×8=56 · 6×9=54 · 8×8=64</div>`},
        {id:'m46-6',title:'Skriftlig multiplikation',icon:'✖️',tags:['multiplikation'],body:`<div class="example-box"><span class="ex-label">Eks.</span> 34×7: 4×7=28 (skriv 8, ov. 2); 3×7+2=23 → <strong>238</strong></div>`},
        {id:'m46-7',title:'Division med rest',icon:'➗',tags:['rest','division'],body:`<div class="formula-box">a ÷ b = kvotient rest r</div><div class="example-box"><span class="ex-label">Eks.</span> 17÷5 = 3 rest 2 (5×3=15, 17−15=2)</div>`},
        {id:'m46-8',title:'Lang division',icon:'➗',tags:['lang division'],body:`<div class="def-box">Divider → Multiplicer → Subtraher → Bring ned → gentag.</div><div class="example-box"><span class="ex-label">Eks.</span> 156÷4: 15÷4=3 r3; 36÷4=9 → <strong>39</strong></div>`},
        {id:'m46-9',title:'Negative tal',icon:'➖',tags:['negative','tallinjen'],body:`<div class="def-box">Tal under 0: −1, −5, −100. Bruges til temperatur og gæld.</div><div class="example-box"><span class="ex-label">Eks.</span> −5°C er koldere end 0°C. −3 &lt; 2.</div>`},
        {id:'m46-10',title:'Koordinatsystemet',icon:'📊',tags:['koordinater','x-akse','y-akse'],body:`<div class="formula-box">Punkt (x, y): x = vandret, y = lodret. (0,0) = origo.</div><div class="example-box"><span class="ex-label">Eks.</span> (3,5) → 3 til højre, 5 op.</div>`},
        {id:'m46-11',title:'Brøker – intro',icon:'🍕',tags:['brøk','tæller','nævner'],body:`<div class="formula-box">a/b: a=tæller (vi har), b=nævner (i alt)</div><div class="example-box"><span class="ex-label">Eks.</span> ¾ pizza = 3 af 4 stykker.</div>`},
        {id:'m46-12',title:'Brøker – sammenligning',icon:'⚖️',tags:['brøker','fælles nævner'],body:`<div class="def-box">Gør nævnerne ens, sammenlign tællerne.</div><div class="example-box"><span class="ex-label">Eks.</span> ½ vs ⅓: 3/6 > 2/6 → ½ &gt; ⅓</div>`},
        {id:'m46-13',title:'Brøkaddition – ens nævner',icon:'➕',tags:['brøker','addition'],body:`<div class="formula-box">a/n + b/n = (a+b)/n</div><div class="example-box"><span class="ex-label">Eks.</span> 2/7 + 3/7 = <strong>5/7</strong></div>`},
        {id:'m46-14',title:'Brøkaddition – forskellig nævner',icon:'➕',tags:['fælles nævner'],body:`<div class="formula-box">a/b + c/d = (ad+cb)/(bd)</div><div class="example-box"><span class="ex-label">Eks.</span> 1/3+1/4 = 4/12+3/12 = <strong>7/12</strong></div>`},
        {id:'m46-15',title:'Decimaltal',icon:'🔢',tags:['decimaltal','komma'],body:`<div class="def-box">3,7 = 3 hele og 7 tiendedele. Kommaet skiller hele fra dele.</div><div class="example-box"><span class="ex-label">Eks.</span> 0,5=½ · 0,25=¼ · 1,75=1¾</div>`},
        {id:'m46-16',title:'Decimaltal – regning',icon:'🧮',tags:['decimaltal','regning'],body:`<div class="example-box"><span class="ex-label">Eks.</span> 2,3+1,7=4,0 · 3,5×2=7,0 · 4,8÷4=1,2</div><p>Pas på kommaplacering ved × og ÷!</p>`},
        {id:'m46-17',title:'Brøk ↔ Decimaltal',icon:'🔄',tags:['omregning','brøk','decimal'],body:`<div class="formula-box">Brøk→decimal: divider tæller med nævner</div><div class="example-box"><span class="ex-label">Eks.</span> 3/4=0,75 · 1/5=0,20 · 2/3≈0,667</div>`},
        {id:'m46-18',title:'Procent',icon:'%',tags:['procent','hundredele'],body:`<div class="formula-box">1% = 1/100 = 0,01</div><div class="example-box"><span class="ex-label">Eks.</span> 25% af 80 = 0,25×80 = <strong>20</strong></div>`},
        {id:'m46-19',title:'Primtal og faktorisering',icon:'🔬',tags:['primtal','faktor'],body:`<div class="def-box"><strong>Primtal</strong>: kun deleligt med 1 og sig selv. 2, 3, 5, 7, 11, 13 …</div><div class="example-box"><span class="ex-label">Eks.</span> 12 = 2×2×3</div>`},
        {id:'m46-20',title:'Kvadrattal og kvadratrod',icon:'²',tags:['kvadrat','rod'],body:`<div class="formula-box">n² = n×n &nbsp; √(n²) = n</div><div class="example-box"><span class="ex-label">Eks.</span> 4²=16 · 5²=25 · √25=5 · √144=12</div>`},
        {id:'m46-21',title:'Areal – rektangel',icon:'▭',tags:['areal','rektangel'],body:`<div class="formula-box">A = l × b</div><div class="example-box"><span class="ex-label">Eks.</span> l=5 cm, b=3 cm → A=15 cm²</div>`},
        {id:'m46-22',title:'Areal – trekant',icon:'🔺',tags:['areal','trekant'],body:`<div class="formula-box">A = ½ × g × h</div><div class="example-box"><span class="ex-label">Eks.</span> g=8, h=5 → A=<strong>20 cm²</strong></div>`},
        {id:'m46-23',title:'Areal – cirkel',icon:'⭕',tags:['areal','cirkel','π'],body:`<div class="formula-box">A = π × r²</div><div class="example-box"><span class="ex-label">Eks.</span> r=3 → A≈<strong>28,3 cm²</strong></div>`},
        {id:'m46-24',title:'Omkreds',icon:'🔲',tags:['omkreds','perimeter'],body:`<div class="formula-box">Rektangel: O=2l+2b &nbsp; Cirkel: O=2πr</div><div class="example-box"><span class="ex-label">Eks.</span> 4×3 rektangel: O=<strong>14 cm</strong></div>`},
        {id:'m46-25',title:'Volumen – kasse',icon:'📦',tags:['volumen','kasse'],body:`<div class="formula-box">V = l × b × h</div><div class="example-box"><span class="ex-label">Eks.</span> l=4, b=3, h=2 → V=<strong>24 cm³</strong></div>`},
        {id:'m46-26',title:'Middelværdi (gennemsnit)',icon:'📊',tags:['gennemsnit','statistik'],body:`<div class="formula-box">Gns = summen / antal</div><div class="example-box"><span class="ex-label">Eks.</span> 5,8,6,9 → 28÷4=<strong>7</strong></div>`},
        {id:'m46-27',title:'Median og typetal',icon:'📊',tags:['median','typetal'],body:`<div class="def-box"><strong>Median</strong>: midterste tal (sorteret). <strong>Typetal</strong>: hyppigst forekommende.</div><div class="example-box"><span class="ex-label">Eks.</span> {3,5,5,7,9}: median=5, typetal=5</div>`},
        {id:'m46-28',title:'Diagrammer',icon:'📈',tags:['søjle','linje','cirkel'],body:`<div class="def-box"><strong>Søjle</strong>: sammenlign mængder · <strong>Linje</strong>: vis udvikling · <strong>Cirkel</strong>: vis andele i %</div>`},
        {id:'m46-29',title:'Sandsynlighed – intro',icon:'🎲',tags:['sandsynlighed','chance'],body:`<div class="formula-box">P = gunstige / alle udfald</div><div class="example-box"><span class="ex-label">Eks.</span> Slå 3 med terning: P=1/6≈17%</div>`},
        {id:'m46-30',title:'Problemløsning',icon:'🧩',tags:['strategi','metode'],body:`<div class="def-box"><strong>1</strong> Forstå · <strong>2</strong> Planlæg · <strong>3</strong> Løs · <strong>4</strong> Tjek. Tegn et billede eller lav en tabel!</div>`},
      ]
    },
    '7-9':{
      title:'7–9. klasse',
      description:'Algebra, funktioner, trigonometri, statistik og geometrisk bevisførelse.',
      topics:[
        {id:'m79-1',title:'Potenser',icon:'²',tags:['potens','eksponent'],body:`
<p>En potens er bare en genvej for gentaget gange. I stedet for at skrive 2×2×2×2×2 skriver vi 2⁵ – det sparer plads og tid.</p>
<div class="formula-box">aⁿ = a × a × … × a &nbsp;(n gange)<br><span style="font-size:.85rem;opacity:.8">a = grundtal &nbsp;|&nbsp; n = eksponent (antal gange)</span></div>
<p><strong>Særlige tilfælde du skal kende:</strong></p>
<div class="def-box"><strong>a⁰ = 1</strong> for alle a ≠ 0 &nbsp;(pr. definition)<br><strong>a⁻ⁿ = 1/aⁿ</strong> &nbsp;(negativt eksponent = brøk)<br><strong>a¹ = a</strong> &nbsp;(ganger én gang = tallet selv)</div>
<div class="example-box">
  <span class="ex-label">Eksempel – beregn 2⁵</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Skriv som gentaget gange: 2 × 2 × 2 × 2 × 2</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Beregn fra venstre: (2×2)=4 → (4×2)=8 → (8×2)=16 → (16×2)=<strong>32</strong></div></div>
  </div>
  Andre: 10³ = 1.000 &nbsp;|&nbsp; 3⁴ = 81 &nbsp;|&nbsp; 5⁻² = 1/25 = 0,04
</div>
<div class="warning-box">2³ ≠ 2×3=6. Det er 2×2×2=<strong>8</strong>. Eksponenten siger “ganger med dig selv”, ikke “ganger med eksponenten”.</div>
<div class="exam-tip">Lær udenad: 2¹⁰=1.024, alle kvadrater op til 15²=225 og alle kuber op til 5³=125.</div>`},

        {id:'m79-2',title:'Kvadratrødder',icon:'√',tags:['rod','kvadratrod'],body:`
<p>Kvadratroden er det omvendte af kvadrering. Spørg dig selv: “Hvilket tal ganget med sig selv giver dette tal?”</p>
<div class="formula-box">√a = b &nbsp;➚&nbsp; b² = a &nbsp;&nbsp;(b skal være positiv)</div>
<div class="example-box">
  <span class="ex-label">Eksempel – find √144</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Spørg: hvilket tal ganger med sig selv = 144?</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Prøv 12: 12 × 12 = 144 ✓ &nbsp;→&nbsp; √144 = <strong>12</strong></div></div>
  </div>
  Oftest brugte: √4=2 · √9=3 · √16=4 · √25=5 · √36=6 · √49=7 · √64=8 · √81=9 · √100=10
</div>
<div class="tip-box">Hvis √a ikke er et helt tal (f.eks. √7), lad lommeregneren gøre det – eller lad svaret stå som √7.</div>
<div class="warning-box">√(a+b) ≠ √a + √b. F.eks. √(9+16) = √25 = 5, <em>ikke</em> 3+4=7.</div>`},

        {id:'m79-3',title:'Videnskabelig notation',icon:'🔭',tags:['notation','potens'],body:`
<p>Store og bittesmå tal er besværlige at skrive. Videnskabelig notation giver et kompakt format ved at bruge potenser af 10.</p>
<div class="formula-box">a × 10ⁿ &nbsp;&nbsp;hvor &nbsp;1 ≤ a &lt; 10<br><span style="font-size:.85rem;opacity:.8">a = et tal med ét ciffer foran kommaet &nbsp;|&nbsp; n = hvor mange pladser kommaet flyttes</span></div>
<div class="example-box">
  <span class="ex-label">Eksempel – skriv 3.200.000 på videnskabelig form</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Find a: sæt kommaet efter det første ciffer → 3,2</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Tæl pladser kommaet er rykket mod venstre: 6 pladser</div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">Svar: <strong>3,2 × 10⁶</strong></div></div>
  </div>
  Lille tal: 0,00045 → 4,5 × 10⁻⁴ &nbsp;(kommaet rykket 4 pladser mod <em>højre</em> → negativt eksponent)
</div>
<div class="tip-box">Positivt eksponent = stort tal. Negativt eksponent = lille tal (under 1).</div>`},

        {id:'m79-4',title:'Procent – stigning og fald',icon:'%',tags:['procent','vækst','rabat'],body:`
<p>Procent betyder ”ud af hundrede”. En stigning på 15% betyder at du lægger 15/100 = 0,15 til det oprindelige tal.</p>
<div class="formula-box">Ny værdi = Gammel × (1 + p/100) &nbsp;ved stigning<br>Ny værdi = Gammel × (1 − p/100) &nbsp;ved fald<br><span style="font-size:.85rem;opacity:.8">p = procenttal &nbsp;|&nbsp; Faktoren i parentesen kaldes fremskrivningsfaktoren</span></div>
<div class="example-box">
  <span class="ex-label">Eksempel – 200 kr. ned 15% i rabat</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Find fremskrivningsfaktoren: 1 − 0,15 = <strong>0,85</strong></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Beregn: 200 × 0,85 = <strong>170 kr.</strong></div></div>
  </div>
  Stigning: løn 25.000 kr. stiger 3% → 25.000 × 1,03 = <strong>25.750 kr.</strong>
</div>
<div class="fun-fact">Faktoren 0,85 svarer til at beholde 85% af prisen. Én gange-operation er hurtigere end at beregne 15% og trække fra bagefter.</div>
<div class="warning-box">En stigning på 20% og derefter et fald på 20% giver IKKE samme tal tilbage. 100 × 1,2 × 0,8 = 96, ikke 100.</div>`},

        {id:'m79-5',title:'Rentesregning',icon:'💰',tags:['rente','opsparing'],body:`
<p>Rente-på-rente: hvert år tjener du rente, og næste år tjener du også rente af den rente du allerede fik. Sådan vokser opsparing eksponentielt.</p>
<div class="formula-box">Kₙ = K₀ × (1 + r)ⁿ<br><span style="font-size:.85rem;opacity:.8">K₀ = startkapital &nbsp;|&nbsp; r = rente som decimal (3% → 0,03) &nbsp;|&nbsp; n = antal år</span></div>
<div class="example-box">
  <span class="ex-label">Eksempel – 10.000 kr. ved 3% i 5 år</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">K₀=10.000, r=0,03, n=5</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Faktor: 1,03⁵ ≈ 1,1593</div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">Svar: 10.000 × 1,1593 ≈ <strong>11.593 kr.</strong> &nbsp;(1.593 kr. i samlet rente)</div></div>
  </div>
</div>
<div class="exam-tip">Til eksamen skal du typisk finde Kₙ, n eller r. For n: brug logaritme.</div>`},

        {id:'m79-6',title:'Regning med negative tal',icon:'➖',tags:['negative','fortegn'],body:`
<p>Negative tal er tal under nul. Fortegnsreglerne er faste – lær dem på hjertet.</p>
<div class="def-box">
  <strong>Addition/subtraktion:</strong> brug tallinjen<br>
  &nbsp;&nbsp;−5 + 3 = −2 &nbsp;(start i −5, gå 3 til højre)<br>
  &nbsp;&nbsp;−5 − 3 = −8 &nbsp;(start i −5, gå 3 til venstre)<br><br>
  <strong>Gange/dividere – fortegnsreglen:</strong><br>
  &nbsp;&nbsp;(+) × (+) = + &nbsp;&nbsp;(−) × (−) = + &nbsp;&nbsp;(+) × (−) = −<br>
  <em>Ens fortegn → plus, forskellige fortegn → minus</em>
</div>
<div class="example-box">
  −3 × −4 = <strong>+12</strong> &nbsp;(begge minus → plus)<br>
  −3 × 4 = <strong>−12</strong> &nbsp;(forskellige → minus)<br>
  −8 ÷ −2 = <strong>+4</strong> &nbsp;(begge minus → plus)<br>
  −(−5) = <strong>+5</strong> &nbsp;(to minus = plus)
</div>
<div class="warning-box">−3² = −9, men (−3)² = +9. Parenteserne gør en forskel! Eksponenten har højere prioritet end minustegnet uden parentes.</div>`},

        {id:'m79-7',title:'Algebra – variable og udtryk',icon:'🔤',tags:['algebra','variable'],body:`
<p>En variabel (f.eks. x) er en pladsholder for et tal vi ikke kender endnu. Algebra er matematik med pladsholdere.</p>
<div class="def-box">
  <strong>Udtryk:</strong> 3x + 2 (ingen lighedstegn – kan forenkles, ikke løses)<br>
  <strong>Ligning:</strong> 3x + 2 = 14 (lighedstegn – kan løses for x)<br>
  <strong>Koefficient:</strong> tallet foran variablen (her: 3)<br>
  <strong>Konstantled:</strong> talleddet uden variabel (her: 2)
</div>
<div class="example-box">
  <span class="ex-label">Beregn 3x + 2 når x = 4</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Erstat x med 4: 3 × 4 + 2</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Gang først (regnerekkefølge): 12 + 2 = <strong>14</strong></div></div>
  </div>
  Forenkl: 2x + 5x = 7x &nbsp;|&nbsp; 3x + 4y kan <em>ikke</em> forenkles (forskellig variabel)
</div>
<div class="tip-box">Du kan kun lægge led med <em>samme</em> variabel og <em>samme</em> eksponent sammen. 3x og 5x² er ikke ens led.</div>`},

        {id:'m79-8',title:'Ligninger – 1. grad',icon:'⚖️',tags:['ligning','1. grad'],body:`
<p>En ligning er en vægt i balance. Hvad du gør på den ene side, skal du gøre på den anden.</p>
<div class="formula-box">ax + b = c &nbsp;→&nbsp; x = (c − b) / a<br><span style="font-size:.85rem;opacity:.8">Mål: isolér x på den ene side ved at flytte alt andet over</span></div>
<div class="example-box">
  <span class="ex-label">Løs 2x + 5 = 13</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Træk 5 fra begge sider: 2x = 8</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Divider med 2: x = <strong>4</strong></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">Tjek: 2×4+5 = 13 ✓</div></div>
  </div>
</div>
<div class="tip-box">Altid tjek dit svar – sæt x-værdien ind i den originale ligning og verificer begge sider er ens.</div>
<div class="warning-box">Samme operation på BEGGE sider. 2x+5=13 → x+5=13 er forkert (du dividerede kun på venstre side).</div>`},

        {id:'m79-9',title:'Andengradsligninger',icon:'²',tags:['andengradsligning','abc-formel','diskriminant'],body:`
<p>En andengradsligning har x² og kan have 0, 1 eller 2 løsninger. abc-formlen (løsningsformlen) virker altid.</p>
<div class="formula-box">ax² + bx + c = 0 &nbsp;→&nbsp; x = (−b ± √(b²−4ac)) / (2a)<br><span style="font-size:.85rem;opacity:.8">Diskriminanten d = b²−4ac fortæller antallet af løsninger</span></div>
<div class="def-box">
  <strong>d &gt; 0:</strong> 2 løsninger &nbsp;&nbsp;<strong>d = 0:</strong> 1 løsning (dobbelrod) &nbsp;&nbsp;<strong>d &lt; 0:</strong> ingen reelle løsninger
</div>
<div class="example-box">
  <span class="ex-label">Løs x² − 5x + 6 = 0</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Identificer: a=1, b=−5, c=6</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">d = (−5)²−4×1×6 = 25−24 = <strong>1</strong> &nbsp;(d&gt;0 → 2 løsninger)</div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">x₁ = (5+√1)/2 = 3 &nbsp;&nbsp;x₂ = (5−√1)/2 = 2</div></div>
    <div class="step"><div class="step-num">4</div><div class="step-content">Tjek: 3²−5×3+6 = 0 ✓ &nbsp;&nbsp;2²−5×2+6 = 0 ✓</div></div>
  </div>
</div>
<div class="warning-box">Pas på b=−5: (−b) bliver −(−5) = +5. Et af de hyppigste regnefejl er at glemme det dobbelte minustegn.</div>`},

        {id:'m79-10',title:'Uligheder',icon:'⚖️',tags:['ulighed','interval','fortegn'],body:`
<p>En ulighed siger at noget er større eller mindre end noget andet. Du løser den næsten ligesom en ligning – med ét vigtigt undtagelse.</p>
<div class="formula-box">2x + 3 &lt; 11 &nbsp;→&nbsp; 2x &lt; 8 &nbsp;→&nbsp; x &lt; 4<br><span style="font-size:.85rem;opacity:.8">Løsningsmengden er et interval, f.eks. x &lt; 4 eller −1 ≤ x ≤ 5</span></div>
<div class="example-box">
  <span class="ex-label">Løs −3x + 6 ≥ 0</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Træk 6 fra: −3x ≥ −6</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Divider med −3 → <strong>vend tegnet!</strong> &nbsp;x ≤ 2</div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">Tjek x=0: −3×0+6=6 ≥ 0 ✓ &nbsp;og x=3: −3×3+6=−3 ≥ 0 ✗ ✓</div></div>
  </div>
</div>
<div class="warning-box">Når du ganger eller dividerer med et <strong>negativt tal</strong>, skal du vende uligheds-tegnet. &lt; bliver &gt;, ≤ bliver ≥.</div>`},

        {id:'m79-11',title:'Funktioner – intro',icon:'📈',tags:['funktion','input','output','definitionsmængde'],body:`
<p>En funktion er som en maskine: du putter et tal ind (input), og maskinen giver præcis ét tal ud (output). Samme input giver altid samme output.</p>
<div class="def-box">
  <strong>f(x) = 2x + 1</strong> &nbsp;– læses "f af x"<br>
  <strong>Definitionsmængde (Dm):</strong> de x-værdier der er tilladte (input)<br>
  <strong>Værdimængde (Vm):</strong> de y-værdier der kan komme ud (output)
</div>
<div class="example-box">
  <span class="ex-label">f(x) = 2x + 1</span>
  f(0) = <strong>1</strong> &nbsp;|&nbsp; f(3) = <strong>7</strong> &nbsp;|&nbsp; f(−2) = <strong>−3</strong><br>
  Punkter på grafen: (0,1), (3,7), (−2,−3)
</div>
<div class="fun-fact">Notationen f(x) opfandt matematikeren Euler i 1700-tallet. Det er bare en elegant måde at sige ”hvad er resultatet når x er input?”</div>`},

        {id:'m79-12',title:'Lineære funktioner',icon:'📈',tags:['lineær','hældning','b-værdi','skæring'],body:`
<p>En lineær funktion vokser (eller aftager) med et fast beløb for hvert skridt i x-retningen. Grafen er en ret linje.</p>
<div class="formula-box">f(x) = ax + b<br><span style="font-size:.85rem;opacity:.8"><strong>a</strong> = hældningskoefficient &nbsp;|&nbsp; <strong>b</strong> = skæring med y-aksen (f(0)=b)</span></div>
<div class="def-box">
  <strong>a &gt; 0:</strong> linjen stiger &nbsp;&nbsp;<strong>a &lt; 0:</strong> linjen falder<br>
  <strong>a = 0:</strong> vandret linje &nbsp;&nbsp;<strong>b = 0:</strong> linjen går igennem origo
</div>
<div class="example-box">
  f(x) = 2x + 3: skærer y-aksen i (0,3), stiger 2 per skridt<br>
  Punkter: (0,3) → (1,5) → (2,7)
</div>
<div class="exam-tip">Tegn altid mindst 2 punkter og brug en lineal. Find y-skæring (sæt x=0) og ét punkt mere.</div>`},

        {id:'m79-13',title:'Hældningskoefficient',icon:'📐',tags:['hældning','to punkter','stigning'],body:`
<p>Hældningskoefficienten a fortæller hvor meget y ændrer sig pr. enhed x ændrer sig. Det er ”stigning over løb”.</p>
<div class="formula-box">a = (y₂ − y₁) / (x₂ − x₁) = Δy / Δx</div>
<div class="example-box">
  <span class="ex-label">Find hældningen gennem (1, 3) og (4, 9)</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">a = (9−3) / (4−1) = 6/3 = <strong>2</strong></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Find b: 3 = 2×1 + b → b = <strong>1</strong></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">f(x) = 2x + 1. Tjek: f(4) = 9 ✓</div></div>
  </div>
</div>
<div class="warning-box">Rækkefølgen af punkterne er ligegyldig, men den MÅ være konsistent: starter du med y₂ i tælleren, start med x₂ i nævneren.</div>`},

        {id:'m79-14',title:'Proportionalitet',icon:'∝',tags:['proportional','y=kx','konstant'],body:`
<p>To størrelser er direkte proportionale hvis de altid har det samme forhold – dobler du den ene, dobler den anden sig også.</p>
<div class="formula-box">y = k · x &nbsp;&nbsp;(k = proportionalitetskonstanten)<br><span style="font-size:.85rem;opacity:.8">Grafen er en ret linje gennem origo (0,0)</span></div>
<div class="example-box">
  Bil kjører 60 km/t: d = 60t<br>
  t=2 timer: d=120 km &nbsp;|&nbsp; t=0,5: d=30 km<br>
  d/t = 60 altid = proportionalitetskonstanten
</div>
<div class="tip-box">Grafen går altid gennem origo (0,0) ved direkte proportionalitet. Gør den ikke det, er det ikke direkte proportionalitet.</div>`},

        {id:'m79-15',title:'Invers proportionalitet',icon:'∝',tags:['invers','y=k/x','produkt'],body:`
<p>To størrelser er omvendt proportionale hvis deres produkt altid er konstant – dobler du den ene, halveres den anden.</p>
<div class="formula-box">y = k / x &nbsp;&nbsp;(k = konstanten = x · y)<br><span style="font-size:.85rem;opacity:.8">Grafen er en hyperbel – rammer aldrig akserne</span></div>
<div class="example-box">
  <span class="ex-label">4 mænd bruger 6 dage</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Find k: 4 × 6 = <strong>24</strong> mandedage</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">8 mænd: 24/8 = <strong>3 dage</strong></div></div>
  </div>
</div>
<div class="tip-box">Forskel fra direkte: direkte prop. = ret linje gennem origo. Invers prop. = hyperbel der ikke rammer akserne.</div>`},

        {id:'m79-16',title:'Statistik – beskrivende',icon:'📊',tags:['middelværdi','median','typetal','spredning'],body:`
<p>Beskrivende statistik opsummerer et datasmæt i få tal. De tre centrale mål siger noget om ”midten”.</p>
<div class="def-box">
  <strong>Middelværdi (gennemsnit):</strong> sum ÷ antal<br>
  <strong>Median:</strong> midterste tal når data er sorteret. Lige antal: gennemsnit af de to midterste<br>
  <strong>Typetal (modus):</strong> det tal der optræder flest gange<br>
  <strong>Spredning:</strong> hvor meget data varierer om gennemsnittet
</div>
<div class="example-box">
  <span class="ex-label">Datasmæt: {4, 7, 7, 9, 13}</span>
  Middelværdi: 40/5 = <strong>8</strong> &nbsp;|&nbsp; Median: <strong>7</strong> (3. tal) &nbsp;|&nbsp; Typetal: <strong>7</strong>
</div>
<div class="tip-box">Brug median frem for gennemsnit når der er ekstreme værdier (én millionær trækker gennemsnitslønnen op, medianen ændres minimalt).</div>`},

        {id:'m79-17',title:'Boksplot',icon:'📦',tags:['boksplot','kvartil','IQR'],body:`
<p>Et boksplot viser spredningen grafisk. Det opdeler data i fire kvartiler (á 25%) og afslører skjevhed og udløbere.</p>
<div class="def-box">
  <strong>Min</strong> → <strong>Q1</strong> (25%-kvartil) → <strong>Median</strong> (Q2) → <strong>Q3</strong> (75%-kvartil) → <strong>Max</strong><br>
  <strong>IQR</strong> (kvartilbredde) = Q3 − Q1
</div>
<div class="example-box">
  <span class="ex-label">Sorteret: 2, 5, 7, 8, 10, 12, 15</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Min=2, Max=15, Median=8</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Q1 = median af {2,5,7} = <strong>5</strong></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">Q3 = median af {10,12,15} = <strong>12</strong></div></div>
    <div class="step"><div class="step-num">4</div><div class="step-content">IQR = 12−5 = <strong>7</strong></div></div>
  </div>
</div>
<div class="exam-tip">Til eksamen sammenlignes to boksplot. Kig på: hvem har højest median? Hvem er mest spredt? Er der udløbere?</div>`},

        {id:'m79-18',title:'Sandsynlighed',icon:'🎲',tags:['P(A)','begivenhed','udfald'],body:`
<p>Sandsynlighed er et tal mellem 0 og 1. 0 = umuligt, 1 = sikker, 0,5 = fifty-fifty.</p>
<div class="formula-box">P(A) = antal gunstige udfald / antal mulige udfald<br><span style="font-size:.85rem;opacity:.8">Kræver at alle udfald er lige sandsynlige</span></div>
<div class="example-box">
  Pose: 3 røde og 5 blå kugler<br>
  P(rød) = 3/8 = <strong>0,375</strong> &nbsp;|&nbsp; P(blå) = 5/8 = 0,625<br>
  P(rød) + P(blå) = 1 ✓ (udtommende)
</div>
<div class="def-box">
  <strong>P(ikke A)</strong> = 1 − P(A) &nbsp;(komplementreglen)<br>
  <strong>P(A og B)</strong> = P(A) × P(B) &nbsp;kun når A og B er uafhængige<br>
  <strong>P(A eller B)</strong> = P(A) + P(B) &nbsp;kun når A og B er gensidigt udelukkende
</div>
<div class="warning-box">Gange-reglen gælder kun hvis begivenhederne er uafhængige. Trækker du kugler UDEN at lægge tilbage, ændrer den første udtrækning sandsynligheden for næste.</div>`},

        {id:'m79-19',title:'Kombinatorik',icon:'🔢',tags:['C(n,k)','n!','permutation'],body:`
<p>Kombinatorik handler om at tælle på smarte måder: "på hvor mange måder kan vi vælge/arrangere?"</p>
<div class="formula-box">C(n,k) = n! / (k! · (n−k)!) &nbsp;("n over k")<br><span style="font-size:.85rem;opacity:.8">n = antal at vælge fra &nbsp;|&nbsp; k = antal vi vælger &nbsp;|&nbsp; n! = 1×2×3×…×n</span></div>
<div class="def-box">
  <strong>Permutation</strong> (rækkefølge BETYDER noget): P(n,k) = n! / (n−k)!<br>
  <strong>Kombination</strong> (rækkefølge BETYDER ikke noget): C(n,k)<br>
  Eks: {ABC} → permutationer: ABC, ACB, BAC, BCA, CAB, CBA = 6 = 3!
</div>
<div class="example-box">
  C(5,2): vælg 2 af 5 elever<br>
  C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = <strong>10 måder</strong>
</div>
<div class="tip-box">Hurtig metode: skriv n tal fra n ned til n−k+1, divider med k!. C(5,2) = (5×4)/(2×1) = 10.</div>`},

        {id:'m79-20',title:'Pythagoras',icon:'📐',tags:['pythagoras','retvinklet','hypotenuse'],body:`
<p>I en retvinklet trekant er kvadratet på hypotenusen lig summen af kvadraterne på de to kateter.</p>
<div class="formula-box">a² + b² = c² &nbsp;&nbsp;(c = hypotenuse – modsat den rette vinkel)</div>
<div class="example-box">
  <span class="ex-label">Find hypotenusen: a=3, b=4</span>
  c² = 9 + 16 = 25 &nbsp;→&nbsp; c = √25 = <strong>5</strong>
  <br><br>
  <span class="ex-label">Find en katet: c=10, a=6</span>
  b² = 100 − 36 = 64 &nbsp;→&nbsp; b = √64 = <strong>8</strong>
</div>
<div class="fun-fact">Pythagoræiske tripler: (3,4,5), (5,12,13), (8,15,17), (7,24,25). Lær dem udenad – de dukker tit op til eksamen!</div>
<div class="warning-box">Pythagoras virker KUN i retvinklede trekanter. Er der ingen ret vinkel, brug sinusreglen eller cosinsreglen.</div>`},

        {id:'m79-21',title:'Trigonometri – sin/cos/tan',icon:'📐',tags:['sinus','cosinus','tangens','SOH-CAH-TOA'],body:`
<p>Trigonometri bruges i retvinklede trekanter til at finde sider eller vinkler via forholdet mellem siderne.</p>
<div class="formula-box">sin A = modstående / hypotenuse &nbsp;(SOH)<br>cos A = hosliggende / hypotenuse &nbsp;(CAH)<br>tan A = modstående / hosliggende &nbsp;(TOA)</div>
<div class="def-box">
  <strong>Modstående:</strong> siden modsat vinklen A<br>
  <strong>Hosliggende:</strong> den anden katet (ved siden af vinklen A)<br>
  <strong>Hypotenuse:</strong> længste side modsat den rette vinkel
</div>
<div class="example-box">
  <span class="ex-label">Find b (hosliggende): A=35°, hyp=10 cm</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Vi kender hypotenuse, søger hosliggende → brug cos</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">cos 35° = b/10 &nbsp;→&nbsp; b = 10 × cos35° ≈ <strong>8,19 cm</strong></div></div>
  </div>
  Søger vinkel: A = sin⁻¹(mod/hyp) = cos⁻¹(hos/hyp) = tan⁻¹(mod/hos)
</div>
<div class="exam-tip">Skriv altid hvilken formel du bruger og hvilke sider der svarer til hvad – det giver point selv om beregningen går galt.</div>`},

        {id:'m79-22',title:'Sinus- og cosinsreglen',icon:'📐',tags:['sinusreglen','cosinsreglen','generel trekant'],body:`
<p>Sinusreglen og cosinsreglen bruges i trekanter der IKKE er retvinklede. De to regler dækker alle tilfælde.</p>
<div class="formula-box">Sinusreglen: &nbsp;a/sin A = b/sin B = c/sin C<br>Cosinsreglen: &nbsp;c² = a² + b² − 2ab · cos C</div>
<div class="def-box">
  <strong>Brug sinusreglen:</strong> når du kender en side + dens modstående vinkel + én ting mere<br>
  <strong>Brug cosinsreglen:</strong> når du kender to sider + mellemliggende vinkel (SvS) eller alle tre sider (SSS)
</div>
<div class="example-box">
  <span class="ex-label">Sinusreglen: A=40°, B=70°, a=8</span>
  b = 8 × sin70°/sin40° ≈ <strong>11,7</strong>
  <br><br>
  <span class="ex-label">Cosinsreglen: a=5, b=7, C=60°</span>
  c² = 25+49−35 = 39 &nbsp;→&nbsp; c ≈ <strong>6,24</strong>
</div>
<div class="warning-box">Sinusreglen kan give to løsninger (ambigu tilfælde) når du finder en vinkel og sin A &lt; 1 giver to muligheder (A og 180°−A).</div>`},

        {id:'m79-23',title:'Kongruens og ligedannethed',icon:'🔷',tags:['kongruens','ligedannet','SSS','SvS','SVS'],body:`
<p>To figurer er kongruente hvis de er præcis ens (form OG størrelse). Ligedannede figurer har samme form men kan have forskellig størrelse.</p>
<div class="def-box">
  <strong>Kongruente trekanter – fire kriterier:</strong><br>
  &nbsp;&nbsp;SSS: tre sider ens &nbsp;|&nbsp; SvS: to sider + mellemliggende vinkel<br>
  &nbsp;&nbsp;SVS: to vinkler + side &nbsp;|&nbsp; VSV: to vinkler + en side<br><br>
  <strong>Ligedannede:</strong> tilsvarende vinkler er ens, sider er proportionale. Areal ganges med k² (skalaforhold).
</div>
<div class="example-box">
  Sider 3,4,5 og 6,8,10: skalaforhold k=2 → ligedannede<br>
  Areal₁=6 cm² &nbsp;→&nbsp; Areal₂ = 6×4 = <strong>24 cm²</strong>
</div>`},

        {id:'m79-24',title:'Areal – trapez og rhombus',icon:'📐',tags:['areal','trapez','rhombus','diagonaler'],body:`
<p>Trapez og rhombus er firkanter med særlige egenskaber. Formlerne kan forlænges ud fra rektangelformlen.</p>
<div class="formula-box">Trapez: A = ½ · (a + b) · h<br>Rhombus: A = ½ · d₁ · d₂<br><span style="font-size:.85rem;opacity:.8">a,b = de to parallelle sider &nbsp;|&nbsp; h = højden &nbsp;|&nbsp; d₁,d₂ = de to diagonaler</span></div>
<div class="def-box">
  <strong>Trapez:</strong> én firkant med præcis ét par parallelle sider.<br>
  <strong>Rhombus:</strong> alle fire sider ens. Diagonalerne krydser vinkelret og halverer hinanden.
</div>
<div class="example-box">
  Trapez a=4, b=8, h=5: A = ½ × 12 × 5 = <strong>30 cm²</strong><br>
  Rhombus d₁=6, d₂=10: A = ½ × 60 = <strong>30 cm²</strong>
</div>`},

        {id:'m79-25',title:'Volumen – cylinder, kegle, kugle',icon:'🧮',tags:['volumen','cylinder','kegle','kugle','π'],body:`
<p>Volumen måler det indre rum i en 3D-figur i cm³ eller m³. Husk: r er radius (IKKE diameter), h er højden.</p>
<div class="formula-box">Cylinder: V = π · r² · h<br>Kegle: V = ⅓ · π · r² · h<br>Kugle: V = ⁴⁄₃ · π · r³</div>
<div class="def-box">Kegle = ⅓ af cylinder med samme r og h (hæld 3 kegler i en cylinder = fuld).<br>Overfladeareal cylinder: A = 2πr² + 2πrh</div>
<div class="example-box">
  Cylinder r=3, h=10: V = π×9×10 ≈ <strong>283 cm³</strong><br>
  Kugle r=5: V = ⁴⁄₃ × π × 125 ≈ <strong>524 cm³</strong>
</div>
<div class="warning-box">r er radius = diameter/2. Opgaven giver tit d=10, og du skal huske r=5. Hyppig fejl!</div>`},

        {id:'m79-26',title:'Vektorer – intro',icon:'➡️',tags:['vektor','størrelse','retning','længde'],body:`
<p>En vektor har både størrelse (længde) og retning – i modsætning til et tal der kun har størrelse. Tænk på det som en pil.</p>
<div class="formula-box">v⃗ = (vₓ, vᵧ) &nbsp;&nbsp;|v⃗| = √(vₓ² + vᵧ²)<br><span style="font-size:.85rem;opacity:.8">vₓ = vandret komponent &nbsp;|&nbsp; vᵧ = lodret komponent &nbsp;|&nbsp; |v⃗| = længden</span></div>
<div class="def-box">
  <strong>Addition:</strong> u⃗ + v⃗ = (uₓ+vₓ, uᵧ+vᵧ) &nbsp;(læg komponent for komponent)<br>
  <strong>Skalarmultiplikation:</strong> k·v⃗ = (k·vₓ, k·vᵧ) &nbsp;(forlæng/forkort/vend)
</div>
<div class="example-box">
  v⃗=(3,4): |v⃗| = √(9+16) = √25 = <strong>5</strong><br>
  2·v⃗ = (6,8) &nbsp;|&nbsp; −v⃗ = (−3,−4)
</div>`},

        {id:'m79-27',title:'Koordinatgeometri',icon:'📊',tags:['afstand','midtpunkt','to punkter'],body:`
<p>Koordinatgeometri forbinder algebra og geometri: figurer beskrives med koordinater, og afstande/midtpunkter beregnes med formler.</p>
<div class="formula-box">Afstand: d = √((x₂−x₁)² + (y₂−y₁)²)<br>Midtpunkt: M = ((x₁+x₂)/2 , (y₁+y₂)/2)</div>
<div class="example-box">
  <span class="ex-label">A=(1,2) og B=(5,5)</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Afstand: d = √((5−1)²+(5−2)²) = √(16+9) = <strong>5</strong></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Midtpunkt: M = ((1+5)/2, (2+5)/2) = (<strong>3 , 3,5</strong>)</div></div>
  </div>
</div>
<div class="fun-fact">Afstandsformlen er bare Pythagoras! Δx og Δy er kateterne, afstanden er hypotenusen.</div>`},

        {id:'m79-28',title:'Cirklen',icon:'⭕',tags:['cirkel','radius','ligning','centrum'],body:`
<p>En cirkel er alle punkter med samme afstand (radius) til centrum. Cirklens ligning er bygget direkte på afstandsformlen.</p>
<div class="formula-box">Ligning: (x−a)² + (y−b)² = r²<br><span style="font-size:.85rem;opacity:.8">(a,b) = centrum &nbsp;|&nbsp; r = radius</span><br>Omkreds: O = 2πr &nbsp;&nbsp;Areal: A = πr²</div>
<div class="example-box">
  <span class="ex-label">Centrum (3,−2) og radius 5</span>
  (x−3)² + (y+2)² = 25
  <br><br>
  <span class="ex-label">Aflæs fra (x+1)² + (y−4)² = 9</span>
  centrum: (−1, 4) &nbsp;|&nbsp; r = √9 = <strong>3</strong>
</div>
<div class="warning-box">Pas på fortegnene: cirklen (x+1)²+(y−4)²=9 har centrum (−1, 4), IKKE (1, −4).</div>`},

        {id:'m79-29',title:'Lineære ligningssystemer',icon:'⚖️',tags:['system','to ubekendte','substitution','addition'],body:`
<p>Et ligningssystem har to ubekendte og to ligninger. Du finder løsningen ved at eliminere én ubekendt.</p>
<div class="def-box">
  <strong>Tre metoder:</strong><br>
  1. <strong>Additionsmetoden:</strong> læg ligningerne sammen (evt. gang først) så én ubekendt forsvinder<br>
  2. <strong>Substitutionsmetoden:</strong> isolér én variabel og sæt ind i den anden ligning<br>
  3. <strong>Grafisk:</strong> tegn begge linjer – løsningen er skæringspunktet
</div>
<div class="example-box">
  <span class="ex-label">Additionsmetoden: x+y=5 og x−y=1</span>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-content">Læg sammen: 2x = 6 &nbsp;→&nbsp; x = <strong>3</strong></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-content">Sæt ind: 3+y=5 &nbsp;→&nbsp; y = <strong>2</strong></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-content">Tjek: 3+2=5 ✓ &nbsp;&nbsp;3−2=1 ✓</div></div>
  </div>
</div>
<div class="exam-tip">Vælg additionsmetoden når koefficienterne er pæne. Vælg substitution når én variabel allerede er isoléret.</div>`},

        {id:'m79-30',title:'Logik og bevisførelse',icon:'🧠',tags:['bevis','logik','modeksempel','kontrapositivt'],body:`
<p>Matematisk bevisførelse er at argumentere præcist for hvorfor noget er sandt. Det er ikke nok at "det ser rigtigt ud" – du skal vise at det ALTID gælder.</p>
<div class="def-box">
  <strong>Direkte bevis:</strong> start med hvad du ved og følg logiske skridt til konklusionen<br>
  <strong>Modeksempel:</strong> ét modeksempel er nok til at afvise en generel påstand<br>
  <strong>Kontrapositivt:</strong> bevis "ikke Q → ikke P" i stedet for "P → Q" (logisk ækvivalent)<br>
  <strong>Modstridsbevis:</strong> antag det modsatte og vis at det fører til noget umuligt
</div>
<div class="example-box">
  <span class="ex-label">Modeksempel – "alle primtal er ulige"</span>
  Falsk: 2 er primtal og ligeligt. Ét modeksempel afviser påstanden.
  <br><br>
  <span class="ex-label">Direkte bevis – summen af to ligetal er et ligetal</span>
  Lad a=2m og b=2n. a+b = 2m+2n = 2(m+n) → et ligetal. ∎
</div>
<div class="tip-box">Til eksamen: skriv hvad du vil bevise øverst, argumenter trin for trin, marker slutningen med QED eller ∎.</div>`},
      ]
    },
    '10':{
      title:'10. klasse',
      description:'Dybere algebra, funktionstyper, differentialregning og statistisk analyse.',
      topics:[
        {id:'m10-1',title:'Logaritmer',icon:'log',tags:['logaritme','ln','log'],body:`<div class="formula-box">log_a(b)=c ⟺ aᶜ=b</div><div class="example-box"><span class="ex-label">Eks.</span> log₁₀(1000)=3 · log₂(8)=3 · ln(e²)=2</div>`},
        {id:'m10-2',title:'Eksponentielle funktioner',icon:'📈',tags:['eksponentiel','vækst','b-værdi'],body:`<div class="formula-box">f(x) = b·aˣ · b=startværdi · a=vækstfaktor</div><div class="example-box"><span class="ex-label">Eks.</span> P=5000·1,02ˣ vokser 2% per år.</div>`},
        {id:'m10-3',title:'Diskriminanten',icon:'²',tags:['diskriminant','rødder'],body:`<div class="formula-box">d = b²−4ac · d&gt;0: 2 rødder · d=0: 1 rod · d&lt;0: ingen</div>`},
        {id:'m10-4',title:'Polynomier',icon:'🔢',tags:['polynomium','grad','koefficient'],body:`<div class="def-box">Grad n: aₙxⁿ+…+a₁x+a₀. Rødder = nulpunkter.</div><div class="example-box"><span class="ex-label">Eks.</span> x³−2x²+x−4 er grad 3.</div>`},
        {id:'m10-5',title:'Rationelle udtryk',icon:'÷',tags:['brøk','rationel','def.mængde'],body:`<div class="formula-box">p(x)/q(x) – udefineret hvor q(x)=0</div><div class="example-box"><span class="ex-label">Eks.</span> (x+1)/(x−2): udef. for x=2</div>`},
        {id:'m10-6',title:'Trigonometri – generelle trekanter',icon:'📐',tags:['sinusregel','cosinsregel'],body:`<div class="formula-box">Sinus: a/sin A=b/sin B · Cosinus: c²=a²+b²−2ab·cos C</div>`},
        {id:'m10-7',title:'Enhedscirklen',icon:'⭕',tags:['enhedscirkel','radianer'],body:`<div class="def-box">Punkt på enhedscirklen: (cos θ, sin θ). 360°=2π rad. 180°=π rad.</div>`},
        {id:'m10-8',title:'Vektorer – skalærprodukt',icon:'·',tags:['prikprodukt','vinkel'],body:`<div class="formula-box">a⃗·b⃗ = aₓbₓ+aᵧbᵧ = |a||b|cos θ</div><div class="example-box"><span class="ex-label">Eks.</span> (1,2)·(3,4)=3+8=11</div>`},
        {id:'m10-9',title:'Vektorer i 3D',icon:'🧭',tags:['3D','krydsprodunkt'],body:`<div class="formula-box">v⃗=(x,y,z) · |v⃗|=√(x²+y²+z²) · a⃗×b⃗ ⊥ begge</div>`},
        {id:'m10-10',title:'Analytisk geometri',icon:'📐',tags:['linje','plan','normalvektor'],body:`<div class="formula-box">Plan: ax+by+cz=d · Linje: r⃗=p⃗+t·v⃗</div>`},
        {id:'m10-11',title:'Differentialkvotienten',icon:'d/dx',tags:['afledet','hældning','definition'],body:`<div class="formula-box">f′(x) = lim(h→0)[f(x+h)−f(x)]/h</div><div class="example-box"><span class="ex-label">Eks.</span> f(x)=x² → f′(x)=2x</div>`},
        {id:'m10-12',title:'Differentationsregler',icon:'d/dx',tags:['potensregel','sum'],body:`<div class="formula-box">(xⁿ)′=nxⁿ⁻¹ · (f+g)′=f′+g′ · (kf)′=kf′</div>`},
        {id:'m10-13',title:'Monotoniforhold',icon:'📈',tags:['voksende','aftagende','ekstrema'],body:`<div class="def-box">f′(x)&gt;0 → voksende · f′(x)&lt;0 → aftagende · f′(x)=0 → muligt ekstrema</div>`},
        {id:'m10-14',title:'Integralregning – intro',icon:'∫',tags:['integral','antiderivativ'],body:`<div class="formula-box">∫xⁿ dx = xⁿ⁺¹/(n+1)+C</div><div class="example-box"><span class="ex-label">Eks.</span> ∫2x dx = x²+C</div>`},
        {id:'m10-15',title:'Bestemt integral',icon:'∫',tags:['areal','Newton-Leibniz'],body:`<div class="formula-box">∫ₐᵇ f(x)dx = F(b)−F(a)</div><div class="example-box"><span class="ex-label">Eks.</span> ∫₀² x²dx = 8/3</div>`},
        {id:'m10-16',title:'Regression',icon:'📊',tags:['regression','R²','GeoGebra'],body:`<div class="def-box">Finder bedst passende kurve til data. R²=1 er perfekt fit. Typer: lineær, eksponentiel, potens.</div>`},
        {id:'m10-17',title:'Sandsynlighedsfordelinger',icon:'🎲',tags:['binomial','normalfordeling'],body:`<div class="def-box"><strong>Binomial</strong>: P(k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ · <strong>Normal</strong>: klokkeformet, karakteriseret ved μ og σ.</div>`},
        {id:'m10-18',title:'Kombinatorik',icon:'🔢',tags:['C(n,k)','Pascal'],body:`<div class="formula-box">C(n,k) = n!/(k!(n−k)!)</div><div class="example-box"><span class="ex-label">Eks.</span> C(6,2)=15 · C(10,3)=120</div>`},
        {id:'m10-19',title:'Sammensatte funktioner',icon:'⚙️',tags:['komposition','f(g(x))'],body:`<div class="formula-box">(f∘g)(x) = f(g(x))</div><div class="example-box"><span class="ex-label">Eks.</span> f=x², g=x+1 → f(g(2))=f(3)=9</div>`},
        {id:'m10-20',title:'Inverse funktioner',icon:'🔄',tags:['invers','f⁻¹'],body:`<div class="formula-box">f⁻¹(f(x))=x</div><div class="example-box"><span class="ex-label">Eks.</span> f(x)=2x+3 → f⁻¹(x)=(x−3)/2</div>`},
        {id:'m10-21',title:'Komplekse tal',icon:'𝑖',tags:['kompleks','imaginær'],body:`<div class="formula-box">i=√−1 · z=a+bi · |z|=√(a²+b²)</div><div class="example-box"><span class="ex-label">Eks.</span> (2+3i)+(1−i)=3+2i</div>`},
        {id:'m10-22',title:'Aritmetiske rækker',icon:'Σ',tags:['aritmetisk','sum'],body:`<div class="formula-box">Sₙ=n/2·(a₁+aₙ) · aₙ=a₁+(n−1)d</div><div class="example-box"><span class="ex-label">Eks.</span> 1+3+…+19=10/2·20=<strong>100</strong></div>`},
        {id:'m10-23',title:'Geometriske rækker',icon:'Σ',tags:['geometrisk','kvotient'],body:`<div class="formula-box">Sₙ=a₁(1−qⁿ)/(1−q) · S∞=a₁/(1−q) for |q|&lt;1</div>`},
        {id:'m10-24',title:'Matricer – intro',icon:'▦',tags:['matrix','rækker','kolonner'],body:`<div class="def-box">En m×n-matrix: m rækker, n kolonner. Addition: tilsvarende elementer lægges sammen.</div>`},
        {id:'m10-25',title:'Matrixmultiplikation',icon:'▦',tags:['matrixprodukt'],body:`<div class="formula-box">(AB)ᵢⱼ=Σₖ AᵢₖBₖⱼ — A's kolonner skal matche B's rækker.</div>`},
        {id:'m10-26',title:'Gauss-elimination',icon:'▦',tags:['Gauss','ligningssystem'],body:`<div class="def-box">Skriv systemet som udvidet matrix og rækkereducér (divider, addér rækker) til løsning.</div>`},
        {id:'m10-27',title:'Mængdelære',icon:'⊂',tags:['delmængde','komplement','Venn'],body:`<div class="formula-box">|A∪B|=|A|+|B|−|A∩B| · Aᶜ=U\A</div>`},
        {id:'m10-28',title:'Logik',icon:'🧠',tags:['implikation','ækvivalens'],body:`<div class="formula-box">P∧Q (og) · P∨Q (eller) · ¬P (ikke) · P→Q (implikation)</div>`},
        {id:'m10-29',title:'Talteori',icon:'🔢',tags:['gcd','modulo','Euklid'],body:`<div class="formula-box">gcd(48,18): 48=2·18+12; 18=1·12+6; 12=2·6 → gcd=<strong>6</strong></div>`},
        {id:'m10-30',title:'Modelbaseret problemløsning',icon:'🧩',tags:['model','optimering'],body:`<div class="def-box">Opstil model → løs → fortolk i kontekst → vurder rimelighed. Bruges til optimering og låneberegning.</div>`},
      ]
    },
    'gym':{
      title:'Gymnasium (STX/HHX/HTX)',
      description:'Differentialregning, integralregning, statistik og avanceret algebra.',
      topics:[
        {id:'mg-1',title:'Differentiationsregler – oversigt',icon:'d/dx',tags:['potensregel','eˣ','ln'],body:`<div class="formula-box">(xⁿ)′=nxⁿ⁻¹ · (eˣ)′=eˣ · (ln x)′=1/x · (sin x)′=cos x · (cos x)′=−sin x</div>`},
        {id:'mg-2',title:'Produktreglen',icon:'✖️',tags:['produktregel'],body:`<div class="formula-box">(f·g)′ = f′g + fg′</div><div class="example-box"><span class="ex-label">Eks.</span> (x²·sin x)′=2x sin x+x²cos x</div>`},
        {id:'mg-3',title:'Kvotientreglen',icon:'➗',tags:['kvotientregel'],body:`<div class="formula-box">(f/g)′ = (f′g − fg′) / g²</div><div class="example-box"><span class="ex-label">Eks.</span> (x/eˣ)′=(1−x)/eˣ</div>`},
        {id:'mg-4',title:'Kædereglen',icon:'⛓️',tags:['kæderegel','sammensat'],body:`<div class="formula-box">(f(g(x)))′ = f′(g(x))·g′(x)</div><div class="example-box"><span class="ex-label">Eks.</span> (sin(x²))′=cos(x²)·2x</div>`},
        {id:'mg-5',title:'Ubestemte integraler',icon:'∫',tags:['antiderivativ','konstant C'],body:`<div class="formula-box">∫xⁿdx=xⁿ⁺¹/(n+1)+C · ∫eˣdx=eˣ+C · ∫(1/x)dx=ln|x|+C</div>`},
        {id:'mg-6',title:'Bestemt integral og areal',icon:'∫',tags:['areal','Newton-Leibniz'],body:`<div class="formula-box">∫ₐᵇf(x)dx = F(b)−F(a)</div><div class="example-box"><span class="ex-label">Eks.</span> ∫₀²x²dx=8/3</div>`},
        {id:'mg-7',title:'Substitution og per partes',icon:'∫',tags:['substitution','per partes'],body:`<div class="formula-box">Subst.: u=g(x) → ∫f(g)g′dx=∫f(u)du<br>Per partes: ∫fg′=fg−∫f′g</div>`},
        {id:'mg-8',title:'Differentialligninger – 1. orden',icon:'📐',tags:['ODE','separation'],body:`<div class="formula-box">dy/dx=f(x)g(y) → separér og integrer begge sider</div><div class="example-box"><span class="ex-label">Eks.</span> y′=2y → y=Ce²ˣ</div>`},
        {id:'mg-9',title:'Taylorudvikling',icon:'Σ',tags:['Taylor','approksimation'],body:`<div class="formula-box">f(x)≈f(a)+f′(a)(x−a)+f″(a)(x−a)²/2!+…</div><div class="example-box"><span class="ex-label">Eks.</span> eˣ≈1+x+x²/2+x³/6</div>`},
        {id:'mg-10',title:'Komplekse tal – polær form',icon:'𝑖',tags:['polær','modulus','argument'],body:`<div class="formula-box">z=r(cosθ+i sinθ)=reⁱᶿ · |z|=r · arg(z)=θ</div>`},
        {id:'mg-11',title:'Vektorer – prikprodukt og vinkel',icon:'·',tags:['prikprodukt','vinkel'],body:`<div class="formula-box">a⃗·b⃗=|a||b|cosθ · θ=arccos(a⃗·b⃗/(|a||b|))</div>`},
        {id:'mg-12',title:'Linjer og planer i 3D',icon:'📐',tags:['plan','normalvektor'],body:`<div class="formula-box">Plan: n⃗·(r⃗−p⃗)=0 → ax+by+cz=d · Linje: r⃗=p⃗+t·d⃗</div>`},
        {id:'mg-13',title:'Matrixalgebra og invers',icon:'▦',tags:['matrix','invers','determinant'],body:`<div class="formula-box">A⁻¹=adj(A)/det(A) · AA⁻¹=I · Cramer: xᵢ=det(Aᵢ)/det(A)</div>`},
        {id:'mg-14',title:'Determinanter',icon:'|A|',tags:['2×2','3×3','Sarrus'],body:`<div class="formula-box">2×2: |[[a,b],[c,d]]|=ad−bc</div><div class="example-box"><span class="ex-label">Eks.</span> |[[2,3],[1,4]]|=8−3=<strong>5</strong></div>`},
        {id:'mg-15',title:'Egenværdier og egenvektorer',icon:'λ',tags:['egenværdi','egenvektor'],body:`<div class="formula-box">Av=λv → det(A−λI)=0 (karakteristisk polynomium)</div>`},
        {id:'mg-16',title:'Sandsynlighedsregning',icon:'🎲',tags:['P(A)','komplement','additionsregel'],body:`<div class="formula-box">P(A∪B)=P(A)+P(B)−P(A∩B) · P(Aᶜ)=1−P(A)</div>`},
        {id:'mg-17',title:'Betinget sandsynlighed og Bayes',icon:'🎲',tags:['betinget','Bayes'],body:`<div class="formula-box">P(A|B)=P(A∩B)/P(B) · Bayes: P(B|A)=P(A|B)P(B)/P(A)</div>`},
        {id:'mg-18',title:'Normalfordeling',icon:'🔔',tags:['normalfordeling','μ','σ'],body:`<div class="formula-box">f(x)=(1/(σ√(2π)))·e^(−(x−μ)²/(2σ²))</div><p>±1σ: 68% · ±2σ: 95% · ±3σ: 99,7%</p>`},
        {id:'mg-19',title:'Hypotesetest',icon:'📊',tags:['nulhypotese','p-værdi','α'],body:`<div class="def-box">H₀ testes mod H₁. Forkast H₀ hvis p-værdi &lt; α (typisk 0,05).</div>`},
        {id:'mg-20',title:'Regression og R²',icon:'📈',tags:['regression','R²','residual'],body:`<div class="def-box">R² (determinationskoefficient): 0=ingen forklaring, 1=perfekt fit. Residualer bør være tilfældige.</div>`},
        {id:'mg-21',title:'Polynomier og rødder',icon:'🔢',tags:['nulpunkt','faktorisering'],body:`<div class="formula-box">P(r)=0 → (x−r) er faktor. Grad n → maks. n rødder.</div>`},
        {id:'mg-22',title:'Eksponentielle og log-funktioner',icon:'📈',tags:['ln','log','regler'],body:`<div class="formula-box">ln(xy)=lnx+lny · ln(xⁿ)=n lnx · eˡⁿˣ=x</div>`},
        {id:'mg-23',title:'Trigonometri – afledede',icon:'📐',tags:['sin','cos','integral'],body:`<div class="formula-box">(sinx)′=cosx · (cosx)′=−sinx · ∫sinx dx=−cosx+C</div>`},
        {id:'mg-24',title:'Parameterrepræsentation',icon:'📐',tags:['parameter','kurve','t'],body:`<div class="formula-box">x=f(t), y=g(t) · dy/dx=(dy/dt)/(dx/dt)</div>`},
        {id:'mg-25',title:'Polære koordinater',icon:'🔄',tags:['polær','r','θ'],body:`<div class="formula-box">x=r cosθ · y=r sinθ · r=√(x²+y²) · tanθ=y/x</div>`},
        {id:'mg-26',title:'Konvergens af rækker',icon:'Σ',tags:['konvergens','geometrisk','divergens'],body:`<div class="formula-box">Geometrisk: Σarⁿ=a/(1−r) for |r|&lt;1. Divergerer ellers.</div>`},
        {id:'mg-27',title:'Newton-Raphsons metode',icon:'💻',tags:['Newton-Raphson','numerisk','rod'],body:`<div class="formula-box">xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)</div><p>Iterér til konvergens → numerisk rod.</p>`},
        {id:'mg-28',title:'Optimering',icon:'📐',tags:['maksimum','minimum','ekstrema'],body:`<div class="def-box">Find f′(x)=0. f″&lt;0 → max · f″&gt;0 → min. Tjek altid endepunkterne!</div>`},
        {id:'mg-29',title:'Geometri i 3D',icon:'🧊',tags:['sfære','pyramide','overflade'],body:`<div class="formula-box">Sfære: V=⁴⁄₃πr³, A=4πr² · Pyramide: V=⅓Gh</div>`},
        {id:'mg-30',title:'Fourierserie – intro',icon:'〰️',tags:['Fourier','periodisk','harmonisk'],body:`<div class="formula-box">f(x)=a₀/2+Σ[aₙcos(nπx/L)+bₙsin(nπx/L)]</div><p>Bruges til at analysere periodiske signaler.</p>`},
      ]
    },
    'uni':{
      title:'Videregående uddannelse',
      description:'Matematisk analyse, lineær algebra, sandsynlighedsteori og numeriske metoder.',
      topics:[
        {id:'mu-1',title:'ε-δ definition',icon:'∞',tags:['grænseværdi','ε-δ'],body:`<div class="formula-box">lim(x→a)f(x)=L ⟺ ∀ε&gt;0 ∃δ&gt;0: |x−a|&lt;δ → |f(x)−L|&lt;ε</div>`},
        {id:'mu-2',title:'Differentiabilitet og kontinuitet',icon:'d/dx',tags:['differentiabel','glat'],body:`<div class="def-box">Differentiabel ⟹ kontinuert (ikke omvendt). f′ eksisterer når venstre- og højrelimit er ens.</div>`},
        {id:'mu-3',title:'Partielle afledede',icon:'∂',tags:['partiel','multivariabel'],body:`<div class="formula-box">∂f/∂x: afled m.h.t. x, hold y fast</div><div class="example-box"><span class="ex-label">Eks.</span> f=x²y → ∂f/∂x=2xy · ∂f/∂y=x²</div>`},
        {id:'mu-4',title:'Gradientvektoren',icon:'∇',tags:['gradient','retningsafledet'],body:`<div class="formula-box">∇f=(∂f/∂x, ∂f/∂y, ∂f/∂z)</div><p>Peger mod maksimal stigning. |∇f| er stigningens størrelse.</p>`},
        {id:'mu-5',title:'Dobbeltintegraler',icon:'∫∫',tags:['dobbeltintegral','Fubini'],body:`<div class="formula-box">∫∫_D f dA = ∫ₐᵇ[∫_{g₁}^{g₂} f dy]dx (Fubini)</div>`},
        {id:'mu-6',title:'Tredobbeltintegraler',icon:'∫∫∫',tags:['volumen','sfæriske koordinater'],body:`<div class="formula-box">∫∫∫_V f dV. Sfæriske: dV=r²sinφ dr dφ dθ</div>`},
        {id:'mu-7',title:'Linjeintegraler',icon:'∫_C',tags:['kurveintegral','arbejde'],body:`<div class="formula-box">∫_C F⃗·dr⃗ = ∫ₐᵇ F(r(t))·r′(t)dt</div><p>Arbejde udført af kraft langs kurve C.</p>`},
        {id:'mu-8',title:'Greens sætning',icon:'⊂',tags:['Green','plan','cirkulation'],body:`<div class="formula-box">∮_C(P dx+Q dy) = ∬_D(∂Q/∂x−∂P/∂y)dA</div>`},
        {id:'mu-9',title:'Stokes sætning',icon:'🔄',tags:['Stokes','rotation'],body:`<div class="formula-box">∬_S(∇×F⃗)·dS⃗ = ∮_{∂S} F⃗·dr⃗</div>`},
        {id:'mu-10',title:'Divergenssætningen',icon:'∇·',tags:['Gauss','flux','volumen'],body:`<div class="formula-box">∯_{∂V} F⃗·dA⃗ = ∭_V(∇·F⃗)dV</div>`},
        {id:'mu-11',title:'Fourieranalyse',icon:'〰️',tags:['Fourier','spektrum','harmonisk'],body:`<div class="def-box">Enhver periodisk funktion kan dekomponeres i sinusbølger. Grundlag for signal-, lyd- og billedbehandling.</div>`},
        {id:'mu-12',title:'Fouriertransformation',icon:'𝔽',tags:['FT','frekvensdomæne'],body:`<div class="formula-box">F̂(ω)=∫₋∞^∞ f(t)e^(−iωt)dt · Invers: (1/2π)∫F̂ e^(iωt)dω</div>`},
        {id:'mu-13',title:'Laplacetransformation',icon:'ℒ',tags:['Laplace','s-domæne','ODE'],body:`<div class="formula-box">ℒ{f(t)}=∫₀^∞ f(t)e^(−st)dt · ℒ{f′}=sF(s)−f(0)</div>`},
        {id:'mu-14',title:'ODE – separable',icon:'📐',tags:['ODE','separation'],body:`<div class="formula-box">dy/dx=f(x)g(y) → ∫dy/g(y)=∫f(x)dx+C</div>`},
        {id:'mu-15',title:'ODE – lineær 2. orden',icon:'📐',tags:['ODE','homogen','karakteristisk'],body:`<div class="formula-box">ay″+by′+cy=0 → ar²+br+c=0. Løsning afhænger af d=b²−4ac.</div>`},
        {id:'mu-16',title:'Partielle differentialligninger',icon:'∂',tags:['PDE','varmeligning','bølgeligning'],body:`<div class="def-box">Varmeligning: ∂u/∂t=α²∂²u/∂x². Bølgeligning: ∂²u/∂t²=c²∂²u/∂x². Løses ved separation.</div>`},
        {id:'mu-17',title:'Vektorrum og baser',icon:'V',tags:['vektorrum','basis','dimension'],body:`<div class="def-box">Basis = mindste spændende mængde. dim(V) = antal basisvektorer. 8 aksiomer for vektorrum.</div>`},
        {id:'mu-18',title:'Lineære afbildninger',icon:'T',tags:['transformation','kerne','billede'],body:`<div class="formula-box">T: V→W lineær ⟺ T(αu+βv)=αT(u)+βT(v). dim(ker)+dim(im)=dim(V).</div>`},
        {id:'mu-19',title:'Egenværdier – avanceret',icon:'λ',tags:['egenværdi','algebraisk multiplicitet'],body:`<div class="formula-box">det(A−λI)=0 → karakteristisk polynomium. Alg. vs. geom. multiplicitet.</div>`},
        {id:'mu-20',title:'Diagonalisering',icon:'▦',tags:['PDP⁻¹','diagonaliserbar'],body:`<div class="formula-box">A=PDP⁻¹: D diagonal, P = egenvektorer. Kræver n lin. uafh. egenvektorer.</div>`},
        {id:'mu-21',title:'Indre produktrum',icon:'⟨·,·⟩',tags:['indre produkt','Gram-Schmidt','ortogonal'],body:`<div class="formula-box">⟨u,v⟩: lineær, symmetrisk, positiv definit. Gram-Schmidt → ortonormalbasis.</div>`},
        {id:'mu-22',title:'Metriske rum',icon:'d(·,·)',tags:['metrik','Cauchy','fuldstændig'],body:`<div class="def-box">d(x,y): ikke-negativ, symmetrisk, trekantsulighed. Banachrum = fuldstændigt normeret rum.</div>`},
        {id:'mu-23',title:'Sandsynlighedsrum',icon:'Ω',tags:['σ-algebra','sandsynlighedsmål'],body:`<div class="formula-box">(Ω,ℱ,P): Ω=udfald · ℱ=σ-algebra · P(Ω)=1</div>`},
        {id:'mu-24',title:'Stokastiske variable og forventning',icon:'X',tags:['E[X]','varians','fordeling'],body:`<div class="formula-box">E[X]=∫x f(x)dx · Var(X)=E[X²]−(E[X])²</div>`},
        {id:'mu-25',title:'Betinget forventning',icon:'E[·|·]',tags:['tower property','betinget'],body:`<div class="formula-box">E[E[X|Y]]=E[X] (tower property). E[X|Y=y] er funktion af y.</div>`},
        {id:'mu-26',title:'Maximum likelihood (MLE)',icon:'θ̂',tags:['MLE','estimator','bias'],body:`<div class="formula-box">max L(θ)=∏f(xᵢ|θ). Log-likelihood: ℓ(θ)=Σln f(xᵢ|θ).</div>`},
        {id:'mu-27',title:'Bayesiansk statistik',icon:'P(θ|x)',tags:['Bayes','prior','posterior'],body:`<div class="formula-box">P(θ|x) ∝ P(x|θ)·P(θ) — Posterior ∝ Likelihood × Prior</div>`},
        {id:'mu-28',title:'Interpolation',icon:'💻',tags:['Lagrange','spline','interpolation'],body:`<div class="def-box">Lagrange: polynomium P med P(xᵢ)=yᵢ. Kubiske splines er glattere og mere stabile.</div>`},
        {id:'mu-29',title:'Numerisk integration',icon:'∫',tags:['trapezregel','Simpson','fejlorden'],body:`<div class="formula-box">Trapez: fejl O(h²). Simpsons regel: fejl O(h⁴). Gaussisk kvadratur: eksakt for polynomier op til grad 2n−1.</div>`},
        {id:'mu-30',title:'Kompleks analyse',icon:'ℂ',tags:['holomorf','Cauchy','residue'],body:`<div class="formula-box">Cauchys integral: f(z₀)=(1/2πi)∮f(z)/(z−z₀)dz · Residueteorem: 2πi·Σres</div>`},
      ]
    }
  }
};
