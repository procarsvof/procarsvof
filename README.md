# VerkoopJouwBus

Blauw-witte bedrijfsbuswebsite met donkere blauwgrijze secties, kentekenformulier en gradient-effects op een lokaal opgeslagen gegenereerde busfoto. Naam: VerkoopJouwBus. De aangeleverde homepage-HTML en AutoZoWeg HTML/CSS zijn als referenties gebruikt. De interne AutoZoWeg-footerpaden blijven bereikbaar; de teksten zijn aangepast voor bedrijfsbussen. Contactgegevens komen uitsluitend uit de VerkoopJouwBus-HTML.

## Download en Netlify

Download de kant-en-klare ZIP via [VerkoopJouwBus.zip](https://github.com/procarsvof/procarsvof/raw/refs/heads/main/downloads/VerkoopJouwBus.zip), of gebruik GitHub **Code → Download ZIP** voor de volledige repository. Pak uit en upload uitsluitend de map `dist` naar Netlify Drop. Voor automatisch bouwen: koppel deze repository aan Netlify; `netlify.toml` bevat het bouwcommando en de publicatiemap.

Bekijk [desktoppreview](previews/verkoopjouwbus-desktop.png) en [mobielpreview](previews/verkoopjouwbus-mobiel.png). De originele RDW-opvraagfuncties zijn nu aangesloten; zie hieronder.

## Bouwen en bekijken

```sh
python3 build.py
python3 -m http.server 8080 --directory dist --bind 0.0.0.0
```

Alleen Python 3 nodig, geen npm-dependencies. `dist` bevat de complete publiceerbare website; iedere pagina heeft eigen HTML en directe URL. `build.py`, `extra_pages.py`, `assets` en `netlify.toml` zijn de bronnen. `references` bewaart de aangeleverde HTML/CSS als tekst en wordt niet gepubliceerd. De ZIP bevat bronnen, dist en previews. Er is geen bestaande Netlify-site gewijzigd.

## Netlify

Importeer de bronnen met netlify.toml of upload de inhoud van dist via Netlify Drop. Schakel formulierdetectie in en deploy opnieuw. Configureer notificaties voor bus-aanvraag en dealer-interesse. Test echte inzendingen op de gepubliceerde site. De lokale Python-server verwerkt geen POST-aanvragen. Netlify-publicatie en formulierbezorging zijn hier niet getest; er is geen CRM of automatische taxatiebackend.

## RDW: originele opvraaglogica hergebruikt

Het oorspronkelijke JavaScript index-DRisOsjy.js kon nu via HTTPS worden opgehaald. De kentekenformattering, timeout, voertuig- en brandstofopvraag en normalisatie zijn ongewijzigd geëxtraheerd naar assets/rdw-original.js. assets/tools.js verbindt die functies met de nieuwe HTML-interface. Beide oorspronkelijke RDW-datasets (m9d7-ebf2 en 8ys7-d773) blijven gebruikt. Geen nieuwe taxatiebackend toegevoegd.

De homepage kan direct voertuiggegevens tonen, waarna merk, model, bouwjaar, APK, brandstof en inrichting in de aanvraag worden ingevuld. UI-tests met gecontroleerde antwoorden van beide datasets zijn uitgevoerd. Live RDW-beschikbaarheid en formulierbezorging zijn nog niet geverifieerd.

## Eerste indruk: kenteken eerst

Direct onder de navigatie staat de kentekenbox met de knop Bekijk mijn bus. Daarna volgen de introductietekst en vervolgens de afbeelding. Dit is zowel de HTML-volgorde als de zichtbare volgorde op desktop, tablet en mobiel. Invoer en knop passen zonder scrollen in een scherm van 320×568 pixels. De RDW-koppeling, handmatige aanvraag en situatiekiezer zijn behouden.

## Layout en fonts

Eigen VerkoopJouwBus-compositie met een asymmetrisch afgerond beeldvlak, subtiele blauwe gradients, een kentekenkaart, kaarten per verkoopsituatie, een driestappenproces met blauw accent, een donkerblauwe voordelen-sectie en een FAQ in twee kolommen. De referenties dienen als functionele basis; het ontwerp heeft een eigen uitwerking. Blauw #2563eb, wit en slate #0f172a blijven behouden. Inter 400/500/600/700/800 is lokaal gebundeld vanuit @fontsource/inter 5.3.0; pakketintegriteit gecontroleerd met SHA-512. Licentie: assets/fonts/LICENSE.txt. Geen externe fontrequests. De hero is een nieuw gegenereerde foto, geen afbeelding van een werkelijk aangeboden voertuig.

## Interactieve VerkoopJouwBus-ervaring

- Kies uw verkoopsituatie: voorbereiding en vervolglink passen zich aan; de keuze wordt zichtbaar meegenomen naar het aanvraagformulier (ook op de contactpagina).
- Doorzoek FAQ-antwoorden en wis de zoekopdracht. Een lege zoekuitkomst geeft uitleg.
- Op mobiel verschijnt een compacte aanvraagknop wanneer hero, formulier en footer buiten beeld zijn.
- Alleen de verkoopsituatie wordt in sessionStorage bewaard; deze interacties slaan geen contactgegevens op. De kentekencheck behoudt zijn bestaande voertuigopslag.
- Radioselectie en FAQ werken met toetsenbord. Met JavaScript uit blijven gewone informatie-links en native FAQ-accordions beschikbaar. Reduced-motion wordt gerespecteerd.
- Het formulier bevat nu het veld verkoop-situatie. Controleer na Netlify-deploy dat formulierdetectie de bijgewerkte velden verwerkt.

## Routes en hulpmiddelen

Alle interne footerpaden uit het aangeleverde AutoZoWeg-bestand zijn bereikbaar, inclusief merk-, stad-, situatie-, data- en dealerpagina's. De drie advieslinks uit de homepage zijn toegevoegd. Extra VerkoopJouwBus-routes blijven beschikbaar. Pagina's met overeenkomstige inhoud gebruiken canonicals en staan niet dubbel in de XML-sitemap.

Vier lokale rekentools vergelijken repareren/verkopen, schorsingskosten, particulier/inkoper en afschrijving met expliciete invoer en aannames. Datapagina's geven uitleg en bronlinks: geen geverifieerde statistiekdataset is ingeladen. Geen fictieve cijfers, afkeurkansen, reviews of klantenaantallen. Dealerregistratie is een interesseformulier, geen accountportaal of veilingbackend.

## Voor publicatie

- Test echte RDW-antwoorden en de formulierbezorging op de gepubliceerde website.
- Vul juridische bedrijfsidentiteit, contactgegevens, grondslag, bewaartermijnen, privacyverklaring en voorwaarden in. Juridische pagina's zijn niet-geïndexeerde concepten.
- Configureer en test Netlify Forms-bezorging en spamfilter.
- Controleer de overgenomen contactgegevens en werkelijke verkoopprocedure.
- Bij een ander domein: pas ORIGIN in build.py aan en bouw opnieuw voor canonicals, structured data en sitemap.
- De externe oorspronkelijke foto is vervangen door een nieuw gegenereerde busfoto met gradient.

## SEO

Echte HTML, titels, meta descriptions, H1, canonical, interne links, sitemap.xml, robots.txt en Organization/WebSite/BreadcrumbList/FAQ-schema. Geen externe fonts, trackers of marketingcookies. Rankings en bereik hangen ook af van publicatie, indexatie, relevante inhoud en promotie. Deze ZIP is nog niet gepubliceerd of op indexatie getest.
