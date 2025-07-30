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

## ✅ **Level 4 – Promise-Kette & Datenverarbeitung (mit DummyJSON API)**

### 🛍️ **Aufgabe: Benutzer → Warenkörbe → Produktdetails**

### 🎯 Ziel:

Simuliere einen Online-Shop-Ablauf mit drei aufeinander aufbauenden API-Abfragen:

---

### 📌 Schritte:

1. **getUser(userId)**
   → Liefert die Benutzerdaten (Vorname, Nachname)

2. **getUserCarts(userId)**
   → Liefert alle Bestellungen (Warenkörbe) dieses Benutzers

3. **getCartDetails(cartId)**
   → Liefert die Produktdetails der **ersten Bestellung** (Produkte & Mengen)

---

### ✅ Deine Aufgabe:

1. Frage den Benutzer (z. B. über `prompt-sync`) nach einer `userId`
2. Hole die Benutzerdaten von
   `https://dummyjson.com/users/:id`
3. Hole seine Warenkörbe von
   `https://dummyjson.com/carts/user/:id`
4. Analysiere die **erste Bestellung** (`carts[0]`)
5. Gib z. B. folgende Ausgabe aus:

```
🧑 Benutzer: Terry Medhurst
🛒 Bestellungen: 2
📦 Erste Bestellung enthält 3 Artikel:
    - "Spring and summershoes" (3x)
    - "TC Reusable Silicone" (1x)
    - "Women Shoulder Bag" (2x)
```

---

### 🔁 Anforderungen:

-   Verwende eine **Promise-Kette mit `.then()`**, nicht `async/await`
-   Nutze **`axios`** für die API-Calls
-   Baue eine **lesbare Ausgabe** der Produkttitel und Mengen
-   Behandle Fehler sinnvoll (`catch`)

---

### 🧠 Bonus:

-   Zähle und zeige: wie viele Produkte insgesamt in der ersten Bestellung sind (Summe der Mengen)
-   Zeige auch den Gesamtpreis (`total`) der Bestellung

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

### 🧩 **Projektidee: Mini-Benutzerdatenbank**

-   Der Nutzer gibt einen Namen ein
-   Du holst Benutzerdaten per API
-   Du speicherst sie als `benutzer_<name>.json`
-   Wenn die Datei schon existiert → lies sie stattdessen
-   Zeige dem Nutzer, ob die Daten **neu geholt** oder **aus der Datei gelesen** wurden

---

Natürlich! Hier ist die Aufgabe – **klar, neu formuliert und auf CSV angepasst**:

---

## 🧪 **Level 6 – CSV: Produktdaten importieren**

### 📥 **Aufgabe:**

Du bekommst eine Datei namens `products.csv`, die Produktdaten enthält.
Deine Aufgabe ist es:

1. Die Datei **asynchron einlesen**
2. Die Daten in **JavaScript-Objekte** umwandeln
3. Nur Produkte mit einem **gültigen Preis** (größer als 0) behalten
4. Jedes gültige Produkt mit `axios.post()` an einen API-Endpunkt senden:
   → `https://example.com/api/products/import`
5. Am Ende anzeigen, **wie viele Produkte erfolgreich gesendet wurden**

---

### ✅ **Technische Anforderungen:**

-   Verwende `fs.promises.readFile` zum Einlesen der Datei
-   Verarbeite CSV mit `.split("\n")` und `.split(",")`
-   Verwende `filter` für gültige Produkte (`price > 0`)
-   Nutze `axios` für den POST-Vorgang
-   Verwende `async/await` und `try/catch` zur Fehlerbehandlung

---

### 📄 Beispielinhalt `products.csv`

```csv
id,name,price
1,Tisch,99.99
2,Stuhl,0
3,Lampe,29.95
4,Regal,-10
5,Sofa,499.95
```

---

### 🎯 Zielausgabe im Terminal:

```
✅ 3 Produkte wurden erfolgreich gesendet:
📦 Tisch – €99.99
📦 Lampe – €29.95
📦 Sofa – €499.95
❌ 2 ungültige Produkte übersprungen (Preis ≤ 0)
```

---

## 🧠 **Was du jetzt bereits kannst (Stärken):**

| Thema                  | Dein Stand                                      |
| ---------------------- | ----------------------------------------------- |
| ✅ `axios`             | HTTP-Requests machen und Daten verarbeiten      |
| ✅ `fs.promises`       | Dateien lesen & schreiben (Text, JS-Code)       |
| ✅ `async/await`       | Asynchrone Logik sauber strukturiert            |
| ✅ Fehlerbehandlung    | Mit `try/catch` arbeiten                        |
| ✅ Modulare Funktionen | Code in sinnvolle Abschnitte trennen            |
| ✅ Konsolen-Ausgabe    | Ausgabe in Format bringen (z. B. `console.log`) |
