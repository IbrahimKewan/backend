**Aufgabe 1 — Basis-Setup**

-   Express-Server erstellen
-   `index.js` mit grundlegender Middleware (`express.json`, `cors`, `express-session`)
-   Router-Struktur: `router/auth_users.js`, `router/general.js`, `router/filmDB.js`
-   Dummy-Daten im Films-Router anlegen

---

**Aufgabe 2 — Authentifizierung**

-   `POST /auth/register`: User anlegen, einfache Validierung
-   `POST /auth/login`: Login mit JWT + Session speichern
-   `authenticated`-Middleware erstellen (JWT aus Session prüfen)

---

**Aufgabe 3 — Filme lesen & filtern**

-   `GET /films`: alle Filme zurückgeben
-   Optional per Query filtern: `title`, `director`, `genre`
-   Kombinierte Filter ermöglichen
-   Konsistente API-Response-Struktur

---

**Aufgabe 4 — Einzelnen Film abrufen**

-   `GET /films/:id`: Film mit passender ID zurückgeben
-   404, falls nicht gefunden

---

**Aufgabe 5 — (geschützt) Review hinzufügen**

-   `POST /films/:id/reviews`: Nur eingeloggte User
-   Nur ein Review pro User/Film
-   `rating` 1–5, `comment` optional
-   404 bei Film nicht gefunden, 400 bei invalidem Rating, 409 bei mehrfacher Bewertung

---

**Aufgabe 6 — (geschützt) Review ändern**

-   `PUT /films/:id/reviews`: Nur der User, der den Review geschrieben hat, darf ändern
-   Nur Felder aus Body updaten (`rating`, `comment`)
-   Gleiche Validierung wie bei Hinzufügen

---

**Aufgabe 7 — (geschützt) Review löschen**

-   `DELETE /films/:id/reviews`: Nur der User, der den Review geschrieben hat
-   404, wenn Review nicht existiert

---

**Aufgabe 8 — Einheitliche Fehlerbehandlung**

-   Konsistente JSON-Struktur für alle Fehler- und Erfolgsantworten
-   Globaler 404-Handler für unbekannte Routen
-   Globaler Error-Handler

---

**Aufgabe 9 — Validierung verbessern**

-   Registrierung/Login: Pflichtfelder & Mindestlängen prüfen
-   Reviews: `rating` 1–5, `comment` max. Länge
-   Optional: Validierungsbibliothek wie Joi oder Zod verwenden

---

**Aufgabe 10 — Security-Härtung**

-   `helmet` verwenden
-   `cors` auf erlaubte Origins beschränken
-   Rate-Limiting auf `/auth/login` und Review-Routen
-   Secrets aus `.env` statt im Code

---

**Aufgabe 11 — Pagination & Sortierung**

-   `GET /films`: `limit`, `offset`, `sort`, `order` Query-Parameter
-   Grenzen prüfen (max. Limit)

---

**Aufgabe 12 — Tests**

-   Mit `supertest` Routen testen
-   Postman-Collection mit Beispiel-Anfragen erstellen

---

**Aufgabe 13 — Async-Übung**

-   Eigenes Node-Script schreiben, das per Axios gegen deine API geht
-   4 Methoden: „alle Filme“, „Suche nach Titel“, „Suche nach Regisseur“, „Suche nach Genre“
-   Verschiedene Async-Patterns: Callback, Promise, async/await
