# Phase 1 – Setup (Basis ans Laufen kriegen)

**Aufgabe 1: Projekt initialisieren**

-   `npm init -y`
-   Installiere: `express`, `cors`, `express-session`, `jsonwebtoken`
-   Dev: `nodemon`, `jest`, `supertest`
-   In `package.json`:

    -   Scripts: `"dev": "nodemon index.js"`, `"test": "jest --runInBand"`

-   Starte `node index.js` → Health-Route `/ping` liefert `200` + `{message:"pong"}`

**Abnahme:** `GET /ping` → 200

---

# Phase 2 – Struktur (sauber aufteilen)

**Aufgabe 2: Ordnerstruktur anlegen**

```
src/
  app.js          // Express app (ohne listen)
  server.js       // startet server
  routes/
    books.js
    auth.js
  middleware/
    auth.js       // authenticated
  data/
    seeds.js      // dummy-daten
tests/
  smoke.test.js
```

**Abnahme:** `npm run dev` startet; `/ping` funktioniert weiterhin.

---

# Phase 3 – Dummy-Daten (minimal halten)

**Aufgabe 3: Seeds anlegen**

-   `users`: je 2 Nutzer (z. B. `alice`, `bob`) mit `password` im Klartext (nur fürs Üben).
-   `books`: 3 Bücher mit Feldern:

    -   `id` (String), `title`, `author`, `year` (Number), `tags` (Array), `reviews` (Array von `{ user, rating(1..5), comment }`)

**Abnahme:** Daten werden aus `data/seeds.js` importiert, nicht in den Routern hartkodiert.

---

# Phase 4 – Öffentliche Routen (lesen & filtern)

**Aufgabe 4: GET /books**

-   Liefert alle Bücher.
-   Query-Filter (kombinierbar, case-insensitive): `title`, `author`, `tag`, `year`
-   Pagination: `limit` (max 50), `offset`
-   Sortierung: `sort=title|year` und `order=asc|desc`
-   Wenn Filter gesetzt & keine Treffer → `404` + `{message, results: []}`

**Abnahme:** Beispiele

-   `/books` → 200
-   `/books?title=ring` → 200 oder 404
-   `/books?author=rowling&year=1997` → 200 oder 404
-   `/books?limit=1&offset=1&sort=year&order=desc` → 200

**Aufgabe 5: GET /books/\:id**

-   Einzelnes Buch oder `404`

**Abnahme:** `/books/<existiert>` → 200, `/books/unknown` → 404

---

# Phase 5 – Auth (Login/Logout)

**Aufgabe 6: /auth**

-   `POST /auth/register`: `{username, password}` → 201, 409 bei Duplicate, 400 bei invalid
-   `POST /auth/login`: Session + JWT in `req.session.authorization.accessToken`; 200 bei ok, 401 bei falsch
-   `POST /auth/logout`: Session zerstören → 200
-   `GET /auth/ping`: 200 (zum Testen)

**Abnahme:** Login erzeugt Session-Cookie; nach Logout ist Cookie ungültig.

---

# Phase 6 – Geschützte Routen (schreiben)

**Aufgabe 7: authenticated-Middleware**

-   Liest Token aus `req.session.authorization.accessToken`
-   Verifiziert JWT
-   Setzt `req.user = { username }`
-   Fehler: 401 (nicht eingeloggt), 403 (ungültiges/abgelaufenes Token)

**Abnahme:** Eine Dummy-Route `/me/ping` hinter der Middleware → 200 nur mit Login.

**Aufgabe 8: POST /books (geschützt)**

-   Body: `{ title, author, year, tags[] }`
-   Validierung: Pflichtfelder + Typen
-   Erstellt neues Buch mit generierter `id`
-   Autorisierung: **nur eingeloggte Nutzer** (jeder darf erstellen)
-   Antwort: 201 + Buch

**Abnahme:** Ohne Login → 401/403; mit Login → 201

**Aufgabe 9: PUT /books/\:id (geschützt)**

-   Teil-Update erlaubt (`title?`, `author?`, `year?`, `tags?`)
-   404 bei unbekannter ID
-   200 bei Erfolg

**Abnahme:** PUT mit Login → 200; ohne Login → 401/403

**Aufgabe 10: DELETE /books/\:id (geschützt)**

-   Löscht Buch
-   404 bei unbekannter ID
-   200 bei Erfolg

**Abnahme:** DELETE mit Login → 200; ohne Login → 401/403

---

# Phase 7 – Reviews (pro Nutzer max. 1)

**Aufgabe 11: POST /books/\:id/reviews (geschützt)**

-   Body: `{ rating: 1..5, comment? }`
-   404 wenn Buch fehlt
-   400 bei invalidem `rating`
-   409 wenn Nutzer dieses Buch bereits bewertet hat
-   201 bei Erfolg; Review wird `{ user: req.user.username, rating, comment }`

**Aufgabe 12: PUT /books/\:id/reviews (geschützt)**

-   Update **eigener** Review (rating/comment)
-   404 wenn keine eigene Bewertung vorhanden
-   200 bei Erfolg

**Aufgabe 13: DELETE /books/\:id/reviews (geschützt)**

-   Löscht **eigene** Bewertung
-   404 wenn nicht vorhanden
-   200 bei Erfolg

**Abnahme:** Doppelte Bewertung → 409; Update ohne vorhandenen Review → 404

---

# Phase 8 – Konsistenz & Fehler

**Aufgabe 14: Einheitliche Responses**

-   Erfolg: `{ message, data }` (für Einzelobjekte) oder `{ message, results, total? }` (für Listen)
-   Fehler: `{ message }` (+ `errorCode?` optional)
-   Globaler 404-Handler für unbekannte Routen
-   Globaler Error-Handler (keine Stacktraces an Client)

**Abnahme:** Unbekannte Route → 404 JSON; erzwungener Fehler → 500 JSON

---

# Phase 9 – Tests (klein, aber nützlich)

**Aufgabe 15: Jest + Supertest**

-   `app.js` exportiert App, `server.js` macht `listen`
-   Tests:

    -   `GET /ping` → 200
    -   `GET /books`, Filter, `GET /books/:id`, 404
    -   Auth-Flow: register (201), duplicate (409), login (200), wrong login (401)
    -   Protected: create book (201), update (200), delete (200), ohne Login (401/403)
    -   Reviews: create (201), duplicate (409), update (200), delete (200), 404-Fälle

**Abnahme:** `npm test` läuft grün (oder mit wenigen gezielten Tests erst mal starten).

---

# Phase 10 – (Optional) Sauberkeit & Komfort

**Aufgabe 16: Code-Aufräumen**

-   `router.param('id')` für Bücher
-   Kleinere Middleware: `validateBookInput`, `validateReviewInput`
-   `findOwnReviewIndex()` Helper

**Aufgabe 17: Sicherheit**

-   `helmet` aktivieren
-   Rate-Limit (einfach) auf `/auth/login` (kannst du auch überspringen)

**Aufgabe 18: README**

-   Start-Anleitung, Endpunkte-Liste, Beispiel-Requests (curl/Postman)

---
