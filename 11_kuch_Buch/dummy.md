# Dummy-Daten (Start-Seed)

## `users` (im Speicher)

```js
let users = [
    {
        username: "alice",
        password: "alice123", // (für Übung im Klartext)
        role: "user", // optional: "admin"
        favorites: ["r1"], // recipe-IDs
        createdAt: "2025-08-10T12:00:00Z",
    },
    {
        username: "bob",
        password: "bob123",
        role: "user",
        favorites: [],
        createdAt: "2025-08-10T12:05:00Z",
    },
];
```

## `recipes`

```js
let recipes = [
    {
        id: "r1",
        title: "Spaghetti Aglio e Olio",
        author: "alice",
        time: 15, // Minuten
        ingredients: [
            { name: "Spaghetti", amount: "200 g" },
            { name: "Knoblauch", amount: "3 Zehen" },
            { name: "Olivenöl", amount: "4 EL" },
            { name: "Chiliflocken", amount: "1 TL" },
            { name: "Petersilie", amount: "etwas" },
            { name: "Salz", amount: "n.B." },
        ],
        steps: [
            "Spaghetti in Salzwasser kochen.",
            "Knoblauch in Öl sanft anrösten, Chili dazu.",
            "Nudeln untermischen, Petersilie zugeben, servieren.",
        ],
        tags: ["pasta", "italian", "quick"],
        ratings: [{ user: "bob", rating: 5, comment: "Einfach und super!" }],
        createdAt: "2025-08-10T12:10:00Z",
        updatedAt: "2025-08-10T12:10:00Z",
    },
    {
        id: "r2",
        title: "Chicken Curry",
        author: "bob",
        time: 40,
        ingredients: [
            { name: "Hähnchenbrust", amount: "400 g" },
            { name: "Zwiebel", amount: "1" },
            { name: "Knoblauch", amount: "2 Zehen" },
            { name: "Ingwer", amount: "1 TL, gehackt" },
            { name: "Curry-Paste", amount: "2 EL" },
            { name: "Kokosmilch", amount: "400 ml" },
        ],
        steps: [
            "Zwiebel, Knoblauch, Ingwer anschwitzen.",
            "Hähnchen anbraten, Curry-Paste zugeben.",
            "Mit Kokosmilch köcheln lassen bis gar.",
        ],
        tags: ["asian", "spicy", "comfort"],
        ratings: [],
        createdAt: "2025-08-10T12:20:00Z",
        updatedAt: "2025-08-10T12:20:00Z",
    },
    {
        id: "r3",
        title: "Avocado Toast",
        author: "alice",
        time: 10,
        ingredients: [
            { name: "Brot", amount: "2 Scheiben" },
            { name: "Avocado", amount: "1" },
            { name: "Zitrone", amount: "1 TL Saft" },
            { name: "Salz & Pfeffer", amount: "n.B." },
        ],
        steps: ["Brot toasten.", "Avocado zerdrücken, würzen, aufstreichen."],
        tags: ["breakfast", "quick", "vegan"],
        ratings: [],
        createdAt: "2025-08-10T12:30:00Z",
        updatedAt: "2025-08-10T12:30:00Z",
    },
];
```

### Hilfsfelder (optional berechnet zurückgeben)

-   `avgRating`: Mittelwert aus `ratings[].rating`, auf 1 Nachkommastelle.
-   `ratingCount`: Anzahl Bewertungen.

---

# Akzeptanz-Template für Tests (Jest + Supertest)

> Formuliere deine Tests so, dass **Statuscode, Struktur und Kerndaten** geprüft werden – nicht jede Kleinigkeit.

## Auth

-   **Register ok (201)**

    -   body: `{ username, password }`
    -   prüfe: `res.status=201`, `username` in body, User im Speicher vorhanden

-   **Register duplicate (409)**
-   **Login ok (200)**

    -   prüfe: Cookie/Session gesetzt (Agent nutzen), `token` optional

-   **Login wrong (401)**
-   **Logout (200)**

    -   prüfe: danach geschützte Route → 401/403

## Recipes – Public

-   **GET /recipes (200)**

    -   prüfe Array, mind. Länge 1

-   **Filter (title/tag/author/ingredient/maxTime)**

    -   z. B. `?title=spaghetti`, `?tag=quick`, `?ingredient=Knoblauch`, `?maxTime=20`
    -   Status 200 oder 404 (je nach Found/Not Found)

-   **Pagination & Sort**

    -   `?limit=1&offset=1&sort=title&order=asc` → 200, Länge 1

-   **GET /recipes/\:id**

    -   ok (200) mit passendem `id`
    -   not found (404)

## Recipes – Protected (Autor ist Besitzer)

-   **Create (201)**

    -   body: `{ title, steps[], ingredients[], time, tags[] }`
    -   prüfe: `author` = eingeloggter User, `id` existiert

-   **Update (200) nur als Author**

    -   fremder User → 403
    -   unknown id → 404

-   **Delete (200) nur als Author**

    -   erneut löschen → 404

## Ratings (geschützt)

-   **Create rating (201)**

    -   body: `{ rating: 5, comment }`
    -   prüfe: in `ratings` enthalten

-   **Duplicate rating (409)**
-   **Update own rating (200)**

    -   nicht vorhanden → 404

-   **Delete own rating (200)**

    -   erneut löschen → 404

-   **GET avgRating**

    -   auf `/recipes` und `/recipes/:id` kommt `avgRating` & `ratingCount` korrekt zurück

## Favorites (geschützt)

-   **Toggle favorite (200)**

    -   erst `true`, nochmal → `false`

-   **GET /me/favorites (200)**

    -   enthält Rezept-IDs oder ganze Rezepte (wie du’s definierst)

## Fehler & Sicherheit

-   **Validation 400**

    -   fehlende Felder beim Create/Update
    -   falsche Typen (z. B. `time` kein Number)

-   **Unauthorized 401**

    -   geschützte Routen ohne Login

-   **Forbidden 403**

    -   fremde Rezepte ändern/löschen (wenn du 403 statt 401 nutzt)

-   **404**

    -   nicht existierende ID

-   **Helmet/CORS**

    -   Middleware ist eingebunden (Smoke-Test: Server startet; tiefe Security-Tests optional)

---

# Kurz-Ordnerstruktur (Vorschlag)

```
cookbook/
├─ app.js                // Express-App (export)
├─ index.js              // server.listen
├─ router/
│  ├─ auth.js
│  ├─ recipes.js         // enthält auch ratings/favorites (oder splitten)
│  └─ me.js              // /me/favorites
├─ middleware/
│  ├─ auth.js            // authenticated
│  └─ validate.js        // kleine Validatoren
├─ test/
│  ├─ auth.test.js
│  ├─ recipes.public.test.js
│  ├─ recipes.protected.test.js
│  ├─ ratings.test.js
│  └─ favorites.test.js
└─ package.json
```
