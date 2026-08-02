# Rechtsklarheit auf Vercel betreiben

Diese Anleitung gilt für den Branch `vercel`. Er basiert exakt auf dem lokalen
Redesign-Stand `2a79250`. Der bestehende lokale und entfernte Branch `redesign`
wurde nicht überschrieben.

## Zielbild

- Gatsby 5 bleibt das Website-Framework.
- Vercel baut und veröffentlicht den Branch `vercel`.
- Decap CMS bleibt unter `/admin/` erhalten.
- Decap schreibt Inhalte über GitHub OAuth in den Branch `vercel`.
- Das Kontaktformular speichert oder überträgt keine Daten über den Webserver,
  sondern öffnet einen vorausgefüllten E-Mail-Entwurf.
- `netlify.toml` bleibt vorläufig als Rückfallmöglichkeit erhalten.

## 1. Projekt in Vercel importieren

1. In Vercel **Add New → Project** öffnen.
2. Das GitHub-Repository `bnbln/rechtskh` importieren.
3. Als Framework **Gatsby** auswählen. Vercel sollte es automatisch erkennen.
4. In **Project Settings → Git → Production Branch** den Branch `vercel`
   auswählen.
5. Für Install Command, Build Command und Output Directory keine manuellen
   Overrides aktivieren. Das Gatsby-Preset erkennt automatisch:

   | Einstellung | Wert |
   | --- | --- |
   | Install Command | `npm install` |
   | Build Command | `npm run build` |
   | Output Directory | `public` |
   | Node.js | `22.x` |

Das Build-Skript steht in `package.json`; `vercel.json` fixiert nur das
Gatsby-Preset und notwendige Header. Das Vercel-Gatsby-Builder-Plugin darf nicht
manuell installiert werden; Vercel bindet es selbst ein. Das ist wichtig, damit
neben den statischen Dateien auch die beiden Gatsby Functions für CMS OAuth
veröffentlicht werden.

## 2. Umgebungsvariablen hinterlegen

Unter **Project Settings → Environment Variables** anlegen:

| Variable | Wert |
| --- | --- |
| `SITE_URL` | `https://rechtsklarheit.de` |
| `CMS_SITE_URL` | `https://rechtsklarheit.de` |
| `CMS_GITHUB_CLIENT_ID` | Client ID der GitHub OAuth App |
| `CMS_GITHUB_CLIENT_SECRET` | Client Secret der GitHub OAuth App |

`CMS_GITHUB_CLIENT_SECRET` darf niemals in Git, `config.yml` oder Client-Code
geschrieben werden. Die Variable wird ausschließlich von der serverseitigen
OAuth-Callback-Funktion gelesen.

Die Variablen zunächst mindestens für **Production** setzen. Preview-Deployments
können die Website und `/admin/` darstellen, der OAuth-Login ist absichtlich an
die endgültige Domain gebunden.

## 3. GitHub OAuth App für Decap erstellen

1. GitHub öffnen: **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Folgende Werte eintragen:

   | GitHub-Feld | Wert |
   | --- | --- |
   | Application name | `Rechtsklarheit Decap CMS` |
   | Homepage URL | `https://rechtsklarheit.de/admin/` |
   | Authorization callback URL | `https://rechtsklarheit.de/api/cms/callback` |

3. Die erzeugte Client ID als `CMS_GITHUB_CLIENT_ID` in Vercel eintragen.
4. Ein Client Secret erzeugen und als `CMS_GITHUB_CLIENT_SECRET` eintragen.
5. Vercel anschließend neu deployen, damit die Variablen aktiv sind.

Der OAuth-Code verwendet einen kurzlebigen, sicheren State-Cookie gegen
gefälschte Callback-Anfragen. Das GitHub-Token wird nur an das bereits geöffnete
Decap-Fenster derselben Domain übergeben und nicht serverseitig gespeichert.

Alle CMS-Nutzer benötigen ein GitHub-Konto mit Schreibzugriff auf
`bnbln/rechtskh`. Das bisherige Netlify-Identity-Konto allein reicht nach dem
Wechsel nicht mehr aus.

## 4. Erste Vercel-Vorschau prüfen

Vor einer Domainumstellung die von Vercel erzeugte Vorschau vollständig prüfen:

- `/`
- `/anwalt/`
- `/blog/`
- alle drei Seiten unter `/recht/`
- `/kontakt/`
- `/impressum/`
- `/datenschutz/`
- `/admin/` lädt ohne JavaScript-Fehler
- Bilder und herunterladbare Dateien funktionieren
- keine horizontale Überbreite auf Mobilgeräten

Der CMS-OAuth-Login funktioniert erst, wenn `rechtsklarheit.de` auf diesen
Vercel-Deploy zeigt. Das ist beabsichtigt, weil GitHub OAuth und Decap die
Herkunfts-Domain exakt abgleichen.

## 5. Domain ohne Ausfall umstellen

1. Den bisherigen Netlify-Deploy und seine Domainkonfiguration nicht löschen.
2. `rechtsklarheit.de` und gegebenenfalls `www.rechtsklarheit.de` in Vercel unter
   **Settings → Domains** hinzufügen.
3. Die von Vercel angezeigten DNS-Ziele beim DNS-Anbieter eintragen.
4. Warten, bis Vercel für beide Domains **Valid Configuration** und ein gültiges
   TLS-Zertifikat meldet.
5. Website und `/api/cms/auth?provider=github` über die endgültige Domain prüfen.
6. Unter `/admin/` mit einem berechtigten GitHub-Konto anmelden.
7. Eine kleine Teständerung als Entwurf speichern und kontrollieren, dass Decap
   einen Branch beziehungsweise Pull Request gegen `vercel` erstellt.
8. Erst nach diesen Prüfungen die alte Netlify-Veröffentlichung deaktivieren.

Wenn ein Rollback nötig ist, die DNS-Einträge wieder auf den bisherigen
Netlify-Stand setzen. Der alte `redesign`-Branch und `netlify.toml` bleiben
unverändert als zusätzliche Rückfallpunkte bestehen.

## 6. Kontaktformular prüfen

Das Formular hat weiterhin dieselben sichtbaren Felder:

- Vorname
- Nachname
- Straße und Hausnummer
- PLZ und Stadt
- E-Mail-Adresse
- Telefonnummer
- Rückrufwunsch
- Betreff
- Nachricht

Der Button **Nachricht senden** öffnet das lokal eingerichtete Mailprogramm mit
Empfänger, Betreff und allen ausgefüllten Werten. Die Website zeigt danach keine
eigene Erfolgsseite, weil erst das Mailprogramm die Nachricht tatsächlich
versendet.

Wichtig: `mailto:` hängt vom Gerät und dem dort eingerichteten Mailprogramm ab.
Sehr lange Nachrichten können außerdem an URL-Limits einzelner Browser oder
Mailprogramme stoßen. Das ist eine bewusst vorläufige Lösung.

## 7. Laufender Redaktionsbetrieb

Jede veröffentlichte Decap-Änderung landet in `vercel`. Vercel startet daraufhin
automatisch einen neuen Production-Deploy. Falls später wieder `main` der
Produktionsbranch werden soll, müssen gleichzeitig diese beiden Einstellungen
geändert werden:

1. Vercel **Production Branch** auf `main` stellen.
2. In `static/admin/config.yml` den Wert `backend.branch` auf `main` ändern.

Diese Werte dürfen nicht auseinanderlaufen, sonst bearbeitet das CMS einen
anderen Branch als den, den Vercel veröffentlicht.
