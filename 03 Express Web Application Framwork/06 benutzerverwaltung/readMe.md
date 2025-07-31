# 📦 **Teil 1: Klassische Benutzerverwaltung (CRUD + Struktur)**

## 📁 Zielstruktur

```
benutzer-api/
├── index.js
├── package.json
└── routes/
    └── users.js
```

## 📌 Inhalt Teil 1 – Schritt für Schritt

### 🛠 Projektsetup

1. Projektordner erstellen
2. `npm init -y`
3. `npm install express`
4. Dateien anlegen:

    - `index.js`
    - `routes/users.js`

---

### 📄 `index.js` Aufgaben

-   Express starten
-   `express.json()` aktivieren
-   Routenmodul `users.js` importieren
-   Route unter `/users` registrieren
-   Startseite mit `"Willkommen zur Benutzer-API"`

---

### 📄 `routes/users.js` Aufgaben

#### Datenquelle:

-   Lokales Array `users` mit z. B. `id`, `username`, `email`, `age`

#### Routen definieren:

| Methode | Pfad   | Zweck                       |
| ------- | ------ | --------------------------- |
| GET     | `/`    | Alle Benutzer anzeigen      |
| GET     | `/:id` | Einzelnen Benutzer holen    |
| POST    | `/`    | Neuen Benutzer hinzufügen   |
| PUT     | `/:id` | Bestehenden Benutzer ändern |
| DELETE  | `/:id` | Benutzer löschen            |

---

## ✅ Ziel von Teil 1:

Ein funktionierendes, aufgeräumtes CRUD-System für Benutzer.
Sobald das läuft → **Teil 2: Sicherheit & Authentifizierung**

---

# 🔐 **Teil 2: Registrierung, Passwort, Login & Token**

---

## 📌 Inhalt Teil 2 – Schritt für Schritt

### 🔹 Erweiterungen im User-Objekt

-   Felder: `id`, `username`, `email`, `password` (hashed!), `age`

---

### 🔹 Registrierung (`POST /users/register`)

-   Eingaben validieren (nicht leer, gültig)
-   Passwort mit `bcryptjs` hashen
-   Benutzer ins Array pushen

> 💡 Nutze `bcryptjs.hash()` – installiere mit `npm install bcryptjs`

---

### 🔹 Login (`POST /users/login`)

-   Finde Benutzer anhand der `email`
-   Vergleiche Passwort mit Hash (`bcryptjs.compare()`)
-   Wenn korrekt:

    -   Erzeuge JWT-Token mit `jsonwebtoken.sign()`

> 💡 `npm install jsonwebtoken`

---

### 🔹 Geschützte Route (`GET /users/profile` o. ä.)

-   Nur mit gültigem JWT im `Authorization`-Header (`Bearer <token>`)
-   Middleware schreiben zum Token-Überprüfen (`verifyToken`)
-   Wenn Token gültig → zeige Benutzerdaten
-   Sonst → Fehlercode `401 Unauthorized`

---

## ✅ Ziel von Teil 2:

Ein System mit:

-   **sicherer Registrierung**
-   **Login mit Passwortprüfung**
-   **Tokenbasierter Zugriffsschutz (JWT)**
