# 📚 **📦 Kursverwaltung mit Registrierung & Login**

## 🧩 Ziel:

Erstelle ein System zur **Kursverwaltung**, bei dem sich **Teilnehmer registrieren, einloggen** und **ihre Kurse sehen** können.

---

## 📁 Zielstruktur

```
kurs-api/
├── index.js
├── package.json
├── routes/
│   └── teilnehmer.js
├── middleware/
│   └── auth.js
```

---

## 📌 Aufgabe Schritt für Schritt

### 🧱 1. Datenstruktur

Verwalte in `teilnehmer.js` ein Array:

```js
let teilnehmer = [
  {
    id: 1,
    name: "Mariam",
    email: "mariam@example.com",
    password: "<hashed>",
    kurse: ["HTML", "CSS"],
  },
  ...
];
```

---

### 🔐 2. Authentifizierung

#### Registrierung (`POST /teilnehmer/register`)

-   Prüfe ob E-Mail schon vorhanden
-   Passwort prüfen (mind. 8 Zeichen, Sonderzeichen)
-   Alter prüfen (optional)
-   Passwort hashen mit bcrypt
-   Neue ID generieren
-   Teilnehmer hinzufügen

#### Login (`POST /teilnehmer/login`)

-   Finde E-Mail
-   Vergleiche Passwort mit bcrypt
-   Wenn gültig → JWT generieren
-   Gib Token zurück

---

### 🛡️ 3. Middleware

Erstelle `auth.js`, das Token prüft (wie bei der Benutzerverwaltung).

---

### 🎯 4. Geschützte Route: `GET /teilnehmer/meine-kurse`

-   Nur mit gültigem JWT zugänglich
-   Gibt `teilnehmer.kurse` zurück

---

### ➕ 5. Extra (wenn du willst)

-   `POST /teilnehmer/kurs-hinzufügen` – Kurs zu Teilnehmer hinzufügen
-   `DELETE /teilnehmer/:id` – Teilnehmer löschen
-   `PUT /teilnehmer/:id` – Daten bearbeiten
