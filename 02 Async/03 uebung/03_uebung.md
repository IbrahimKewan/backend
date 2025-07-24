## 🟢 **Level 1 – Einfache Grundlagen**

### 🧪 Aufgabe: **Dateiinhalt lesen und anzeigen**

**Ziel:** Lies eine Textdatei (`info.txt`) und gib ihren Inhalt in der Konsole aus.

✅ Konzepte:

-   `fs.readFile`
-   anonymer Callback

```js
// Bonusfrage: Was passiert, wenn die Datei fehlt?
```

---

## 🟡 **Level 2 – JSON & APIs**

### 🌦️ Aufgabe: **Wetterdaten abrufen**

**Ziel:** Baue eine Funktion, die aktuelle Wetterdaten aus einer API (z. B. `weatherapi.com`) lädt und die Temperatur und das Wetterzustandssymbol ausgibt.

✅ Konzepte:

-   HTTP-Anfrage mit Axios
-   async/await
-   JSON-Verarbeitung

📎 Bonus: Übergib den Ort als Parameter (`holeWetter("Berlin")`)

---

## 🟠 **Level 3 – Modulare Struktur mit Callback**

### 📦 Aufgabe: **Eigenes Modul zur Wetterabfrage**

**Ziel:** Lagere die HTTP-Anfrage in ein eigenes Modul `wetter.js` aus. In der Hauptanwendung `app.js` rufst du es auf und gibst das Ergebnis aus.

✅ Konzepte:

-   Eigene Module
-   Rückgabe per Callback
-   Fehlerbehandlung

🧩 Extra: Zeige eine freundliche Nachricht, wenn der API-Key fehlt oder ungültig ist.

---

## 🔵 **Level 4 – Promise-Kette & Datenverarbeitung**

### 🛍️ Aufgabe: **Benutzer → Bestellungen → Details**

**Ziel:** Simuliere drei API-Aufrufe:

1. `getUser(id)` → liefert Userdaten
2. `getOrders(userId)` → liefert Bestellungen
3. `getOrderDetails(orderId)` → liefert Details zur ersten Bestellung

✅ Konzepte:

-   Promise-Kette mit `.then()`
-   Rückgabe von Promises
-   Modularisierung möglich

🎯 Ziel: Zeige z. B. `Benutzer Max Mustermann hat 2 Bestellungen. Die erste enthält 3 Artikel.`

---

## 🔴 **Level 5 – Asynchroner Mini-Workflow (Real Case)**

### 📥 Aufgabe: **CSV-Datei lesen → Daten bereinigen → an API senden**

**Szenario:** Du bekommst eine CSV-Datei mit Benutzerkontakten (`contacts.csv`). Du sollst:

1. Die Datei **asynchron einlesen**
2. Die Daten **in Objekte umwandeln**
3. Nur Kontakte mit gültiger E-Mail behalten
4. An einen fiktiven API-Endpunkt (`/api/contacts/import`) **POSTen**

✅ Konzepte:

-   `fs.promises`
-   CSV parsen (z. B. mit `csv-parse`)
-   async/await
-   Axios für POST

📎 Bonus: Logge, wie viele Kontakte erfolgreich gesendet wurden.

---
