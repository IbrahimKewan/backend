```
/mein-projekt/
│
├── node_modules/             # Automatisch durch npm install erzeugt
│
├── config/                   # Konfigurationsdateien
│   ├── db.js                 # Datenbankverbindung
│   └── env.js                # Umgebungsvariablen
│
├── models/                   # Datenmodelle (z. B. mit Mongoose oder Sequelize)
│   └── mitarbeiter.js        # Beispiel-Datenmodell
│
├── routes/                   # Routen (REST-Endpunkte)
│   └── mitarbeiterRoutes.js  # Routen für die Ressource "Mitarbeiter"
│
├── controllers/              # Logik der API-Endpunkte
│   └── mitarbeiterController.js
│
├── middleware/               # Middleware-Funktionen
│   └── auth.js               # Authentifizierung via JWT z. B.
│
├── tests/                    # Blackbox-Tests
│   └── mitarbeiter.test.js
│
├── utils/                    # Hilfsfunktionen
│   └── logger.js
│
├── app.js                    # Hauptdatei zum Starten der App
├── routes.js                 # Importiert & verbindet alle Routen
├── package.json              # Projektbeschreibung und Abhängigkeiten
└── .env                      # Umgebungsvariablen (nicht in Git pushen!)
```

---

### 📝 Kurzbeschreibung:

| Pfad/Datei     | Zweck                                                            |
| -------------- | ---------------------------------------------------------------- |
| `app.js`       | Einstiegspunkt, Express-Setup, Middleware etc.                   |
| `routes.js`    | Zentrale Stelle zum Importieren & Verbinden der einzelnen Routen |
| `config/`      | Konfigurationen wie DB-Zugang, Port, Secrets                     |
| `models/`      | Definiert Datenstrukturen, z. B. MongoDB-Schemas                 |
| `controllers/` | Enthält Business-Logik der jeweiligen API-Endpunkte              |
| `middleware/`  | Wiederverwendbare Funktionen für Auth, Logging usw.              |
| `tests/`       | Tests mit Mocha, SuperTest etc.                                  |
| `utils/`       | Helferfunktionen (z. B. Logger, Validatoren)                     |
| `.env`         | Speichert sensible Daten wie API-Schlüssel (nicht in Git!)       |

---

## 📁 **Empfohlene Ordnerstruktur für eine Express-Anwendung**

Auch wenn Express keine feste Struktur vorschreibt, empfiehlt sich die folgende Konvention:

### 🔧 **Ordner:**

-   `node_modules`: Enthält automatisch installierte Pakete (nach `npm install`).
-   `config`: Speichert Konfigurationsdateien wie z. B.:

    -   Datenbankverbindungen
    -   Umgebungsvariablen
    -   API-Schlüssel

-   `models`: Beinhaltet Datenmodelle (z. B. via ORM für SQL oder MongoDB).
-   `routes`: Enthält die Routing-Dateien für verschiedene Ressourcen/Entitäten.
-   `views`: (nur bei Web-Apps, nicht bei APIs) – Template-Dateien für dynamisches HTML/CSS/JS.
-   `public`: Statische Inhalte wie Bilder, CSS, JS. Oft mit Unterordnern.

### 📄 **Dateien im Root-Verzeichnis:**

-   `app.js`: Hauptkonfigurationsdatei für die Express-App.
-   `routes.js`: Zentrale Sammelstelle für alle Routen-Dateien, die hier importiert und als Modul exportiert werden.
-   `package.json`: Projektmetadaten und Abhängigkeiten.

---

## 📁 **API-spezifische Struktur**

Für APIs wird eine schlankere Struktur verwendet:

-   **Ordner**: `node_modules`, `config`, `models`, `routes`
-   **Dateien**: `app.js`, `routes.js`, `package.json`
-   **Keine** `views` oder `public` Ordner nötig

---

## 📌 **REST API Best Practices**

### ✅ **Routenbenennung**

-   Verwende **Substantive** als Ressourcenkennungen.
-   Beispiel mit Ressource **Mitarbeiter**:

| HTTP-Methode | Route              | Beschreibung                  |
| ------------ | ------------------ | ----------------------------- |
| POST         | `/mitarbeiter`     | Neuen Mitarbeiter erstellen   |
| GET          | `/mitarbeiter`     | Alle Mitarbeiter abrufen      |
| GET          | `/mitarbeiter/:id` | Einzelnen Mitarbeiter abrufen |
| PATCH        | `/mitarbeiter/:id` | Mitarbeiter aktualisieren     |
| DELETE       | `/mitarbeiter/:id` | Mitarbeiter löschen           |

### 🔁 **HTTP-Statuscodes korrekt verwenden**

-   `2xx` → Erfolg (z. B. `200 OK`, `201 Created`)
-   `3xx` → Umleitungen
-   `4xx` → Client-Fehler (z. B. `404 Not Found`)
-   `5xx` → Server-Fehler (z. B. `500 Internal Server Error`)

### 🧪 **Blackbox-Testing**

-   Teste die API **ohne interne Implementierung zu kennen**
-   Tools:

    -   `Mocha`: Test-Framework
    -   `SuperTest`: Modul zum Testen von HTTP-Anfragen

### 🔐 **Authentifizierung**

-   Verwende **JWT (JSON Web Token)** für zustandslose Authentifizierung

    -   REST APIs sind zustandslos → Authentifizierung sollte es auch sein
    -   Sitzungsspeicherung erfolgt auf Client-Seite (im Token)

### 📚 **API-Dokumentation**

-   Essentiell für die Nutzbarkeit einer API
-   Tools:

    -   [API Blueprint](https://apiblueprint.org)
    -   [Swagger / OpenAPI](https://swagger.io)

---

## 💡 **Weitere hilfreiche Tipps**

### 📦 **NPM (Node Package Manager)**

-   Initialisierung: `npm init`
-   Abhängigkeiten installieren:

    -   Produktionsabhängigkeiten: `npm install <paket> --save`
    -   Entwicklungsabhängigkeiten: `npm install <paket> --save-dev`

-   **Nie `node_modules` pushen** → immer `.gitignore` verwenden

### 🔤 **Namenskonventionen**

-   **Dateien**: nur **kleinbuchstabig**
-   **Variablen**: **camelCase**
-   **NPM-Module**: **kebab-case** (klein, mit Bindestrich)
-   Bei `require`: auch **camelCase**

---
