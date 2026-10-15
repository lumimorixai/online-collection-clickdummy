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

Alle drei verwenden dieselben Dateien `data.js`, `app.js`, `auth.js` und dieselben Bilder. B und C ergänzen eigene Seitenaufbauten und Interaktionen über ihre variantenspezifischen Dateien; `variants.css` und `variants.js` liefern die gemeinsame Variantenbasis. Die Links innerhalb einer Variante behalten deren Pfad bei; auch Direktlinks, Merkliste und Teilen funktionieren dort. Demo-Zugangsdaten gelten für alle Varianten; Anmeldestatus und Merkliste werden auf derselben Domain gemeinsam genutzt.

Nach Änderungen an gemeinsamen Dateien `python3 sync-variants.py` ausführen. Dies aktualisiert die versionierten Dateiverweise für B und C, ohne die Startseite von A zu verändern.

### Eigenständige Galerie B

Variante B ergänzt mit `b/gallery.js` und `b/gallery.css` eigene Seitenkompositionen für Start, Sammlung mit einklappbaren Filtern, Werkansicht mit großem Bildraum und Informationsdossiers, Geschichtenübersicht, Ausstellungsrundgänge, Merkliste sowie eine vertikale Zeitreise nach Jahrhunderten. Navigation und Anmeldung sind ebenfalls eigenständig gestaltet. Die bestehenden Objekt- und Themendaten sowie Such-, Merk-, Export- und Dialogaktionen werden weiterverwendet. A und C laden diese Dateien nicht.

### Eigenständiges Entdeckungsmuseum C

Variante C ergänzt mit `c/discovery.js` und `c/discovery.css` eigene Seitenaufbauten für Anmeldung, Einstieg, Suche, Objektansicht, Geschichten, Fundstücke, Beziehungsnetz, Zeitreise und Museumsorte. Geschichten führen über einzeln anwählbare Stationen; Objektseiten bieten einen direkten Vergleich zweier Werke. Das Netz zeigt Beziehungen aus gemeinsamen Schlagworten, Personen und Museen und lässt verbundene Objekte zum Mittelpunkt werden. Die Fundstücke heben gemeinsame Themen hervor. Alle 20 Objekte und acht Geschichten bleiben erhalten. A und B laden diese Dateien nicht.

## Docker-Image über GitHub Actions

Der Workflow `.github/workflows/docker-image.yml` baut bei Website-Änderungen auf `main` und bei manueller Auslösung ein Docker-Image auf einem GitHub-Runner (Linux/amd64). Er prüft den Container-Healthcheck, die drei Varianten und zentrale Assets, bevor er das Image nach `ghcr.io/lumimorixai/online-collection-clickdummy` veröffentlicht. Tags: vollständige Commit-Kennung und `latest`. Ein fehlgeschlagener Test verhindert die Veröffentlichung.

Der Workflow nutzt den eingebauten `GITHUB_TOKEN` mit `packages: write`; zusätzliche Registry-Zugangsdaten sind für den Build nicht erforderlich. Neue GHCR-Pakete können privat sein: Vor dem Abruf auf dem Präsentationsserver die Paket-Sichtbarkeit bzw. dessen Leseberechtigung prüfen. Serverzugänge gehören nicht ins Repository.

Dies ist die Build- und Veröffentlichungsstufe. Das Ausrollen über den vorhandenen Server-Runner wird separat angebunden. GitHub Pages bleibt parallel bestehen. `compose.yaml` benötigt `BIND_IP` (die für den vorgeschalteten Caddy erreichbare Serverschnittstelle); Standardport ist 8088. Das Image enthält ausschließlich die Website und die interne Webserver-Konfiguration.
