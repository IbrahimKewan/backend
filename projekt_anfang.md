## 📜 **Projekt-Start Spickzettel**

### **1️⃣ Neues Projekt starten**

```bash
mkdir mein-projekt
cd mein-projekt
npm init -y
```

-   `npm init -y` erstellt **package.json** mit Standardwerten
-   Projektordner sauber halten: am Anfang nur `package.json` + leere `index.js`

---

### **2️⃣ Haupt-Abhängigkeiten installieren**

```bash
npm install express cors express-session jsonwebtoken
```

-   **express** → Webserver
-   **cors** → Cross-Origin-Zugriffe erlauben
-   **express-session** → Sessions speichern (Login-Status)
-   **jsonwebtoken** → JWT-Token erstellen & prüfen

---

### **3️⃣ Entwicklungs-Tools**

```bash
npm install --save-dev nodemon
```

-   **nodemon** → Server startet automatisch neu bei Code-Änderung
-   In `package.json` → Skripte hinzufügen:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

### **4️⃣ Tests vorbereiten**

```bash
npm install --save-dev jest supertest
```

-   **jest** → Test-Framework
-   **supertest** → HTTP-Anfragen an Express-Routen testen
-   In `package.json`:

```json
"scripts": {
  "test": "jest --runInBand",
  "test:watch": "jest --watch"
}
```

---

### **5️⃣ Optional: Sicherheit & Utils**

```bash
npm install helmet dotenv
```

-   **helmet** → Sicherheit (HTTP-Header)
-   **dotenv** → `.env`-Datei für Geheimnisse & Einstellungen

---

### **6️⃣ Ordnerstruktur anlegen**

```bash
mkdir routes middleware data tests
touch index.js
```

**Empfohlen:**

```
mein-projekt/
│ index.js
│ package.json
│ .env
├── routes/
│   ├── auth.js
│   ├── recipes.js
├── middleware/
│   └── auth.js
├── data/
│   └── recipes.js
└── tests/
    └── recipes.test.js
```

---

## 🚨 **Häufige Fehler von dir (und wie du sie vermeidest)**

1. **`req.session` ist undefined** →
   👉 Immer `express-session` vor den Routen mit `app.use(session(...))` einbinden.

2. **Module nicht gefunden** →
   👉 Pfade genau prüfen (`./routes/auth.js` vs `./router/auth.js`).

3. **Variablen doppelt definiert** →
   👉 Gleichen Variablennamen nicht mit `let` in Funktion & außen benutzen.

4. **Trim & Typ-Check vergessen** →
   👉 Immer `typeof var === "string" && var.trim() !== ""` vor `.toLowerCase()`

5. **Middleware nicht richtig eingebunden** →
   👉 Auth-Middleware **direkt** vor geschützte Routen setzen:

    ```js
    app.use("/recipes", authenticated, recipesRouter);
    ```

6. **JWT prüfen vergessen** →
   👉 In Middleware `jwt.verify` mit `try/catch` oder Callback nutzen.

7. **GET mit falscher Query- oder Params-Nutzung** →
   👉 `req.query` für `?key=value`
   👉 `req.params` für `/path/:id`

---
