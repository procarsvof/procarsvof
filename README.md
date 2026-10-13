# VerkoopJouwBus

Blauw-witte bedrijfsbuswebsite met donkere blauwgrijze secties, kentekenformulier en gradient-effects op een lokale bestelbusillustratie. Naam: VerkoopJouwBus. De aangeleverde homepage-HTML en AutoZoWeg HTML/CSS zijn als referenties gebruikt. De interne AutoZoWeg-footerpaden blijven bereikbaar; de teksten zijn aangepast voor bedrijfsbussen. Contactgegevens komen uitsluitend uit de VerkoopJouwBus-HTML.

## Download en Netlify

Download de kant-en-klare ZIP via [VerkoopJouwBus.zip](https://github.com/procarsvof/procarsvof/raw/refs/heads/main/downloads/VerkoopJouwBus.zip), of gebruik GitHub **Code → Download ZIP** voor de volledige repository. Pak uit en upload uitsluitend de map `dist` naar Netlify Drop. Voor automatisch bouwen: koppel deze repository aan Netlify; `netlify.toml` bevat het bouwcommando en de publicatiemap.

Bekijk [desktoppreview](previews/verkoopjouwbus-desktop.png) en [mobielpreview](previews/verkoopjouwbus-mobiel.png). De oorspronkelijke RDW-integratie is nog niet exact aangesloten; zie hieronder.

## Bouwen en bekijken

```sh
python3 build.py
python3 -m http.server 8080 --directory dist --bind 0.0.0.0
```

Alleen Python 3 nodig, geen npm-dependencies. `dist` bevat de complete publiceerbare website; iedere pagina heeft eigen HTML en directe URL. `build.py`, `extra_pages.py`, `assets` en `netlify.toml` zijn de bronnen. `references` bewaart de aangeleverde HTML/CSS als tekst en wordt niet gepubliceerd. De ZIP bevat bronnen, dist en previews. Er is geen bestaande Netlify-site gewijzigd.

## Netlify

Importeer de bronnen met netlify.toml of upload de inhoud van dist via Netlify Drop. Schakel formulierdetectie in en deploy opnieuw. Configureer notificaties voor bus-aanvraag en dealer-interesse. Test echte inzendingen op de gepubliceerde site. De lokale Python-server verwerkt geen POST-aanvragen. Netlify-publicatie en formulierbezorging zijn hier niet getest; er is geen CRM of automatische taxatiebackend.

## RDW: oorspronkelijke integratie nog nodig

De HTML verwijst naar /assets/index-DRisOsjy.js maar dat JavaScript is niet meegeleverd. De originele RDW-koppeling is daardoor niet exact behouden of gecontroleerd. Live downloads zijn geblokkeerd door het netwerkbeleid. Lever dit oorspronkelijke bestand aan om de bestaande koppeling opnieuw aan te sluiten.

assets/tools.js bevat voorlopig een zelfstandige adapter naar de openbare RDW-voertuigdataset m9d7-ebf2. Bij beschikbare gegevens toont hij merk, model, voertuigsoort, eerste toelating, APK-vervaldatum en tellerstandoordeel en vult hij aanvraagvelden vooraf in. Dit is geen automatische taxatie. UI-tests met gecontroleerde RDW-antwoorden zijn uitgevoerd; een echte RDW-aanvraag is niet geverifieerd. Deze voorlopige adapter mag niet worden beschreven als de oorspronkelijke integratie.

## Routes en hulpmiddelen

Alle interne footerpaden uit het aangeleverde AutoZoWeg-bestand zijn bereikbaar, inclusief merk-, stad-, situatie-, data- en dealerpagina's. De drie advieslinks uit de homepage zijn toegevoegd. Extra VerkoopJouwBus-routes blijven beschikbaar. Pagina's met overeenkomstige inhoud gebruiken canonicals en staan niet dubbel in de XML-sitemap.

Vier lokale rekentools vergelijken repareren/verkopen, schorsingskosten, particulier/inkoper en afschrijving met expliciete invoer en aannames. Datapagina's geven uitleg en bronlinks: geen geverifieerde statistiekdataset is ingeladen. Geen fictieve cijfers, afkeurkansen, reviews of klantenaantallen. Dealerregistratie is een interesseformulier, geen accountportaal of veilingbackend.

## Voor publicatie

- Sluit het ontbrekende oorspronkelijke RDW-JavaScript aan en test echte aanvragen.
- Vul juridische bedrijfsidentiteit, contactgegevens, grondslag, bewaartermijnen, privacyverklaring en voorwaarden in. Juridische pagina's zijn niet-geïndexeerde concepten.
- Configureer en test Netlify Forms-bezorging en spamfilter.
- Controleer de overgenomen contactgegevens en werkelijke verkoopprocedure.
- Bij een ander domein: pas ORIGIN in build.py aan en bouw opnieuw voor canonicals, structured data en sitemap.
- De originele externe foto was niet downloadbaar. Lever het fotobestand aan om dezelfde fotografie te gebruiken; nu is een lokale illustratie met gradient gebruikt.

## SEO

Echte HTML, titels, meta descriptions, H1, canonical, interne links, sitemap.xml, robots.txt en Organization/WebSite/BreadcrumbList/FAQ-schema. Geen externe fonts, trackers of marketingcookies. Rankings en bereik hangen ook af van publicatie, indexatie, relevante inhoud en promotie. Deze ZIP is nog niet gepubliceerd of op indexatie getest.
