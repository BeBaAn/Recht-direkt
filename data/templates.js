const ALL_TEMPLATES = [
  // KAUFRECHT (6 templates)
  {
    id: "kaufrecht_1", area: "kaufrecht", name: "Mängelanzeige Allgemein", description: "Mitteilung eines Mangels an gekaufter Ware mit Fristsetzung", file: "Maengelanzeige_Allgemein.pdf", text: `Sehr geehrte Damen und Herren,\n\nHiermit teile ich Ihnen mit, dass bei der von mir am [KAUF-/LIEFERDATUM] gekauften Ware [GENAUE BEZEICHNUNG, BESTELLNUMMER] folgende Mängel vorliegen:\n\n[GENAUE MANGELBESCHREIBUNG - z.B. Gerät funktioniert nicht, Beschädigung, falsche Ware]\n\nIch fordere Sie gemäß § 439 BGB auf, die Ware bis zum [DATUM IN 14 TAGEN] kostenlos zu reparieren oder durch eine mangelfreie Ware zu ersetzen.\n\nSollte innerhalb der Frist keine Nachbesserung erfolgen, behalte ich mir vor, vom Kaufvertrag zurückzutreten oder den Kaufpreis zu mindern.\n\nMit freundlichen Grüßen\n[IHR NAME]\n[IHRE ADRESSE]\n[TELEFON/EMAIL]`,
    preview: `Sehr geehrte Damen und Herren, hiermit teile ich Ihnen mit, dass bei der von mir am [DATUM] gekauften Ware folgende Mängel vorliegen...`},
  {
    id: "kaufrecht_2", area: "kaufrecht", name: "Widerruf Online-Kauf", description: "Widerruf eines Online-Kaufs innerhalb der 14-Tage-Frist", file: "Widerruf_Online_Kauf.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit widerrufe ich meinen am [KAUFDATUM] geschlossenen Kaufvertrag über folgende Ware:\n\nBestellnummer: [BESTELLNUMMER]\nProdukt: [PRODUKTBEZEICHNUNG]\nKaufpreis: [BETRAG] €\n\nIch mache von meinem gesetzlichen Widerrufsrecht gemäß § 355 BGB Gebrauch.\n\nBitte bestätigen Sie mir den Eingang dieses Widerrufs und teilen Sie mir die Rücksendeadresse sowie das Rücksendelabel mit.\n\nIch erwarte die Rückerstattung des vollständigen Kaufpreises innerhalb von 14 Tagen nach Rücksendung der Ware.\n\nMit freundlichen Grüßen\n[IHR NAME]\n[IHRE ADRESSE]`,
    preview: `Sehr geehrte Damen und Herren, hiermit widerrufe ich meinen am [DATUM] geschlossenen Kaufvertrag...`},
  {
    id: "kaufrecht_3", area: "kaufrecht", name: "Gewährleistungsanspruch", description: "Geltendmachung von Gewährleistungsrechten bei Mängeln", file: "Gewaehrleistungsanspruch.pdf", text: `Sehr geehrte Damen und Herren,\n\ndie von mir am [KAUFDATUM] erworbene Ware [PRODUKTBEZEICHNUNG, BESTELLNR.] weist folgende Mängel auf:\n\n[DETAILLIERTE MANGELBESCHREIBUNG]\n\nDa diese Mängel bereits bei Übergabe vorlagen bzw. innerhalb der Gewährleistungsfrist aufgetreten sind, mache ich hiermit meine Gewährleistungsrechte gemäß §§ 437, 439 BGB geltend.\n\nIch fordere Sie auf, bis zum [DATUM + 14 TAGE]:\n- Die Ware kostenlos zu reparieren, ODER\n- Eine mangelfreie Ersatzware zu liefern\n\nSollten Sie dieser Aufforderung nicht nachkommen, werde ich vom Kaufvertrag zurücktreten und die Erstattung des Kaufpreises verlangen.\n\nMit freundlichen Grüßen\n[NAME, ADRESSE]`,
    preview: `Sehr geehrte Damen und Herren, die von mir erworbene Ware weist Mängel auf. Ich mache meine Gewährleistungsrechte geltend...`},
  {
    id: "kaufrecht_4", area: "kaufrecht", name: "Minderung Kaufpreis", description: "Kaufpreisminderung bei mangelhafter Ware", file: "Minderung_Kaufpreis.pdf", text: `Sehr geehrte Damen und Herren,\n\ndie von mir am [KAUFDATUM] erworbene Ware [PRODUKTBEZEICHNUNG] ist mangelhaft.\n\nTrotz meiner Mängelanzeige vom [DATUM] und der gesetzten Nachfrist ist keine zufriedenstellende Nachbesserung erfolgt.\n\nGemäß § 441 BGB erkläre ich hiermit die Minderung des Kaufpreises um [BETRAG oder PROZENTSATZ] €.\n\nDer geminderte Kaufpreis beträgt somit [NEUER BETRAG] €. Ich habe bereits [GEZAHLTER BETRAG] € bezahlt und fordere Sie auf, mir den Differenzbetrag von [DIFFERENZ] € bis zum [DATUM + 14 TAGE] auf folgendes Konto zu überweisen:\n\nIBAN: [IHRE IBAN]\nKontoinhaber: [IHR NAME]\n\nMit freundlichen Grüßen\n[NAME, ADRESSE]`,
    preview: `Sehr geehrte Damen und Herren, hiermit erkläre ich die Minderung des Kaufpreises aufgrund mangelhafter Ware...`},
  {
    id: "kaufrecht_5", area: "kaufrecht", name: "Rücktritt vom Kauf", description: "Rücktrittserklärung vom Kaufvertrag wegen Mängeln", file: "Ruecktritt_Kaufvertrag.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit erkläre ich den Rücktritt vom Kaufvertrag über [PRODUKTBEZEICHNUNG] vom [KAUFDATUM].\n\nBegründung:\nTrotz meiner Mängelanzeige vom [DATUM] und der gesetzten Nachfrist bis [FRISTDATUM] haben Sie die Mängel nicht beseitigt. Die Ware ist nach wie vor mangelhaft und unbrauchbar.\n\nGemäß § 440 BGB trete ich daher vom Kaufvertrag zurück und fordere Sie auf:\n\n1. Die Ware auf Ihre Kosten abzuholen\n2. Den vollständigen Kaufpreis von [BETRAG] € bis zum [DATUM + 7 TAGE] zurückzuerstatten auf:\n   IBAN: [IHRE IBAN]\n   Kontoinhaber: [IHR NAME]\n\nMit freundlichen Grüßen\n[NAME]\n[ADRESSE]`,
    preview: `Sehr geehrte Damen und Herren, hiermit erkläre ich den Rücktritt vom Kaufvertrag wegen nicht beseitigter Mängel...`},
  {
    id: "kaufrecht_6", area: "kaufrecht", name: "Nachbesserung verlangen", description: "Aufforderung zur Nachbesserung/Reparatur mangelhafter Ware", file: "Nachbesserung_Verlangen.pdf", text: `Sehr geehrte Damen und Herren,\n\nam [KAUFDATUM] habe ich bei Ihnen [PRODUKTBEZEICHNUNG, BESTELLNR.] erworben.\n\nDie Ware weist folgende Mängel auf:\n[MANGELBESCHREIBUNG]\n\nIch fordere Sie gemäß § 439 Abs. 1 BGB auf, die Ware durch Nachbesserung (Reparatur) bis zum [DATUM + 14 TAGE] kostenfrei instand zu setzen.\n\nBitte teilen Sie mir mit, wann und wo die Reparatur durchgeführt wird. Die Kosten für Versand und Reparatur tragen Sie.\n\nSollte die Nachbesserung nicht fristgerecht erfolgen oder fehlschlagen, behalte ich mir vor, vom Vertrag zurückzutreten oder den Kaufpreis zu mindern.\n\nMit freundlichen Grüßen\n[NAME]\n[ADRESSE]\n[KONTAKT]`,
    preview: `Sehr geehrte Damen und Herren, ich fordere Sie zur kostenlosen Nachbesserung der mangelhaften Ware auf...`},

  // MIETRECHT (30 templates)
  {
    id: "mietrecht_1", area: "mietrecht", name: "Mängelanzeige Heizung", description: "Anzeige Heizungsausfall mit Fristsetzung und Mietminderungs-Ankündigung", file: "Maengelanzeige_Heizung.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Mängelanzeige – Heizungsausfall, Mietwohnung [IHRE ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

hiermit zeige ich Ihnen formell an, dass die Heizungsanlage in meiner Wohnung ([ADRESSE, WOHNUNGSNUMMER]) seit dem [DATUM DES AUSFALLS] vollständig ausgefallen ist bzw. nicht ordnungsgemäß funktioniert.

Festgestellte Mängel:
– Raumtemperatur im [ZIMMER/WOHNUNG] beträgt nur [TEMPERATUR] °C (gesetzlicher Mindeststandard: 20–22 °C)
– [WEITERE KONKRETE BESCHREIBUNG, z.B. Heizkörper bleibt kalt, Thermostat reagiert nicht]
– Warmwasserversorgung ebenfalls betroffen: [JA / NEIN]

Ich fordere Sie gemäß § 535 Abs. 1 BGB auf, den Mangel bis spätestens
[DATUM: MORGEN / IN 3 TAGEN]
zu beseitigen. Eine funktionierende Heizung ist gerade in der kalten Jahreszeit zwingend notwendig.

Sollte der Mangel nicht bis zur gesetzten Frist behoben werden, werde ich die monatliche Miete ab [DATUM] um [10–30] % mindern. Ich behalte mir außerdem die Geltendmachung von Schadensersatz für entstandene Mehrkosten (z.B. Elektroheizgeräte) vor.

Bitte bestätigen Sie den Eingang dieses Schreibens schriftlich.

Mit freundlichen Grüßen,
[IHR NAME]
[TELEFON / E-MAIL]

Anlage: Temperaturprotokoll [DATUM–DATUM]`,
    preview: `Hiermit zeige ich Ihnen an, dass die Heizungsanlage seit [DATUM] ausgefallen ist. Ich fordere Behebung bis [FRIST], andernfalls Mietminderung...`},
  {
    id: "mietrecht_2", area: "mietrecht", name: "Mängelanzeige Schimmel – Bauschaden", description: "Anzeige von Schimmelbefall mit Verweis auf Bauschaden-Rechtsprechung (BGH)", file: "Maengelanzeige_Schimmel_Bauschaden.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Mängelanzeige – Schimmelbefall durch Bauschaden, Mietwohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

hiermit zeige ich Ihnen an, dass in meiner Wohnung ([ADRESSE, WNR.]) folgender Schimmelbefall vorliegt:

Ort:         [z.B. Schlafzimmer, Außenwand, Ecke links]
Ausdehnung:  ca. [GRÖßE, z.B. 30 × 40 cm]
Erstmals bemerkt am: [DATUM]

Ich lüfte die Wohnung täglich [ANZAHL] × stoßweise für mindestens [MINUTEN] Minuten und heize alle Räume auf mindestens [TEMPERATUR] °C. Die Ursache des Schimmels ist daher auf einen Bauschaden (Wärmebrücke, unzureichende Dämmung) zurückzuführen.

Ich verweise auf die ständige Rechtsprechung des Bundesgerichtshofs (BGH, Urt. v. 18.04.2007 – VIII ZR 182/06; BGH, Urt. v. 05.12.2018 – VIII ZR 67/18): Schimmel infolge von Wärmebrücken stellt einen Mangel der Mietsache dar, für den der Vermieter einzustehen hat – auch wenn der Mieter nicht „optimal" lüftet.

Ich fordere Sie gemäß § 535 Abs. 1 BGB auf, den Mangel bis zum [DATUM IN 14 TAGEN] vollständig zu beseitigen und die Ursache dauerhaft zu beheben.

Bis zur vollständigen Behebung mindere ich die monatliche Miete um [5–15] % gemäß § 536 BGB.

Ich dokumentiere den Schimmelbefall mit Fotos und Temperaturmessungen (Anlage). Sollte die Beseitigung nicht fristgerecht erfolgen, werde ich ein Sachverständigengutachten auf Ihre Kosten in Auftrag geben.

Mit freundlichen Grüßen,
[IHR NAME]

Anlagen: Fotos ([DATUM]), Temperaturmessprotokoll`,
    preview: `Schimmelbefall durch Wärmebrücke (Bauschaden, BGH-Rspr.). Lüfte ordnungsgemäß. Forderung zur Beseitigung bis [FRIST], Mietminderung [X]%...`},
  {
    id: "mietrecht_3", area: "mietrecht", name: "Mängelanzeige allgemein", description: "Universelle Mängelanzeige mit Fristsetzung für beliebige Wohnungsmängel", file: "Maengelanzeige_Allgemein.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Mängelanzeige – [KURZBEZEICHNUNG MANGEL], Mietwohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

hiermit zeige ich Ihnen folgende Mängel in meiner Wohnung ([ADRESSE, WNR.]) an:

1. [MANGEL 1: GENAUE BESCHREIBUNG, ORT, SEIT WANN]
2. [MANGEL 2: GENAUE BESCHREIBUNG, ORT, SEIT WANN]
3. [MANGEL 3: GENAUE BESCHREIBUNG, ORT, SEIT WANN]

Die genannten Mängel beeinträchtigen die Nutzung der Mietwohnung erheblich.

Ich fordere Sie gemäß § 535 Abs. 1 BGB auf, die Mängel bis zum [DATUM IN 14 TAGEN] vollständig zu beseitigen.

Sollte bis zum genannten Datum keine Abhilfe erfolgen, werde ich:
– die monatliche Miete gemäß § 536 BGB um [PROZENTSATZ] % mindern,
– einen Sachverständigen auf Ihre Kosten beauftragen,
– erforderlichenfalls rechtliche Schritte einleiten.

Bitte bestätigen Sie den Eingang dieses Schreibens und teilen Sie mir mit, wann ein Handwerker die Mängel besichtigen kann.

Mit freundlichen Grüßen,
[IHR NAME]
[TELEFON / E-MAIL]

Anlagen: Fotos der Mängel (Aufnahmedatum: [DATUM])`,
    preview: `Anzeige folgender Mängel: [BESCHREIBUNG]. Forderung zur Behebung bis [FRIST]. Bei Untätigkeit: Mietminderung und Sachverständiger...`},
  {
    id: "mietrecht_4", area: "mietrecht", name: "Mängelanzeige Ungeziefer", description: "Anzeige von Schädlingsbefall (Kakerlaken, Mäuse, Bettwanzen) mit Sofortforderung", file: "Maengelanzeige_Ungeziefer.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

EINSCHREIBEN MIT RÜCKSCHEIN

Betreff: DRINGENDE Mängelanzeige – Schädlingsbefall, Mietwohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

hiermit zeige ich Ihnen dringend an, dass in meiner Wohnung ([ADRESSE, WNR.]) ein akuter Schädlingsbefall vorliegt:

Art des Befalls:  [Kakerlaken / Bettwanzen / Mäuse / Ratten / Sonstiges]
Erstmals bemerkt: [DATUM]
Betroffene Räume: [KÜCHE / SCHLAFZIMMER / GESAMT]
Ausmaß:          [BESCHREIBUNG, z.B. täglich mehrere Tiere sichtbar]

Schädlingsbefall stellt einen schwerwiegenden Mangel der Mietsache dar und gefährdet die Gesundheit der Bewohner.

Ich fordere Sie gemäß § 535 Abs. 1 BGB auf, unverzüglich – spätestens bis [DATUM: IN 48 STUNDEN] –
– einen zertifizierten Schädlingsbekämpfer zu beauftragen,
– die Ursache (Eintrittspfade, Hygienemängel im Gebäude) zu beseitigen.

Ich habe außerdem das Gesundheitsamt unter [TELEFON / DATUM] informiert.

Ab dem [DATUM DER ANZEIGE] mindere ich die monatliche Miete um [25–80] % gemäß § 536 BGB.

Ich behalte mir Schadensersatz für beschädigte Lebensmittel, Kleidung und Bettwaren vor (Auflistung in Anlage).

Mit freundlichen Grüßen,
[IHR NAME]

Anlagen: Fotos/Videos des Befalls, Inventarliste beschädigter Gegenstände`,
    preview: `Akuter Schädlingsbefall ([ART]). Forderung zur sofortigen Beauftragung Schädlingsbekämpfer bis [48h]. Mietminderung [X]%, Schadensersatz vorbehalten...`},
  {
    id: "mietrecht_5", area: "mietrecht", name: "Mängelanzeige Aufzug", description: "Mängelanzeige bei Aufzugsausfall, insbesondere bei Angewiesensein auf Barrierefreiheit", file: "Maengelanzeige_Aufzug.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Mängelanzeige – Aufzugsausfall, [ADRESSE, WNR., ETAGE]

Sehr geehrte/r [ANREDE VERMIETER],

hiermit zeige ich Ihnen an, dass der Aufzug in [ADRESSE, GEBÄUDE] seit dem [DATUM] ausgefallen ist / nicht ordnungsgemäß funktioniert.

[OPTIONAL, wenn zutreffend:]
Ich weise ausdrücklich darauf hin, dass ich auf die Nutzung des Aufzugs angewiesen bin, da ich [eine Gehbehinderung habe / auf einen Rollstuhl angewiesen bin / aus gesundheitlichen Gründen keine Treppen steigen kann]. Meine Wohnung befindet sich im [ETAGE]. STOCK.

Der Ausfall des Aufzugs stellt einen erheblichen Mangel der Mietsache dar, der die Nutzbarkeit meiner Wohnung massiv einschränkt.

Ich fordere Sie gemäß § 535 Abs. 1 BGB auf, den Aufzug bis spätestens [DATUM IN 48 STUNDEN / 14 TAGEN] wieder in Betrieb zu nehmen.

Ab dem [DATUM DER ANZEIGE] mindere ich die monatliche Miete um [5–20] % gemäß § 536 BGB.

[Optional:] Ich bitte außerdem um die Organisation einer vorübergehenden Hilfslösung (Treppensteighilfe, Notfall-Unterkunft in einem anderen Stockwerk).

Mit freundlichen Grüßen,
[IHR NAME]
[TELEFON / E-MAIL]`,
    preview: `Aufzug ausgefallen seit [DATUM]. [Bin auf Aufzug angewiesen.] Forderung zur Reparatur bis [FRIST], Mietminderung [X]% ab Anzeige...`},
  {
    id: "mietrecht_6", area: "mietrecht", name: "Mietminderung ankündigen", description: "Formelle Ankündigung einer Mietminderung nach vorheriger Mängelanzeige", file: "Mietminderung_Ankuendigung.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Ankündigung Mietminderung gem. § 536 BGB – [KURZBEZEICHNUNG MANGEL]

Sehr geehrte/r [ANREDE VERMIETER],

mit Schreiben vom [DATUM DER MÄNGELANZEIGE] habe ich Ihnen den folgenden Mangel angezeigt:

[MANGELBESCHREIBUNG]

Da der Mangel bis heute nicht behoben wurde, teile ich Ihnen hiermit mit, dass ich die monatliche Miete ab [DATUM / 1. DES FOLGEMONATS] gemäß § 536 BGB mindere.

Geminderte Miete:
Bisherige Kaltmiete:              [BETRAG] €
Minderung ([PROZENTSATZ] %):    – [BETRAG] €
Neue monatliche Kaltmiete:       [BETRAG] €

Nebenkosten-Vorauszahlung bleibt unverändert: [BETRAG] €
Neue Gesamtüberweisung:          [BETRAG] €

Ich weise darauf hin, dass die Minderung ab dem Zeitpunkt der Mängelanzeige gilt. Ich behalte mir vor, die einbehaltenen Beträge als Schadensersatz rückwirkend geltend zu machen.

Die Minderung gilt bis zur vollständigen Beseitigung des Mangels.

Mit freundlichen Grüßen,
[IHR NAME]

Anlage: Kopie der Mängelanzeige vom [DATUM]`,
    preview: `Ankündigung Mietminderung gem. § 536 BGB ab [DATUM]. Bisherige Miete [X]€, Minderung [Y]%, neue Miete [Z]€. Gilt bis Mängelbeseitigung...`},
  {
    id: "mietrecht_7", area: "mietrecht", name: "Mietminderung – Lärmprotokoll Beschwerde", description: "Beschwerde über Dauerlärmbelästigung mit Protokoll und Mietminderungs-Ankündigung", file: "Mietminderung_Laerm.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Lärmbelästigung – Mängelanzeige und Mietminderung, Mietwohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich zeige Ihnen an, dass ich seit dem [DATUM] durch anhaltende Lärmbelästigung in der Nutzung meiner Wohnung erheblich beeinträchtigt werde.

Quelle der Lärmbelästigung: [Nachbar Whg. Nr. / Baustelle im/am Gebäude / Gewerbe im Haus]
Art des Lärms: [Musik / Stampfen / Maschinen / Lüftungsanlage / Sonstiges]
Zeiten: [z.B. täglich 22–02 Uhr / Werktags 07–18 Uhr]

Lärmprotokoll (Auszug):
[DATUM]  [UHRZEIT–UHRZEIT]  [ART DES LÄRMS]
[DATUM]  [UHRZEIT–UHRZEIT]  [ART DES LÄRMS]
[DATUM]  [UHRZEIT–UHRZEIT]  [ART DES LÄRMS]
→ Vollständiges Protokoll als Anlage

Ich fordere Sie auf, bis zum [DATUM IN 14 TAGEN] geeignete Maßnahmen zu ergreifen, um die Lärmbelästigung zu unterbinden (z.B. Abmahnung des Verursachers, bauliche Maßnahmen).

Ab dem [DATUM DIESER ANZEIGE] mindere ich die monatliche Miete um [5–15] % gemäß § 536 BGB.

Mit freundlichen Grüßen,
[IHR NAME]

Anlagen: Vollständiges Lärmprotokoll, ggf. Polizeieinsatzprotokolle`,
    preview: `Lärmbelästigung durch [QUELLE] seit [DATUM]. Lärmprotokoll beigefügt. Forderung zur Abhilfe bis [FRIST], Mietminderung [X]%...`},
  {
    id: "mietrecht_8", area: "mietrecht", name: "Ordentliche Kündigung durch Mieter", description: "Fristgerechte ordentliche Kündigung des Mietvertrags durch den Mieter", file: "Kuendigung_Mieter_Ordentlich.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

EINSCHREIBEN MIT RÜCKSCHEIN

Betreff: Kündigung des Mietvertrags, Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

hiermit kündige ich den Mietvertrag über die Wohnung [VOLLSTÄNDIGE ADRESSE, WNR.], abgeschlossen am [DATUM MIETVERTRAG], fristgerecht zum [KÜNDIGUNGSDATUM].

[Hinweis zur Frist: Kündigung muss spätestens am 3. Werktag eines Monats eingehen, damit dieser Monat zählt. Kündigungsfrist = 3 Monate. Beispiel: Eingang 3. Oktober → Ende: 31. Januar.]

Ich bitte um schriftliche Bestätigung der Kündigung sowie um Terminvereinbarung für die Wohnungsübergabe.

Die Wohnung werde ich zum [ÜBERGABEDATUM] in ordnungsgemäßem Zustand übergeben. Ich bitte Sie außerdem, mir die Kaution in Höhe von [BETRAG] € nach der Übergabe zurückzuzahlen.

Mit freundlichen Grüßen,
[IHR NAME]
[UNTERSCHRIFT]

[Falls WG: Alle Hauptmieter müssen unterschreiben!]
[IHR NAME 2]
[UNTERSCHRIFT 2]`,
    preview: `Ordentliche Kündigung zum [DATUM] per Einschreiben. Bitte um Bestätigung und Übergabetermin. Kaution [X]€ zurückzuzahlen...`},
  {
    id: "mietrecht_9", area: "mietrecht", name: "Außerordentliche Kündigung durch Mieter", description: "Fristlose außerordentliche Kündigung wegen schwerwiegender Mängel (Heizung, Schimmel, Unbewohnbarkeit)", file: "Kuendigung_Mieter_Fristlos.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

EINSCHREIBEN MIT RÜCKSCHEIN

Betreff: Außerordentliche fristlose Kündigung gem. § 543 BGB, Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

hiermit kündige ich den Mietvertrag über die Wohnung [ADRESSE, WNR.] außerordentlich und fristlos gemäß § 543 Abs. 1 i.V.m. Abs. 2 Nr. 1 BGB.

Begründung:
Trotz meiner schriftlichen Mängelanzeige vom [DATUM] wurde der folgende schwerwiegende Mangel nicht behoben:

[MANGELBESCHREIBUNG: z.B. vollständiger Heizungsausfall seit X Wochen / massiver Schimmelbefall / gesundheitsgefährdende Zustände]

Die Wohnung ist dadurch faktisch [nicht bewohnbar / nicht in vertragsgemäßem Zustand] und kann von mir nicht mehr wie vertraglich vorgesehen genutzt werden. Eine weitere Fortsetzung des Mietverhältnisses ist mir nicht zumutbar.

Ich fordere Sie auf, mir die gesamte Kaution (€ [BETRAG]) unverzüglich, spätestens bis [DATUM], zu erstatten sowie mir alle durch den Mangel entstandenen Schäden zu ersetzen (z.B. Hotelkosten, Umzugskosten).

Die Wohnung stelle ich Ihnen nach Abzug meiner Gegenstände ab [DATUM] zur Verfügung.

Mit freundlichen Grüßen,
[IHR NAME]

Anlagen: Mängelanzeige(n) vom [DATUM/EN], Fotos, Temperaturprotokolle`,
    preview: `Außerordentliche fristlose Kündigung gem. § 543 BGB wegen [MANGEL]. Trotz Mängelanzeige [DATUM] nicht behoben. Kaution zurückfordern...`},
  {
    id: "mietrecht_10", area: "mietrecht", name: "Widerspruch Eigenbedarfskündigung", description: "Widerspruch gegen Eigenbedarfskündigung mit Härtefallbegründung", file: "Widerspruch_Eigenbedarfskuendigung.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

EINSCHREIBEN MIT RÜCKSCHEIN

Betreff: Widerspruch gegen Eigenbedarfskündigung vom [DATUM DER KÜNDIGUNG], Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

gegen Ihre Eigenbedarfskündigung vom [DATUM] lege ich hiermit fristgerecht Widerspruch ein gemäß § 574 Abs. 1 BGB.

Die Kündigung ist mir und meinen Mitbewohnern unzumutbar. Es liegen folgende Härtegründe vor:

[ZUTREFFENDES ANKREUZEN / ERGÄNZEN:]
☐ Hohes Alter: Ich bin [ALTER] Jahre alt und lebe seit [JAHRE] Jahren in dieser Wohnung.
☐ Schwere Erkrankung: [KRANKHEIT, ggf. mit ärztlichem Attest als Anlage]
☐ Behinderung: [GRAD DER BEHINDERUNG, Barrierefreiheit der Wohnung]
☐ Kinder: Meine Kinder besuchen die Schule [NAME] und würden aus ihrem sozialen Umfeld gerissen.
☐ Lange Mietdauer: Ich bewohne diese Wohnung seit [JAHRE] Jahren.
☐ Nachweislich keine zumutbare Ersatzwohnung auf dem lokalen Wohnungsmarkt verfügbar.

Ich weise zusätzlich darauf hin, dass der angegebene Eigenbedarf [nicht ausreichend substantiiert ist / Zweifel an der Ernsthaftigkeit bestehen, da].

Ich bitte Sie, die Kündigung zurückzunehmen und mir eine angemessene Verlängerung des Mietverhältnisses anzubieten.

Mit freundlichen Grüßen,
[IHR NAME]

Anlagen: [ärztliches Attest / Schulbescheinigung / Nachweis Wohnungssuche]`,
    preview: `Widerspruch gegen Eigenbedarfskündigung gem. § 574 BGB. Härtegründe: [Alter/Krankheit/Kinder]. Bitte um Rücknahme der Kündigung...`},
  {
    id: "mietrecht_11", area: "mietrecht", name: "Widerspruch ordentliche Kündigung (Formfehler)", description: "Widerspruch gegen ordentliche Kündigung wegen Formfehler oder fehlender Begründung", file: "Widerspruch_Ordentliche_Kuendigung.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

EINSCHREIBEN MIT RÜCKSCHEIN

Betreff: Widerspruch gegen Kündigung vom [DATUM], Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

gegen Ihre Kündigung vom [DATUM] lege ich hiermit Widerspruch ein.

Die Kündigung ist aus folgenden Gründen unwirksam:

[ZUTREFFENDES AUSWÄHLEN:]
☐ Fehlende / unzureichende Begründung (§ 573 Abs. 3 BGB: Begründung muss konkret und nachvollziehbar sein)
☐ Formfehler: Die Kündigung fehlt eine eigenhändige Unterschrift (§ 568 Abs. 1 BGB)
☐ Falsche Kündigungsfrist: Die angegebene Frist entspricht nicht der gesetzlichen Staffelung (Mietdauer [X] Jahre → Frist [Y] Monate)
☐ Kein berechtigtes Interesse des Vermieters dargelegt (§ 573 BGB)
☐ Sonstiger Grund: [BESCHREIBEN]

Ich werde die Wohnung nicht räumen und verlange die Rücknahme der Kündigung sowie eine schriftliche Bestätigung, dass das Mietverhältnis ungekündigt fortbesteht.

Mit freundlichen Grüßen,
[IHR NAME]

Anlage: Kopie der Kündigung vom [DATUM]`,
    preview: `Widerspruch gegen Kündigung vom [DATUM]. Unwirksamkeitsgründe: [Formfehler / fehlende Begründung / falsche Frist]. Räumung verweigert...`},
  {
    id: "mietrecht_12", area: "mietrecht", name: "Eigenbedarf Widerspruch – Vorgetäuschter Bedarf", description: "Schadensersatzforderung bei nachträglich entfalltem oder vorgetäuschtem Eigenbedarf", file: "Eigenbedarf_Vorgetaeuscht_Schadensersatz.pdf", text: `[IHR NAME]
[NEUE ADRESSE]
[PLZ ORT]

[VERMIETER]
[ADRESSE VERMIETER]

[ORT], [DATUM]

EINSCHREIBEN MIT RÜCKSCHEIN

Betreff: Schadensersatz wegen vorgetäuschtem/entfallenem Eigenbedarf, Wohnung [FRÜHERE ADRESSE]

Sehr geehrte/r [ANREDE VERMIETER],

ich habe die Wohnung [FRÜHERE ADRESSE] aufgrund Ihrer Eigenbedarfskündigung vom [DATUM] zum [DATUM] geräumt.

Ich habe festgestellt, dass Sie die Wohnung nicht für den angegebenen Eigenbedarf nutzen, sondern [erneut vermietet haben / leer stehen lassen / anders genutzt haben].

Der von Ihnen angegebene Eigenbedarf war daher entweder von Anfang an nicht gegeben oder ist inzwischen entfallen. In beiden Fällen stehen mir Schadensersatzansprüche zu (§ 280 Abs. 1 i.V.m. § 573 BGB).

Ich fordere Sie auf, mir bis zum [DATUM IN 4 WOCHEN] folgenden Schaden zu ersetzen:

Umzugskosten:                  [BETRAG] €
Maklerkosten neue Wohnung:     [BETRAG] €
Mietdifferenz pro Monat × [X]: [BETRAG] €
Sonstige Kosten:               [BETRAG] €
Gesamt:                        [BETRAG] €

Ich behalte mir außerdem vor, eine Rückkehrmöglichkeit in die Wohnung gerichtlich durchzusetzen.

Mit freundlichen Grüßen,
[IHR NAME]

Anlagen: Nachweis der Zwischennutzung / Leerstand, Kostenbelege`,
    preview: `Schadensersatz wegen vorgetäuschtem Eigenbedarf. Wohnung nicht für Eigenbedarf genutzt. Forderung: Umzugskosten, Mietdifferenz, Makler [gesamt X€]...`},
  {
    id: "mietrecht_13", area: "mietrecht", name: "Nebenkosteneinspruch", description: "Widerspruch gegen Nebenkostenabrechnung mit Belegeinsichts-Forderung", file: "Nebenkosteneinspruch.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Widerspruch gegen Nebenkostenabrechnung [ABRECHNUNGSJAHR], Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich habe Ihre Nebenkostenabrechnung für das Jahr [ABRECHNUNGSJAHR] vom [DATUM] erhalten. Ich erhebe hiermit fristgerecht Widerspruch gemäß § 556 BGB.

Meine Einwände:

☐ Abrechnung enthält nicht umlagefähige Positionen (z.B. Verwaltungskosten, Reparaturkosten, Instandhaltung)
☐ Verteilerschlüssel nicht angegeben oder nicht korrekt
☐ Position [BEZEICHNUNG] in Höhe von [BETRAG] € ist nicht nachvollziehbar
☐ Abrechnung wurde nach Ablauf der 12-Monatsfrist (§ 556 Abs. 3 BGB) zugestellt
☐ Sonstiges: [BESCHREIBUNG]

Ich fordere Sie auf, mir bis zum [DATUM IN 14 TAGEN] Einsicht in sämtliche Belege (Rechnungen, Verträge, Zählerstände) zu gewähren.

Ich behalte mir vor, die Nachzahlung in Höhe von [BETRAG] € bis zur Klärung einzubehalten.

Mit freundlichen Grüßen,
[IHR NAME]

Anlage: Kopie der Nebenkostenabrechnung`,
    preview: `Widerspruch Nebenkostenabrechnung [JAHR]. Einwände: [nicht umlagefähige Positionen / Formfehler]. Belegeinsicht bis [FRIST]. Nachzahlung einbehalten...`},
  {
    id: "mietrecht_14", area: "mietrecht", name: "Widerspruch Heizkostenabrechnung", description: "Formeller Widerspruch gegen fehlerhafte oder zu hohe Heizkostenabrechnung", file: "Widerspruch_Heizkostenabrechnung.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Widerspruch gegen Heizkostenabrechnung [ABRECHNUNGSJAHR], Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich erhebe hiermit Widerspruch gegen die Heizkostenabrechnung für das Jahr [ABRECHNUNGSJAHR] vom [DATUM].

Meine Einwände:

☐ Die Abrechnung weicht erheblich von den Vorjahreswerten ab (+[PROZENT]%), ohne dass dies durch Energiepreise allein erklärbar ist
☐ Der Verteilerschlüssel entspricht nicht den Vorgaben der HeizkostenV (mind. 50% nach Verbrauch)
☐ Die Verbrauchserfassung erscheint fehlerhaft (Ableseprotokoll liegt mir nicht vor)
☐ Folgende Position ist nicht nachvollziehbar: [BESCHREIBUNG]

Ich fordere Sie auf, mir bis zum [DATUM IN 14 TAGEN]:
– Einsicht in alle Belege (Brennstoffrechnungen, Messdienstabrechnung, Wartungskosten) zu gewähren,
– das Ablese- und Messprotokoll des Messdienstleisters vorzulegen.

Ich behalte mir vor, die Nachzahlung in Höhe von [BETRAG] € bis zur Klärung einzubehalten.

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Widerspruch Heizkostenabrechnung [JAHR]. Abrechnung um [X]% höher als Vorjahr. Belegeinsicht und Messprotokoll gefordert bis [FRIST]...`},
  {
    id: "mietrecht_15", area: "mietrecht", name: "Belegeinsicht verlangen", description: "Formelle Anforderung von Belegen zur Neben- oder Heizkostenabrechnung", file: "Belegeinsicht_Verlangen.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Belegeinsicht Betriebskosten-/Heizkostenabrechnung [ABRECHNUNGSJAHR], Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich mache hiermit von meinem Recht auf Belegeinsicht gemäß § 259 BGB i.V.m. § 556 BGB Gebrauch.

Ich bitte um Einsicht in folgende Unterlagen zur Abrechnung [ABRECHNUNGSJAHR]:

☐ Alle Rechnungen und Verträge für [BEZEICHNUNG POSITION]
☐ Zählerstands-Protokolle und Ableseberichte
☐ Messdienstleister-Abrechnungen
☐ Versicherungspolicen und -rechnungen
☐ Wartungsverträge und -rechnungen
☐ Nachweis des Verteilerschlüssels

Ich bitte um Einsichtsmöglichkeit bis zum [DATUM IN 14 TAGEN] entweder:
– in Ihren Räumlichkeiten (bitte Termin nennen), oder
– durch Übersendung von Kopien an meine Adresse.

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Belegeinsicht gem. § 259 BGB für Abrechnungsjahr [JAHR]. Rechnungen, Zählerstände, Messprotokolle angefordert bis [FRIST]...`},
  {
    id: "mietrecht_16", area: "mietrecht", name: "Mieterhöhung Widerspruch", description: "Widerspruch gegen Mieterhöhungsverlangen wegen Überschreitung des Mietspiegels oder Formfehler", file: "Mieterhoehung_Widerspruch.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Widerspruch gegen Mieterhöhungsverlangen vom [DATUM], Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

gegen Ihr Mieterhöhungsverlangen vom [DATUM] lege ich hiermit Widerspruch ein.

Meine Einwände:

☐ Die geforderte Miete überschreitet die ortsübliche Vergleichsmiete laut Mietspiegel [STADT] [JAHR]:
  Laut Mietspiegel (Kategorie [WOHNUNGSTYP]): max. [BETRAG] €/m²
  Geforderte Miete: [BETRAG] €/m²

☐ Die Kappungsgrenze von 20% (§ 558 Abs. 3 BGB) wird überschritten:
  Aktuelle Miete: [BETRAG] €, zulässige Erhöhung max.: [BETRAG] €

☐ Die Sperrfrist von 15 Monaten seit der letzten Erhöhung ist noch nicht abgelaufen (letzte Erhöhung: [DATUM])

☐ Formfehler: [BEGRÜNDUNG FEHLT / MIETSPIEGEL NICHT BEIGEFÜGT / FALSCHE ANGABEN]

Ich stimme der Erhöhung in der verlangten Höhe nicht zu. Ich bin bereit, einer Erhöhung auf max. [BETRAG] € (ortsübliche Vergleichsmiete) zuzustimmen.

Mit freundlichen Grüßen,
[IHR NAME]

Anlage: Auszug Mietspiegel [STADT] [JAHR]`,
    preview: `Widerspruch Mieterhöhung vom [DATUM]. Mietspiegel-Überschreitung / Kappungsgrenze / Formfehler. Bereit bis max. [X]€ zuzustimmen...`},
  {
    id: "mietrecht_17", area: "mietrecht", name: "Widerspruch Modernisierungsmieterhöhung", description: "Widerspruch gegen Mieterhöhung nach Modernisierung wegen Härtegründen oder Formfehler", file: "Modernisierung_Mieterhoehung_Widerspruch.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Härteeinwand / Widerspruch gegen Modernisierungsmieterhöhung vom [DATUM]

Sehr geehrte/r [ANREDE VERMIETER],

gegen Ihre Modernisierungsmieterhöhung vom [DATUM] erhebe ich Härteeinwand gemäß § 559 Abs. 4 BGB bzw. widerspreche der Erhöhung.

☐ Härteeinwand (§ 559 Abs. 4 BGB):
Die Erhöhung ist für mich eine besondere Härte, da:
[z.B. Ich beziehe Rente/Bürgergeld und kann die Erhöhung nicht tragen / Ich bin seit [JAHRE] Jahren Mieter / Mein Einkommen beträgt [BETRAG]€/Monat, die neue Gesamtmiete wäre [PROZENT]% meines Nettoeinkommens]

☐ Formfehler der Modernisierungsankündigung:
Die Ankündigung vom [DATUM] genügt nicht den Anforderungen des § 555c BGB, da: [BEGRÜNDUNG]

☐ Umlagesatz zu hoch:
Der Umlagesatz von [PROZENT]% übersteigt den gesetzlich zulässigen Satz. Die tatsächlichen Modernisierungskosten betragen laut Ihrer Angabe [BETRAG]€, der jährliche Erhöhungsbetrag darf maximal [BETRAG]€ betragen.

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Härteeinwand / Widerspruch Modernisierungsmieterhöhung gem. § 559 Abs. 4 BGB. [Einkommen zu gering / Formfehler / Umlagesatz zu hoch]...`},
  {
    id: "mietrecht_18", area: "mietrecht", name: "Kaution Rückforderung", description: "Rückforderung der Mietkaution nach Auszug mit Fristsetzung", file: "Kaution_Rueckforderung.pdf", text: `[IHR NAME]
[NEUE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Rückforderung Mietkaution, Wohnung [FRÜHERE ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

das Mietverhältnis über die Wohnung [ADRESSE, WNR.] endete am [AUSZUGSDATUM]. Die Wohnung wurde am [ÜBERGABEDATUM] übergeben.

Ich fordere Sie auf, die von mir geleistete Kaution in Höhe von [BETRAG] € zzgl. aufgelaufener Zinsen bis zum [DATUM IN 4–6 WOCHEN] auf folgendes Konto zurückzuüberweisen:

IBAN: [IBAN]
Inhaber: [KONTOINHABER]

Mir sind keine berechtigten Einbehalte bekannt. Die Wohnung wurde in ordnungsgemäßem Zustand übergeben (siehe Übergabeprotokoll vom [DATUM]).

Sollte die Kaution nicht bis zum genannten Datum überwiesen werden, werde ich rechtliche Schritte einleiten.

Mit freundlichen Grüßen,
[IHR NAME]

Anlage: Übergabeprotokoll vom [DATUM]`,
    preview: `Rückforderung Kaution [X]€ zzgl. Zinsen bis [FRIST]. Wohnung ordnungsgemäß übergeben am [DATUM]. Bei Nichtzahlung: rechtliche Schritte...`},
  {
    id: "mietrecht_19", area: "mietrecht", name: "Widerspruch Kautionsabzüge", description: "Widerspruch gegen ungerechtfertigte Abzüge von der Mietkaution", file: "Widerspruch_Kautionsabzuege.pdf", text: `[IHR NAME]
[NEUE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Widerspruch gegen Kautionsabzüge, Wohnung [FRÜHERE ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich habe Ihre Aufstellung der Kautionsabzüge vom [DATUM] erhalten. Ich widerspreche den folgenden Abzügen:

1. Position: [BEZEICHNUNG, BETRAG €]
   Begründung: [z.B. Handelt sich um normale Abnutzung gem. § 538 BGB / Wurde bereits bei Einzug im Protokoll vermerkt / Keine schriftliche Rüge bei Übergabe erfolgt]

2. Position: [BEZEICHNUNG, BETRAG €]
   Begründung: [BEGRÜNDUNG]

Ich weise außerdem darauf hin, dass:
☐ die Schönheitsreparaturklausel im Mietvertrag unwirksam ist (starre Fristen / unrenoviert übergeben) und ich daher nicht zur Renovierung verpflichtet war.
☐ die behaupteten Schäden nicht im Übergabeprotokoll festgehalten wurden und Sie die Beweislast tragen.
☐ die genannten Reparaturkosten nicht durch Kostenvoranschläge belegt sind.

Ich fordere Sie auf, die zu Unrecht einbehaltenen [BETRAG] € bis zum [DATUM] zurückzuüberweisen.

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Widerspruch Kautionsabzüge [Positionen]. Normale Abnutzung / Beweislast beim Vermieter / Schönheitsreparaturklausel unwirksam. Rückzahlung [X]€...`},
  {
    id: "mietrecht_20", area: "mietrecht", name: "Mängel bei Einzug nachträglich melden", description: "Nachträgliche schriftliche Mängelanzeige für Mängel, die bei Einzug bestanden", file: "Einzugsmaengel_Nachtrag.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Mängelanzeige – Bei Einzug bestehende Mängel, Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich bin am [EINZUGSDATUM] in die Wohnung [ADRESSE, WNR.] eingezogen. Hiermit zeige ich Ihnen Mängel an, die bereits bei Übergabe vorhanden waren:

1. [MANGEL 1: Beschreibung, Raum, Zustand bei Einzug]
2. [MANGEL 2: Beschreibung, Raum, Zustand bei Einzug]
3. [MANGEL 3: Beschreibung, Raum, Zustand bei Einzug]

Diese Mängel wurden [nicht im Übergabeprotokoll vermerkt / liegen mir als Fotos vor (Anlage)].

Ich fordere Sie gemäß § 535 Abs. 1 BGB auf, die Mängel bis zum [DATUM IN 14 TAGEN] zu beseitigen.

Ich weise darauf hin, dass diese Mängel nicht durch mich verursacht wurden und ich für deren Beseitigung bei Auszug nicht haften werde.

Mit freundlichen Grüßen,
[IHR NAME]

Anlagen: Fotos der Mängel (Aufnahmedatum: [EINZUGSDATUM ± 7 TAGE])`,
    preview: `Nachträgliche Mängelanzeige für bei Einzug [DATUM] bestehende Mängel. Fotos beigefügt. Forderung zur Behebung bis [FRIST]. Keine Haftung bei Auszug...`},
  {
    id: "mietrecht_21", area: "mietrecht", name: "Schönheitsreparaturklausel ablehnen", description: "Ablehnung der Renovierungspflicht bei unwirksamer Schönheitsreparaturklausel (BGH-Rspr.)", file: "Schoenheitsreparatur_Ablehnung.pdf", text: `[IHR NAME]
[NEUE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Ablehnung Renovierungsforderung – Unwirksame Schönheitsreparaturklausel, Wohnung [FRÜHERE ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich habe Ihre Forderung zur Durchführung von Schönheitsreparaturen erhalten. Diese Forderung weise ich zurück.

Begründung:

[ZUTREFFENDES AUSWÄHLEN:]

☐ Die Klausel in § [NUMMER] des Mietvertrags enthält starre Renovierungsfristen (z.B. „alle 3 Jahre"). Solche Klauseln sind nach ständiger Rechtsprechung des BGH unwirksam (BGH, Urt. v. 23.06.2004 – VIII ZR 361/03 u.v.m.). Eine Renovierungspflicht besteht daher nicht.

☐ Die Wohnung wurde mir in unrenoviertem Zustand übergeben, ohne einen angemessenen Ausgleich. Solche Klauseln sind unwirksam (BGH, Urt. v. 18.03.2015 – VIII ZR 185/14).

☐ Die Klausel enthält eine unzulässige Quotenabgeltungsklausel, die nach BGH-Rechtsprechung unwirksam ist (BGH, Urt. v. 26.09.2007 – VIII ZR 143/06).

Da die Klausel unwirksam ist, bin ich lediglich zur besenreinen Übergabe der Wohnung gemäß § 546 BGB verpflichtet. Diese habe ich erfüllt.

Ich fordere Sie auf, die Forderung zurückzunehmen und die Kaution vollständig zurückzuerstatten.

Mit freundlichen Grüßen,
[IHR NAME]

Anlage: Relevanter BGH-Urteilsauszug`,
    preview: `Ablehnung Renovierungspflicht. Klausel unwirksam: [starre Fristen / unrenoviert übergeben / Quotenklausel] laut BGH-Rspr. Nur besenreine Übergabe geschuldet...`},
  {
    id: "mietrecht_22", area: "mietrecht", name: "Widerspruch Schadensbehauptung nach Auszug", description: "Widerspruch gegen nachträgliche Schadensbehauptungen des Vermieters ohne Protokoll", file: "Widerspruch_Schadensbehauptung_Auszug.pdf", text: `[IHR NAME]
[NEUE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Widerspruch gegen Schadensbehauptungen nach Wohnungsübergabe, [FRÜHERE ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich habe Ihre Schadensaufstellung vom [DATUM] erhalten. Ich widerspreche sämtlichen darin genannten Forderungen.

Begründung:

☐ Bei der Wohnungsübergabe am [DATUM] wurden keine Schäden im Protokoll festgehalten. Nachträgliche Behauptungen sind nach BGH-Rechtsprechung kaum durchsetzbar, da Sie als Vermieter die Beweislast tragen (BGH VIII ZR 45/09).

☐ Die beschriebenen Zustände stellen normale Abnutzung dar, für die ich gemäß § 538 BGB nicht hafte.

☐ Die Schäden wurden erst [TAGE/WOCHEN] nach der Übergabe gemeldet. Ein sachlicher Zusammenhang mit meiner Nutzung ist nicht herstellbar.

☐ Die genannten Kosten sind nicht belegt (kein Kostenvoranschlag, keine Rechnung).

Ich fordere Sie auf, die Kaution in voller Höhe von [BETRAG] € unverzüglich an mich zurückzuzahlen.

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Widerspruch Schadensbehauptung nach Auszug. Kein Protokoll-Eintrag / normale Abnutzung / nachträgliche Meldung. Beweislast beim Vermieter. Kaution [X]€ zurückfordern...`},
  {
    id: "mietrecht_23", area: "mietrecht", name: "WG-Zahlungsaufforderung Mitmieter", description: "Formelle Zahlungsaufforderung an WG-Mitbewohner mit Abmahnungs-Ankündigung", file: "WG_Zahlungsaufforderung.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[MITMIETER NAME]
[SELBE ADRESSE oder ANDERE ADRESSE]

[ORT], [DATUM]

Betreff: Zahlungsaufforderung – Ausstehende Mietzahlung(en)

[ANREDE MITMIETER],

ich wende mich an dich, weil folgende Mietanteile bisher nicht bezahlt wurden:

[MONAT]  [BETRAG] €  (fällig am [DATUM])
[MONAT]  [BETRAG] €  (fällig am [DATUM])
[MONAT]  [BETRAG] €  (fällig am [DATUM])
Gesamtbetrag:  [BETRAG] €

Ich fordere dich auf, den ausstehenden Betrag von [GESAMTBETRAG] € bis zum [DATUM IN 7 TAGEN] auf folgendes Konto zu überweisen:

IBAN: [IBAN]
Inhaber: [KONTOINHABER]

Sollte die Zahlung nicht bis zum genannten Datum eingehen, bin ich gezwungen, weitere Schritte zu unternehmen (Abmahnung, ggf. Kündigung des Untermietverhältnisses).

Bitte melde dich bei mir, falls du dich in einer finanziellen Notlage befindest – wir können gemeinsam eine Lösung suchen.

[DEIN NAME]`,
    preview: `Zahlungsaufforderung WG-Mitmieter. Offene Beträge [Monate] gesamt [X]€. Zahlung bis [FRIST], sonst Abmahnung / Kündigung Untermietverhältnis...`},
  {
    id: "mietrecht_24", area: "mietrecht", name: "WG-Untermietverhältnis kündigen", description: "Kündigung eines Untermietverhältnisses durch den Hauptmieter", file: "WG_Untermiete_Kuendigung.pdf", text: `[IHR NAME (HAUPTMIETER)]
[IHRE ADRESSE]
[PLZ ORT]

[NAME UNTERMIETER]
[SELBE ADRESSE]

[ORT], [DATUM]

EINSCHREIBEN

Betreff: Kündigung des Untermietverhältnisses, [ADRESSE, ZIMMER-NR./BESCHREIBUNG]

[ANREDE UNTERMIETER],

hiermit kündige ich das zwischen uns bestehende Untermietverhältnis über das Zimmer [ZIMMERBESCHREIBUNG] in der Wohnung [ADRESSE] fristgerecht zum [KÜNDIGUNGSDATUM].

[Kündigungsfrist: Laut Untermietvertrag [X] Monate / gesetzlich 3 Monate]

Ich bitte dich, das Zimmer bis zum [AUSZUGSDATUM] in besenreinem Zustand zu übergeben und alle Schlüssel zurückzugeben.

Deine Kaution in Höhe von [BETRAG] € werde ich dir nach der Übergabe und Prüfung des Zustands innerhalb von [30] Tagen zurücküberweisen, abzüglich eventueller berechtigter Schadensersatzforderungen.

Bitte bestätige den Eingang dieser Kündigung schriftlich.

Mit freundlichen Grüßen,
[DEIN NAME]`,
    preview: `Kündigung Untermietverhältnis zum [DATUM] per Einschreiben. Übergabe bis [DATUM], Kaution [X]€ nach Zustandsprüfung zurück...`},
  {
    id: "mietrecht_25", area: "mietrecht", name: "Abmahnung Hausfriedensbruch", description: "Formelle Abmahnung an Vermieter wegen unerlaubtem Betreten der Wohnung", file: "Abmahnung_Hausfriedensbruch.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER]
[ADRESSE VERMIETER]

[ORT], [DATUM]

EINSCHREIBEN MIT RÜCKSCHEIN

Betreff: Abmahnung – Unerlaubtes Betreten der Mietwohnung (Hausfriedensbruch), [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

am [DATUM] haben Sie meine Wohnung [ADRESSE, WNR.] ohne meine Erlaubnis und ohne vorherige Ankündigung betreten. [Sie haben dazu den Ihnen vorliegenden Wohnungsschlüssel benutzt / sich Zutritt verschafft durch: BESCHREIBEN.]

Dies stellt eine Verletzung meines Grundrechts auf Unverletzlichkeit der Wohnung (Art. 13 GG) dar und kann den Straftatbestand des Hausfriedensbruchs (§ 123 StGB) erfüllen.

Ich mahne Sie hiermit formell ab und fordere Sie auf:
1. Das unerlaubte Betreten meiner Wohnung sofort und dauerhaft zu unterlassen.
2. Mir den Wohnungsschlüssel zurückzugeben / keine Kopien des Schlüssels zu verwenden.

Ich weise Sie darauf hin, dass ich bei einer Wiederholung Strafanzeige erstatten und das Mietverhältnis außerordentlich kündigen werde.

Mit freundlichen Grüßen,
[IHR NAME]

Anlage: Datum und Zeugen des Vorfalls`,
    preview: `Abmahnung wegen Hausfriedensbruch am [DATUM]. Betreten ohne Erlaubnis. Unterlassung gefordert, Schlüssel zurückgeben. Bei Wiederholung: Strafanzeige...`},
  {
    id: "mietrecht_26", area: "mietrecht", name: "Besichtigung ablehnen (kein Grund)", description: "Ablehnung eines Besichtigungswunsches des Vermieters mangels sachlichem Grund", file: "Besichtigung_Ablehnen.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Ablehnung Besichtigungswunsch vom [DATUM], Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich beziehe mich auf Ihren Besichtigungswunsch vom [DATUM].

Ein Besichtigungsrecht des Vermieters besteht nur bei Vorliegen eines sachlichen Grundes (z.B. geplanter Verkauf, bevorstehende Neuvermietung, konkrete Schadensanzeige). Einen solchen Grund haben Sie mir bisher nicht mitgeteilt.

Ich lehne die Besichtigung daher mangels sachlichen Grundes ab.

Sollte ein sachlicher Grund vorliegen, bitte ich Sie, diesen schriftlich mitzuteilen. Ich werde dann innerhalb einer angemessenen Frist einen Termin mit ausreichender Vorankündigung (mindestens 24 Stunden) vereinbaren.

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Ablehnung Besichtigungswunsch mangels sachlichem Grund. Bitte schriftliche Begründung. Bei berechtigtem Grund: Termin mit 24h-Vorlauf vereinbaren...`},
  {
    id: "mietrecht_27", area: "mietrecht", name: "Räumungsklage – Schonfrist-Zahlung ankündigen", description: "Ankündigung der Zahlung aller Mietrückstände zur Heilung der Kündigung (§ 569 Abs. 3 Nr. 2 BGB)", file: "Raeumungsklage_Schonfrist_Zahlung.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/VERMIETERANWALT]
[ADRESSE]

[ORT], [DATUM]

EINSCHREIBEN MIT RÜCKSCHEIN

Betreff: Ankündigung Ausgleich Mietrückstände gem. § 569 Abs. 3 Nr. 2 BGB
         Räumungsklage Az. [AKTENZEICHEN], [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE],

ich beziehe mich auf die Räumungsklage vom [DATUM], zugegangen am [DATUM].

Ich teile Ihnen mit, dass ich sämtliche ausstehenden Mietrückstände in Höhe von [BETRAG] € bis zum [DATUM – INNERHALB 2 MONATE NACH KLAGEZUSTELLUNG] vollständig ausgleichen werde.

Gemäß § 569 Abs. 3 Nr. 2 BGB wird die auf Zahlungsverzug gestützte fristlose Kündigung durch vollständige Zahlung geheilt, wenn die Zahlung innerhalb von zwei Monaten nach Rechtshängigkeit der Klage erfolgt.

Ich bitte Sie daher, die Klage zurückzunehmen, sobald die Zahlung auf Ihrem Konto eingegangen ist.

IBAN Vermieter: [IBAN – bitte bestätigen]

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Ankündigung vollständiger Zahlung aller Rückstände [X]€ bis [DATUM] gem. § 569 Abs. 3 Nr. 2 BGB. Heilung der Kündigung. Bitte Klage zurückzunehmen...`},
  {
    id: "mietrecht_28", area: "mietrecht", name: "Räumungsklage – Härtfall Klageerwiderung", description: "Klageerwiderung bei Räumungsklage nach ordentlicher Kündigung mit Antrag auf Räumungsfrist", file: "Raeumungsklage_Haertefall.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[AMTSGERICHT]
[ADRESSE GERICHT]

[ORT], [DATUM]

Betreff: Klageerwiderung + Antrag auf Räumungsfrist gem. § 721 ZPO
         Aktenzeichen: [AZ], [KLÄGER (VERMIETER)] ./. [IHR NAME]

Sehr geehrte Damen und Herren,

in dem oben genannten Rechtsstreit zeige ich an, dass ich die Klage für unbegründet halte, und beantrage hilfsweise die Gewährung einer Räumungsfrist gemäß § 721 ZPO.

Zur Begründung:

[EINWÄNDE GEGEN DIE KÜNDIGUNG, z.B.:]
Die Kündigung ist formell unwirksam, weil [BEGRÜNDUNG].
Der angegebene Kündigungsgrund liegt nicht vor, weil [BEGRÜNDUNG].

Hilfsweise beantrage ich die Gewährung einer Räumungsfrist bis zum [DATUM], da:
– Ich suche aktiv eine Ersatzwohnung (Nachweise: Anlage),
– Folgende Härtegründe vorliegen: [Alter / Krankheit / Kinder in Schule / Behinderung],
– Eine Räumung zum genannten Termin für mich und meine Familie unzumutbar wäre.

Ich beantrage außerdem die Gewährung von Prozesskostenhilfe (Antrag in Anlage).

Mit freundlichen Grüßen,
[IHR NAME]

Anlagen: PKH-Antrag, Nachweis Wohnungssuche, Härtegründe-Belege`,
    preview: `Klageerwiderung Räumungsklage. Kündigung unwirksam wegen [GRUND]. Hilfsweise: Räumungsfrist § 721 ZPO bis [DATUM], Härtefall [Alter/Krankheit/Kinder]...`},
  {
    id: "mietrecht_29", area: "mietrecht", name: "Ablehnung Aufhebungsvertrag unter Druck", description: "Ablehnung eines unter Druck vorgelegten Aufhebungsvertrags", file: "Aufhebungsvertrag_Ablehnung.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[VERMIETER/HAUSVERWALTUNG]
[ADRESSE VERMIETER]

[ORT], [DATUM]

Betreff: Ablehnung des Aufhebungsvertrags vom [DATUM], Wohnung [ADRESSE, WNR.]

Sehr geehrte/r [ANREDE VERMIETER],

ich beziehe mich auf den mir am [DATUM] vorgelegten Aufhebungsvertrag.

Ich lehne den Abschluss dieses Aufhebungsvertrags ab.

Zur Begründung:
[ZUTREFFENDES AUSWÄHLEN:]
☐ Das angebotene Ausgleichsangebot deckt meine Umzugskosten und Nachteile nicht ab.
☐ Ich stehe unter erheblichem Druck und bin nicht in der Lage, eine freie Entscheidung zu treffen.
☐ Mir wurde keine ausreichende Bedenkzeit gewährt.
☐ Die genannten Auszugs-Gründe sind nicht stichhaltig.

Ich weise außerdem darauf hin, dass Sie mein Mietverhältnis nur auf dem gesetzlichen Weg und mit berechtigtem Interesse kündigen dürfen (§ 573 BGB). Druck oder Einschüchterungsversuche werde ich dokumentieren und rechtlich bewerten lassen.

Ich bitte um Kenntnisnahme und erwarte keine weiteren Kontaktaufnahmen außerhalb des gesetzlich vorgesehenen Rahmens.

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Ablehnung Aufhebungsvertrag vom [DATUM]. Unzureichendes Angebot / Druck / keine Bedenkzeit. Kündigung nur auf gesetzlichem Weg möglich...`},
  {
    id: "mietrecht_30", area: "mietrecht", name: "Eigentumswechsel – Ablehnung neuer Mietvertrag", description: "Ablehnung eines neuen Mietvertrags nach Eigentümerwechsel (alter Vertrag gilt weiter)", file: "Eigentuemerwechsel_Mietvertrag_Ablehnen.pdf", text: `[IHR NAME]
[IHRE ADRESSE]
[PLZ ORT]

[NEUER EIGENTÜMER / HAUSVERWALTUNG]
[ADRESSE]

[ORT], [DATUM]

Betreff: Ablehnung neuer Mietvertrag – Bestehender Mietvertrag gilt fort gem. § 566 BGB

Sehr geehrte/r [ANREDE],

ich beziehe mich auf Ihr Schreiben vom [DATUM], in dem Sie mich zum Abschluss eines neuen Mietvertrags auffordern.

Ich lehne den Abschluss eines neuen Mietvertrags ab.

Gemäß § 566 BGB gilt der Grundsatz „Kauf bricht nicht Miete". Mit dem Erwerb der Immobilie sind Sie automatisch und kraft Gesetzes in den bestehenden Mietvertrag vom [DATUM DES URSPRÜNGLICHEN VERTRAGS] eingetreten. Dieser gilt unverändert fort.

Ich bin nicht verpflichtet, einen neuen Mietvertrag zu unterzeichnen. Der bestehende Vertrag bietet mir alle notwendigen Rechte und Schutzrechte als Mieter.

Ich bitte Sie, mir Ihre Bankverbindung für die Mietzahlungen mitzuteilen und sich als neuer Eigentümer formell vorzustellen.

Mit freundlichen Grüßen,
[IHR NAME]`,
    preview: `Ablehnung neuer Mietvertrag nach Eigentümerwechsel. § 566 BGB: Kauf bricht nicht Miete. Bestehender Vertrag gilt kraft Gesetz weiter. Kein Handlungsbedarf...`},

  // ARBEITSRECHT (6 templates)
  {
    id: "arbeitsrecht_1", area: "arbeitsrecht", name: "Widerspruch Abmahnung", description: "Gegendarstellung und Widerspruch gegen Abmahnung", file: "Widerspruch_Abmahnung.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit widerspreche ich der Abmahnung vom [DATUM] und bitte um Entfernung aus meiner Personalakte.\n\nBegründung:\nDie in der Abmahnung erhobenen Vorwürfe [VORWURF] treffen nicht zu bzw. sind unzutreffend dargestellt.\n\nSachverhalt aus meiner Sicht:\n[IHRE DARSTELLUNG DER EREIGNISSE]\n\nDie Abmahnung ist sachlich nicht gerechtfertigt. Ich fordere Sie auf, diese bis zum [DATUM + 14 TAGE] aus meiner Personalakte zu entfernen.\n\nAndernfalls behalte ich mir rechtliche Schritte vor.\n\nMit freundlichen Grüßen\n[NAME]\n[PERSONALNUMMER]`,
    preview: `Sehr geehrte Damen und Herren, hiermit widerspreche ich der Abmahnung und fordere Entfernung...`},
  {
    id: "arbeitsrecht_2", area: "arbeitsrecht", name: "Mahnung Lohnzahlung", description: "Mahnung bei ausstehendem Gehalt", file: "Mahnung_Lohn.pdf", text: `Sehr geehrte Damen und Herren,\n\nmein Gehalt für den Monat [MONAT/JAHR] ist bisher nicht auf meinem Konto eingegangen.\n\nFälligkeit war der [DATUM]. Hiermit mahne ich die Zahlung an.\n\nBitte überweisen Sie den ausstehenden Betrag von [BETRAG] € bis spätestens [DATUM + 5 TAGE] auf mein Konto:\n\nIBAN: [IHRE IBAN]\nKontoinhaber: [IHR NAME]\n\nAb dem Fälligkeitsdatum berechne ich Verzugszinsen gemäß § 288 BGB.\n\nSollte die Zahlung nicht erfolgen, behalte ich mir rechtliche Schritte vor.\n\nMit freundlichen Grüßen\n[NAME]`,
    preview: `Sehr geehrte Damen und Herren, mein Gehalt für [MONAT] ist nicht eingegangen. Hiermit mahne ich...`},
  {
    id: "arbeitsrecht_3", area: "arbeitsrecht", name: "Überstunden-Forderung", description: "Forderung nach Bezahlung oder Ausgleich von Überstunden", file: "Ueberstunden_Forderung.pdf", text: `Sehr geehrte Damen und Herren,\n\nim Zeitraum [VON - BIS] habe ich folgende Überstunden geleistet:\n\n[AUFLISTUNG: Datum - Anzahl Stunden]\n\nGesamt: [X] Überstunden\n\nDiese Überstunden wurden bisher weder ausgeglichen noch vergütet.\n\nIch fordere Sie auf, mir bis zum [DATUM + 14 TAGE] mitzuteilen:\n1. Wie die Überstunden abgegolten werden (Bezahlung oder Freizeitausgleich)\n2. Wann die Auszahlung/der Ausgleich erfolgt\n\nBei Bezahlung berechne ich [STUNDENLOHN] € pro Stunde, gesamt [BETRAG] €.\n\nMit freundlichen Grüßen\n[NAME]`,
    preview: `Sehr geehrte Damen und Herren, ich habe [X] Überstunden geleistet und fordere Ausgleich...`},
  {
    id: "arbeitsrecht_4", area: "arbeitsrecht", name: "Widerspruch Kündigung (mit 3-Wochen-Frist)", description: "Widerspruch und Kündigungsschutzklage - WICHTIG: 3 Wochen Frist!", file: "Widerspruch_Kuendigung_Arbeit.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit widerspreche ich der Kündigung vom [DATUM] und kündige an, Kündigungsschutzklage beim Arbeitsgericht zu erheben.\n\n⚠️ WICHTIG: Kündigungsschutzklage muss innerhalb von 3 WOCHEN ab Zugang der Kündigung erhoben werden!\n\nGründe für die Unwirksamkeit der Kündigung:\n1. [z.B. Kein wichtiger Grund dargelegt]\n2. [z.B. Soziale Auswahl nicht korrekt]\n3. [z.B. Betriebsrat nicht ordnungsgemäß angehört]\n\nIch fordere Sie auf, die Kündigung zurückzunehmen. Andernfalls werde ich innerhalb der Klagefrist beim Arbeitsgericht [ORT] Klage einreichen.\n\nMit freundlichen Grüßen\n[NAME]`,
    preview: `Sehr geehrte Damen und Herren, hiermit widerspreche ich der Kündigung. WICHTIG: 3-Wochen-Frist beachten!`},
  {
    id: "arbeitsrecht_5", area: "arbeitsrecht", name: "Urlaubsgeld Forderung", description: "Forderung von Urlaubsgeld oder Weihnachtsgeld", file: "Urlaubsgeld_Forderung.pdf", text: `Sehr geehrte Damen und Herren,\n\ngemäß [Arbeitsvertrag/Betriebsvereinbarung/Tarifvertrag] steht mir für das Jahr [JAHR] ein Urlaubsgeld/Weihnachtsgeld in Höhe von [BETRAG] € zu.\n\nBisher habe ich diese Sonderzahlung nicht erhalten.\n\nIch fordere Sie auf, das Urlaubsgeld bis zum [DATUM + 7 TAGE] auf mein Konto zu überweisen:\n\nIBAN: [IHRE IBAN]\n\nFalls die Zahlung nicht erfolgt, behalte ich mir rechtliche Schritte vor.\n\nMit freundlichen Grüßen\n[NAME]`,
    preview: `Sehr geehrte Damen und Herren, ich fordere die Zahlung des mir zustehenden Urlaubsgeldes...`},
  {
    id: "arbeitsrecht_6", area: "arbeitsrecht", name: "Mobbing Beschwerde", description: "Beschwerde wegen Mobbing am Arbeitsplatz", file: "Mobbing_Beschwerde.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit beschwere ich mich über wiederholtes Mobbing am Arbeitsplatz.\n\nVorfälle:\n- [DATUM]: [BESCHREIBUNG DES VORFALLS]\n- [DATUM]: [WEITERER VORFALL]\n\nDiese Vorfälle belasten mich gesundheitlich und beeinträchtigen meine Arbeit.\n\nIch fordere Sie auf, gemäß Ihrer Fürsorgepflicht (§ 241 Abs. 2 BGB):\n1. Die Vorfälle zu untersuchen\n2. Maßnahmen zum Schutz meiner Person zu ergreifen\n3. Die Verantwortlichen zur Rechenschaft zu ziehen\n\nBitte bestätigen Sie den Eingang und teilen Sie mir mit, welche Schritte Sie einleiten.\n\nMit freundlichen Grüßen\n[NAME]`,
    preview: `Sehr geehrte Damen und Herren, hiermit beschwere ich mich über Mobbing am Arbeitsplatz...`},

  // SOZIALRECHT (4 templates)
  {
    id: "sozialrecht_1", area: "sozialrecht", name: "Widerspruch Bürgergeld", description: "Widerspruch gegen Ablehnungs- oder Kürzungsbescheid", file: "Widerspruch_Buergergeld.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit lege ich Widerspruch gegen den Bescheid vom [DATUM], Aktenzeichen [AZ], ein.\n\nBegründung:\n[z.B. Die Ablehnung/Kürzung ist nicht gerechtfertigt, weil...]\n[z.B. Mein Bedarf wurde falsch berechnet]\n[z.B. Einkommen wurde nicht korrekt angerechnet]\n\nIch beantrage die Überprüfung des Bescheids und bitte um schriftliche Mitteilung über das Ergebnis.\n\nDie ausführliche Begründung reiche ich innerhalb der Frist nach.\n\nMit freundlichen Grüßen\n[NAME]\n[BEDARFSGEMEINSCHAFTSNUMMER]`,
    preview: `Sehr geehrte Damen und Herren, hiermit lege ich Widerspruch gegen den Bescheid ein...`},
  {
    id: "sozialrecht_2", area: "sozialrecht", name: "Widerspruch ALG II", description: "Widerspruch Arbeitslosengeld II (Hartz IV)", file: "Widerspruch_ALG2.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit lege ich Widerspruch gegen den Bescheid über Arbeitslosengeld II vom [DATUM] ein.\n\nBegründung:\n1. [z.B. Regelsatz falsch berechnet]\n2. [z.B. Kosten der Unterkunft nicht vollständig berücksichtigt]\n3. [z.B. Mehrbedarf nicht gewährt]\n\nIch fordere eine Neuberechnung und Nachzahlung der Differenz.\n\nDie detaillierte Begründung erfolgt innerhalb der Frist.\n\nMit freundlichen Grüßen\n[NAME]\n[ADRESSE]`,
    preview: `Sehr geehrte Damen und Herren, hiermit lege ich Widerspruch gegen den ALG II-Bescheid ein...`},
  {
    id: "sozialrecht_3", area: "sozialrecht", name: "Sanktion Widerspruch (mit 1-Monat-Frist)", description: "Widerspruch gegen Sanktionsbescheid - 1 MONAT FRIST!", file: "Sanktion_Widerspruch.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit lege ich Widerspruch gegen den Sanktionsbescheid vom [DATUM] ein.\n\n⚠️ WICHTIG: Widerspruchsfrist beträgt 1 MONAT ab Zugang!\n\nBegründung:\n1. [z.B. Ich hatte einen wichtigen Grund für das Versäumnis]\n2. [z.B. Die Sanktion ist unverhältnismäßig]\n3. [z.B. Ich wurde nicht ordnungsgemäß belehrt]\n\nSachverhalt:\n[IHRE DARSTELLUNG]\n\nIch beantrage die Aufhebung der Sanktion und Nachzahlung der gekürzten Leistungen.\n\nMit freundlichen Grüßen\n[NAME]\n[BG-NUMMER]`,
    preview: `Sehr geehrte Damen und Herren, Widerspruch gegen Sanktion - WICHTIG: 1 Monat Frist!`},
  {
    id: "sozialrecht_4", area: "sozialrecht", name: "Krankengeld Antrag", description: "Antrag auf Krankengeld bei der Krankenkasse", file: "Krankengeld_Antrag.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit beantrage ich Krankengeld ab dem [DATUM].\n\nIch bin seit dem [DATUM] arbeitsunfähig erkrankt. Die Arbeitsunfähigkeitsbescheinigung füge ich bei.\n\nMeine Daten:\nVersichertennummer: [NUMMER]\nArbeitgeber: [NAME]\nLetztes Bruttogehalt: [BETRAG] €\n\nBitte teilen Sie mir mit:\n1. Höhe des Krankengeldes\n2. Auszahlungstermin\n3. Benötigte weitere Unterlagen\n\nMit freundlichen Grüßen\n[NAME]\n[ADRESSE]\n[GEBURTSDATUM]`,
    preview: `Sehr geehrte Damen und Herren, hiermit beantrage ich Krankengeld ab [DATUM]...`},

  // VERBRAUCHERRECHT (4 templates)
  {
    id: "verbraucherrecht_1", area: "verbraucherrecht", name: "Widerruf Abofalle", description: "Widerruf ungewollter Verträge und Abofallen", file: "Widerruf_Abofalle.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit widerrufe ich vorsorglich den am [DATUM] angeblich geschlossenen Vertrag über [LEISTUNG/PRODUKT].\n\nBegründung:\nEin wirksamer Vertrag ist nicht zustande gekommen, weil:\n1. Der Preis war nicht eindeutig erkennbar\n2. Ich wurde über wesentliche Vertragsbestandteile getäuscht\n3. Die Button-Lösung (§ 312j BGB) wurde nicht eingehalten\n\nIch schulde Ihnen keinerlei Zahlungen. Sollten Sie Forderungen geltend machen, widerspreche ich diesen ausdrücklich.\n\nMit freundlichen Grüßen\n[NAME]\n[ADRESSE]`,
    preview: `Sehr geehrte Damen und Herren, hiermit widerrufe ich den angeblichen Vertrag. Ich schulde nichts...`},
  {
    id: "verbraucherrecht_2", area: "verbraucherrecht", name: "Inkasso Einwand", description: "Widerspruch gegen ungerechtfertigte Inkassoforderung", file: "Inkasso_Einwand.pdf", text: `Sehr geehrte Damen und Herren,\n\nzu Ihrem Schreiben vom [DATUM] bezüglich der Forderung [BETRAG] € teile ich Folgendes mit:\n\nIch widerspreche der Forderung aus folgenden Gründen:\n1. [z.B. Ich kenne diese Forderung nicht]\n2. [z.B. Die Forderung ist bereits bezahlt]\n3. [z.B. Die Forderung ist verjährt]\n\nIch fordere Sie auf, mir folgende Nachweise vorzulegen:\n- Ursprüngliche Rechnung/Vertrag\n- Beweis der Forderungsabtretung\n- Berechnung der Inkassokosten\n\nBis zur Vorlage zahle ich nichts. Sollten Sie weitere Schritte einleiten, behalte ich mir rechtliche Gegenwehr vor.\n\nMit freundlichen Grüßen\n[NAME]`,
    preview: `Sehr geehrte Damen und Herren, ich widerspreche der Inkassoforderung und verlange Nachweise...`},
  {
    id: "verbraucherrecht_3", area: "verbraucherrecht", name: "Beschwerde Datenschutz", description: "Beschwerde wegen Datenschutzverletzung (DSGVO)", file: "Beschwerde_Datenschutz.pdf", text: `Sehr geehrte Damen und Herren,\n\nhiermit beschwere ich mich über einen Datenschutzverstoß durch Ihr Unternehmen.\n\nSachverhalt:\n[z.B. Meine Daten wurden ohne Einwilligung weitergegeben]\n[z.B. Ich erhalte unerwünschte Werbung]\n[z.B. Auskunftsanfrage wurde nicht beantwortet]\n\nIch fordere gemäß DSGVO:\n1. Sofortige Löschung meiner Daten (Art. 17 DSGVO)\n2. Auskunft über gespeicherte Daten (Art. 15 DSGVO)\n3. Unterlassung weiterer Werbung\n\nBitte bestätigen Sie die Umsetzung bis [DATUM + 14 TAGE]. Andernfalls werde ich Beschwerde bei der Datenschutzbehörde einreichen.\n\nMit freundlichen Grüßen\n[NAME]`,
    preview: `Sehr geehrte Damen und Herren, Beschwerde wegen Datenschutzverstoß...`},
  {
    id: "verbraucherrecht_4", area: "verbraucherrecht", name: "Beschwerde Telefonwerbung", description: "Beschwerde wegen unerlaubter Telefonwerbung", file: "Beschwerde_Telefonwerbung.pdf", text: `Sehr geehrte Damen und Herren,\n\nam [DATUM] wurde ich telefonisch durch Ihr Unternehmen bzw. in Ihrem Auftrag kontaktiert, obwohl ich dazu keine Einwilligung erteilt habe.\n\nTelefonwerbung ohne vorherige Einwilligung ist gemäß § 7 UWG verboten.\n\nIch fordere:\n1. Unterlassung weiterer Werbeanrufe\n2. Löschung meiner Telefonnummer aus allen Werbedateien\n3. Auskunft darüber, woher Sie meine Nummer haben\n\nZusätzlich habe ich Beschwerde bei der Bundesnetzagentur eingereicht.\n\nSollte ich erneut kontaktiert werden, behalte ich mir rechtliche Schritte vor.\n\nMit freundlichen Grüßen\n[NAME]\n[TELEFONNUMMER]`,
    preview: `Sehr geehrte Damen und Herren, Beschwerde wegen unerlaubter Telefonwerbung...`},
