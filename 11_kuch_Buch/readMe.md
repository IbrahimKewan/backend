# Szenario

Du baust eine REST-API für Rezepte. Nutzer können sich registrieren/einloggen, Rezepte suchen/filtern, bewerten, kommentieren, favorisieren. Optional gibt’s Admin-Funktionen.

---

# Meilenstein 1 – Projektgrundlage

1. **Setup**

-   Express, CORS, express-session, JWT.
-   Ordnerstruktur: `app.js`, `index.js`, `middleware/`, `router/`, `test/`, `readme.md`.
-   Dummy-Daten: `recipes[]`, `users[]`.
-   Health-Route: `GET /ping -> 200`.

**AK:** Server startet, `/ping` 200, Linter/Prettier optional.

---

# Meilenstein 2 – Auth (öffentlich)

2. **Register**

-   `POST /auth/register` (body: `{username, password}`).
-   Validierung: username min 4, password min 6.
-   201 bei Erfolg, 409 wenn Nutzer existiert.

3. **Login**

-   `POST /auth/login` (Session + JWT in `req.session.authorization.accessToken`).
-   200 bei Erfolg, 401 bei falschen Daten.

4. **Logout**

-   `POST /auth/logout` → Session zerstören, 200.

**AK:** Nach Login sind geschützte Routen erreichbar (Cookie/Session).

---

# Meilenstein 3 – Rezepte lesen (öffentlich)

5. **Liste**

-   `GET /recipes` → alle.
-   Query-Filter: `title`, `tag`, `author`, `ingredient`, `maxTime` (in Minuten).
-   Kombinierbar, case-insensitive.
-   Pagination: `limit` (max 50), `offset`.
-   Sortierung: `sort=title|rating|time&order=asc|desc`.

6. **Einzelnes Rezept**

-   `GET /recipes/:id` → Rezeptobjekt oder 404.

**AK:** 200/404 korrekt, Filter+Pagination funktionieren; konsistente Response-Form (`{ message, results }` / `{ message, data }`).

---

# Meilenstein 4 – Rezepte schreiben (geschützt)

7. **Erstellen**

-   `POST /recipes` (geschützt).
-   Body: `{ title, steps[], ingredients[], time, tags[] }`.
-   Validierung: Pflichtfelder, Typen, `steps.length >= 1`, `ingredients.length >= 1`.
-   Setze `author = req.user.username`.
-   201 + neues Rezept.

8. **Ändern**

-   `PUT /recipes/:id` (geschützt, nur Autor).
-   Teil-Update erlaubt (nur übergebene Felder).
-   403 wenn nicht Autor, 404 wenn nicht gefunden.
-   200 bei Erfolg.

9. **Löschen**

-   `DELETE /recipes/:id` (geschützt, nur Autor).
-   200, sonst 403/404.

**AK:** Autorisierung greift; CRUD rund.

---

# Meilenstein 5 – Bewertungen & Kommentare (geschützt)

10. **Bewertung abgeben**

-   `POST /recipes/:id/ratings` → `{ rating: 1..5, comment? }`.
-   Pro Nutzer **eine** Bewertung/Recipe.
-   201, 409 bei dupliziert, 400 bei invalidem rating, 404 bei Rezept nicht gefunden.

11. **Bewertung ändern**

-   `PUT /recipes/:id/ratings` → eigene Bewertung updaten.
-   200, 404 wenn keine eigene Bewertung.

12. **Bewertung löschen**

-   `DELETE /recipes/:id/ratings` → eigene Bewertung entfernen.
-   200, 404 wenn nicht vorhanden.

13. **Durchschnittsrating**

-   Bei `GET /recipes` und `GET /recipes/:id` durchschnittliche Bewertung mitliefern (z. B. `avgRating` gerundet auf 1 Nachkommastelle).

**AK:** Statuscodes korrekt, ein Nutzer max. eine Bewertung pro Rezept, `avgRating` konsistent.

---

# Meilenstein 6 – Favoriten (geschützt)

14. **Favorit hinzufügen/entfernen**

-   `POST /recipes/:id/favorite` → toggelt Favorit für eingeloggten Nutzer.
-   Antwort zeigt neuen Status `{ favorite: true|false }`.

15. **Eigene Favoriten**

-   `GET /me/favorites` → Liste der favorisierten Rezepte (einfach über `users[].favorites` mappen).

**AK:** Togglen funktioniert, Liste stimmt.

---

# Meilenstein 7 – Middleware & Sicherheit

16. **authenticated**

-   JWT aus `req.session.authorization.accessToken` prüfen.
-   Setzt `req.user = { username }`.

17. **rateLimit (Basis)**

-   Auf `/auth/login` ein einfaches Rate-Limit (z. B. 10/min).

18. **helmet & CORS**

-   `helmet()` aktivieren.
-   CORS in Dev offen, Hinweis: Prod nur erlaubte Origins.

19. **Zentrale Fehlerbehandlung**

-   404-Catch-All (JSON).
-   Error-Middleware: keine Stacktraces an Client.

**AK:** Fehlermeldungen konsistent, Security-Middleware aktiv.

---

# Meilenstein 8 – Validierung

20. **Request-Validation**

-   Lege leichte Validierer/Middleware an (oder `joi/zod`).
-   Einheitliche 400-Fehler mit Meldungen.

**AK:** Falsche Eingaben → 400 mit klarer Message.

---

# Meilenstein 9 – Tests

21. **Jest + Supertest**

-   Trenne `app.js` (export) und `index.js` (listen).
-   Tests:

    -   Auth-Flow (Register/Login/Logout)
    -   Rezepte: List/Filter/GetById/404
    -   CRUD: create/update/delete mit Autorisierung
    -   Ratings: create/update/delete, 409/404/400-Fälle
    -   Favorites: toggle + Liste

-   `request.agent(app)` für Session-Cookies.

**AK:** `npm test` grün; mind. 1 Test pro Route + Fehlerfall.

---

# Meilenstein 10 – Async-Übung (aus Kursidee)

22. **Node-Script `scripts/client.js`**

-   Mit Axios gegen deine API:

    -   „Alle Rezepte holen“ (Callback-Stil)
    -   „Suche nach Titel“ (Promise-then)
    -   „Suche nach Tag“ (async/await)
    -   „Get by ID“ (async/await + try/catch)

-   Konsole sauber loggen.

**AK:** Script läuft, gibt sinnvoll strukturierte Ausgaben.

---

# Stretch Goals (freiwillig)

-   **Bilder-Upload** (Mock: nur URL speichern).
-   **Admin-Rollen** (`role: 'admin'`) → Rezepte anderer löschen.
-   **Refresh-Tokens** + kurze Access-Token-TTL.
-   **Dockerfile** + `docker-compose.yml` (Node + Tests).
-   **Deployment-Hinweise** (Render/Fly/Heroku).

---

# Abgabe-Checkliste

-   README: Start/ENV/Test-Anleitung, Endpunktliste, Statuscodes.
-   Postman-Collection + Environment (optional: schon von mir gelernt).
-   Test-Coverage grob >60 % (optional).
-   Keine Secrets im Code (ENV).
