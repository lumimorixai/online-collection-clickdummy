# Online Collection – Lübecker Museen

Interaktiver Gestaltungsvorschlag mit 20 recherchierten Beispielobjekten und acht Themengeschichten. Kein offizieller Internetauftritt der Museen und kein Produktivsystem.

## GitHub Pages

Dieses Verzeichnis enthält die vollständige statische Website. Die Dateien können unverändert im Stammverzeichnis eines GitHub-Repositories veröffentlicht werden.

Unter **Settings → Pages → Build and deployment** die Quelle **Deploy from a branch**, den Branch **main** und den Ordner **/ (root)** wählen. Die erzeugte GitHub-Pages-Adresse ist ohne ChatGPT-Konto aufrufbar.

## Funktionen und Grenzen

Sammlungsnetz, facettierte Suche, Objektseiten, Bildzoom, Themen, Merklisten und Export. Die redaktionelle Freigabe und Kontaktformulare sind Demonstrationen ohne Versand oder Backend. Merklisten bleiben im Browser; redaktionelle Änderungen gelten nur in der Sitzung.

Die 20 Bilder liegen im Verzeichnis `assets`. Quellen und jeweilige Bildlizenzen sind in der Website unter **Bildnachweise** und auf den Objektseiten hinterlegt. Die Lizenzen der Bilder gelten unabhängig vom übrigen Projekt. Schriftarten werden von Google Fonts geladen, mit lokalen Ersatzschriften als Rückfall.

Die Originalanlagen und internen Hosting-Dateien sind nicht Teil dieser Veröffentlichung.

## Demo-Anmeldung

Benutzername: `gast` · Passwort: `sammlung2026`. Der Login dient ausschließlich der Präsentation und bietet keinen Zugriffsschutz. Alle Dateien bleiben öffentlich. Der Anmeldestatus gilt für die aktuelle Browsersitzung; Abmelden beendet ihn. Keine echten Passwörter eingeben.

## Drei Designvarianten

- A: `/` – ursprünglicher Entwurf, unverändert.
- B: `/b/` – Die digitale Galerie: ruhige Gestaltung, große Werke, Serifenschrift.
- C: `/c/` – Das entdeckende Museum: Fragen, Bildcollagen und Verbindungen als Einstieg.

Alle drei verwenden dieselben Dateien `data.js`, `app.js`, `auth.js` und dieselben Bilder. B und C ergänzen ausschließlich Darstellungsregeln und alternative Einstiegsseiten über `variants.css` und `variants.js`. Die Links innerhalb einer Variante behalten deren Pfad bei; auch Direktlinks, Merkliste und Teilen funktionieren dort. Demo-Zugangsdaten gelten für alle Varianten; Anmeldestatus und Merkliste werden auf derselben Domain gemeinsam genutzt.

Nach Änderungen an gemeinsamen Dateien `python3 sync-variants.py` ausführen. Dies aktualisiert die versionierten Dateiverweise für B und C, ohne die Startseite von A zu verändern.

### Eigenständige Galerie B

Variante B ergänzt mit `b/gallery.js` und `b/gallery.css` eigene Seitenkompositionen für Start, Sammlung mit einklappbaren Filtern, Werkansicht mit großem Bildraum und Informationsdossiers, Geschichtenübersicht, Ausstellungsrundgänge, Merkliste sowie eine vertikale Zeitreise nach Jahrhunderten. Navigation und Anmeldung sind ebenfalls eigenständig gestaltet. Die bestehenden Objekt- und Themendaten sowie Such-, Merk-, Export- und Dialogaktionen werden weiterverwendet. A und C laden diese Dateien nicht.
