## 🧭 **Teil 1 – Ziel verstehen (Was sollst du bauen?)**

### 🔹 Du sollst eine kleine Webanwendung bauen:

-   Sie verwaltet eine **Freundesliste**
-   Die Daten sind **lokal im Speicher** (also keine Datenbank)
-   Du kannst:
    ✅ Freunde hinzufügen
    ✅ anzeigen
    ✅ bearbeiten
    ✅ löschen

Das nennt man **CRUD** (Create, Read, Update, Delete)

---

## 🧭 **Teil 2 – Aufgabenübersicht**

Hier ist der **grobe Plan** der Aufgaben – wir machen jeden Punkt einzeln:

---

### 📁 **1. Ordnerstruktur und Projekt vorbereiten**

-   Neues Projektverzeichnis anlegen
-   `npm init` ausführen
-   Express und nötige Pakete installieren
-   Projektstruktur aufbauen (`index.js`, `routes/users.js`, etc.)

---

### 🧪 **2. Express-Server starten**

-   Einen einfachen Express-Server schreiben
-   Testen, ob er auf Port 5000 läuft

---

### 🔄 **3. CRUD-Endpunkte implementieren**

-   **GET**: Alle Benutzer
-   **GET**: Benutzer nach Email
-   **POST**: Benutzer hinzufügen
-   **PUT**: Benutzer bearbeiten
-   **DELETE**: Benutzer löschen

---

### 🧪 **4. Testen mit Postman**

-   Anfrage an jeden Endpunkt mit Postman stellen
-   Prüfen, ob alles richtig zurückkommt

---

### 🔐 **5. (Optional später) Authentifizierung**

-   Login-Endpunkt
-   JWT-Token
-   Absichern der Endpunkte mit Session & Token
