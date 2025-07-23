## 🔄 **1. Asynchrone Programmierung & Callback-Funktionen**

### 📌 Wichtige Infos:

-   Node.js arbeitet **asynchron** – es blockiert den Programmablauf **nicht**, während es z. B. auf Netzwerkanfragen wartet.
-   Um das Ergebnis zu verarbeiten, verwendet man **Callback-Funktionen**.
-   Diese Funktion wird **später aufgerufen**, wenn z. B. die Antwort von einem Webserver eingeht.
-   Vorteile:

    -   Server bleibt **reaktionsschnell**
    -   Spart **Rechenzeit**

-   Netzwerkoperationen wie HTTP laufen **nicht-blockierend** – Ergebnisse kommen **später**, wenn der Server antwortet.

---

### 💻 Beispiel – HTTP-Anfrage mit Callback:

```js
const http = require("http");

http.get(
    "http://api.weatherapi.com/v1/current.json?key=DEMO&q=Berlin",
    (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            const wetter = JSON.parse(data);
            console.log("Temperatur:", wetter.current.temp_c, "°C");
        });
    }
);
```

## 📦 **2. Modul mit Rückgabefunktion an Hauptanwendung**

### 📌 Wichtige Infos:

-   In Node.js kannst du **eigene Module erstellen**, die bestimmte Aufgaben übernehmen (z. B. HTTP-Anfragen).
-   Wenn ein Modul **asynchron arbeitet**, gibt es das Ergebnis **nicht direkt zurück**.
-   Stattdessen ruft das Modul eine **Callback-Funktion** auf, die von der **Hauptanwendung übergeben** wurde.
-   Dieses Muster erlaubt:

    -   **Trennung von Logik** (Modul macht Anfrage, App verarbeitet Ergebnis)
    -   **Nicht-blockierende Abläufe**
    -   **Fehlerbehandlung im Modul**

---

### 💻 Beispiel – Modul mit Callback zur Hauptanwendung:

#### 📁 `wetter.js` – Das Modul:

```js
const http = require("http");

function getWeather(callback) {
    http.get(
        "http://api.weatherapi.com/v1/current.json?key=DEMO&q=Berlin",
        (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                try {
                    const result = JSON.parse(data);
                    callback(null, result); // Erfolgreich
                } catch (err) {
                    callback(err); // JSON-Fehler
                }
            });
        }
    ).on("error", (err) => callback(err)); // Verbindungsfehler
}

module.exports = { getWeather };
```

#### 📁 `app.js` – Die Hauptanwendung:

```js
const { getWeather } = require("./wetter");

getWeather((err, result) => {
    if (err) {
        return console.error("Fehler:", err.message);
    }
    console.log("Wetter in Berlin:", result.current.temp_c, "°C");
});
```

## ⚠️ **3. Callback-Hell & Inversion of Control**

### 📌 Wichtige Infos:

#### 🔁 **Callback-Hell (auch: Pyramide des Untergangs):**

-   Entsteht, wenn **mehrere Callbacks ineinander verschachtelt** sind.
-   Beispiel: Du brauchst Daten → analysierst sie → schreibst sie → sendest sie weiter.
-   Code wird **unleserlich**, schwer wartbar und fehleranfällig.

#### 🔄 **Inversion of Control (IoC):**

-   Wenn du einem Drittanbieter (z. B. einem Modul oder Framework) einen Callback übergibst, **verlierst du die Kontrolle** darüber, wann/wie/ob dein Code ausgeführt wird.
-   Probleme:

    -   Callback wird **zu oft**, **zu selten**, oder **gar nicht** aufgerufen
    -   Fehler schwer zu finden
    -   Du musst dem Drittcode **vertrauen** oder zusätzlichen Schutz einbauen

#### ✅ **Lösungen:**

-   **Callbacks trennen** in kleine, benannte Funktionen
-   **Kommentare** schreiben
-   **Promises** verwenden (nächster Abschnitt)
-   Oder `async/await` nutzen

---

### 💻 Beispiel – Callback-Hell:

```js
// Schwer lesbar, stark verschachtelt:
getUser(userId, function (user) {
    getOrders(user.id, function (orders) {
        getOrderDetails(orders[0].id, function (details) {
            console.log("Bestelldetails:", details);
        });
    });
});
```

### 💡 Lösung mit Promises (kurz angeteasert):

```js
getUser(userId)
    .then((user) => getOrders(user.id))
    .then((orders) => getOrderDetails(orders[0].id))
    .then((details) => console.log("Bestelldetails:", details))
    .catch((err) => console.error("Fehler:", err));
```

## ✅ **4. Promises & Async/Await**

### 📌 Wichtige Infos:

#### 🔸 **Promise:**

-   Ein **Promise** ist ein Objekt, das den zukünftigen **Erfolg oder Fehler** einer asynchronen Operation beschreibt.
-   Es hat drei Zustände:

    -   `pending` (ausstehend)
    -   `fulfilled` (erfüllt / erfolgreich)
    -   `rejected` (abgelehnt / Fehler)

-   Mit `.then()` und `.catch()` kannst du auf Ergebnis oder Fehler reagieren.

#### 🔸 **Async/Await:**

-   **Syntaktischer Zucker** für Promises: macht den Code **lesbarer und lineare** wie bei synchronem Code.
-   `async` deklariert eine Funktion, die ein Promise zurückgibt.
-   `await` pausiert den Code, bis das Promise erfüllt oder abgelehnt wird.
-   **Fehlerbehandlung** erfolgt mit `try`/`catch`.

---

### 💻 Beispiel 1 – Promise mit `.then()` und `.catch()`:

```js
const fs = require("fs").promises;

fs.readFile("daten.txt", "utf8")
    .then((data) => {
        console.log("Dateiinhalt:", data);
    })
    .catch((err) => {
        console.error("Fehler beim Lesen:", err.message);
    });
```

---

### 💻 Beispiel 2 – Gleiche Logik mit `async/await`:

```js
const fs = require("fs").promises;

async function leseDatei() {
    try {
        const data = await fs.readFile("daten.txt", "utf8");
        console.log("Dateiinhalt:", data);
    } catch (err) {
        console.error("Fehler:", err.message);
    }
}

leseDatei();
```

---

### ✅ Vorteile von `async/await`:

-   Besser lesbar bei mehreren Operationen
-   Einfache Fehlerbehandlung
-   Vermeidet Callback-Hell
-   Logik wirkt wie **„normaler“ sequentieller Code**

---

## 🌐 **5. HTTP-Anfragen mit Axios**

### 📌 Wichtige Infos:

#### 🔸 Was ist Axios?

-   **Axios** ist eine beliebte, Promise-basierte HTTP-Client-Bibliothek für Node.js und den Browser.
-   Sie macht HTTP-Anfragen wie **GET**, **POST**, **PUT** oder **DELETE** einfach.
-   **Standardmäßig verarbeitet Axios JSON**, was ideal für APIs ist.

#### 🔸 Vorteile:

-   Arbeitet mit **Promises** → kombinierbar mit `async/await`
-   Automatisches Parsen von JSON
-   Einfaches **Fehlerhandling**
-   Unterstützt **Header, Query-Parameter, Zeitlimits**, usw.

---

### 💻 Beispiel 1 – GET-Anfrage mit Axios + `async/await`:

```js
const axios = require("axios");

async function holeWetter() {
    try {
        const res = await axios.get(
            "http://api.weatherapi.com/v1/current.json?key=DEMO&q=Berlin"
        );
        console.log("Temperatur in Berlin:", res.data.current.temp_c, "°C");
    } catch (err) {
        console.error("Fehler bei der Anfrage:", err.message);
    }
}

holeWetter();
```

---

### 💻 Beispiel 2 – POST-Anfrage mit Axios:

```js
const axios = require("axios");

async function sendeBenutzerdaten() {
    try {
        const benutzer = { name: "Anna", email: "anna@example.com" };
        const res = await axios.post(
            "https://example.com/api/benutzer",
            benutzer
        );
        console.log("Antwort vom Server:", res.data);
    } catch (err) {
        console.error("Fehler bei POST:", err.message);
    }
}

sendeBenutzerdaten();
```

---

## 🧾 **6. Arbeiten mit JSON in Node.js**

### 📌 Wichtige Infos:

#### 🔸 Was ist JSON?

-   **JSON** (JavaScript Object Notation) ist das **Standardformat** zum Austauschen von Daten über APIs.
-   Es basiert auf **Schlüssel-Wert-Paaren**, ist **leichtgewichtig** und **maschinen- wie menschenlesbar**.
-   JSON ist **nativ in JavaScript** integriert – ideal für Node.js.

#### 🔸 Zwei zentrale Methoden:

-   `JSON.parse()`
    → Wandelt einen **JSON-String** in ein JavaScript-Objekt um.
-   `JSON.stringify()`
    → Wandelt ein **JavaScript-Objekt** in einen JSON-String um.

#### 🔸 Verwendung:

-   Fast alle REST-APIs senden und empfangen **JSON**.
-   Auch für Dateioperationen, Konfigurationen und Datenbanken (z. B. MongoDB) üblich.

---

### 💻 Beispiel – JSON verarbeiten:

```js
// JSON-String empfangen (z. B. von API)
const jsonString = '{"firma":"IBM", "land":"USA"}';

// In JS-Objekt umwandeln
const obj = JSON.parse(jsonString);
console.log(obj.firma); // Ausgabe: IBM

// JS-Objekt erstellen
const neuesObjekt = {
    name: "Lisa",
    ort: "Berlin",
};

// In JSON-String umwandeln
const neuerJsonString = JSON.stringify(neuesObjekt);
console.log(neuerJsonString); // {"name":"Lisa","ort":"Berlin"}
```

---

## 👨‍💻 **7. Anonyme vs. benannte Callback-Funktionen**

### 📌 Wichtige Infos:

#### 🔸 Callback-Funktion:

-   Eine **Funktion**, die an eine andere Funktion **als Argument übergeben** wird und **später aufgerufen** wird.

#### 🔸 **Anonyme Callback-Funktion:**

-   Hat **keinen Namen**
-   Wird **direkt beim Aufruf definiert**
-   Gut für **kurze, einmalige Aufgaben**
-   Macht Code **kompakter**, aber schwerer wiederzuverwenden oder debuggen

#### 🔸 **Benannte Callback-Funktion:**

-   Hat einen **Namen**
-   Ist **wiederverwendbar**
-   Besser für **längere oder mehrfach verwendete** Logik
-   Debugging ist einfacher

---

### 💻 Beispiel – **Anonyme Callback-Funktion:**

```js
const fs = require("fs");

fs.readFile("info.txt", "utf8", function (err, data) {
    if (err) {
        console.error("Fehler:", err.message);
    } else {
        console.log("Dateiinhalt:", data);
    }
});
```

---

### 💻 Beispiel – **Benannte Callback-Funktion:**

```js
const fs = require("fs");

function dateiVerarbeiten(err, data) {
    if (err) {
        console.error("Fehler:", err.message);
    } else {
        console.log("Dateiinhalt:", data);
    }
}

fs.readFile("info.txt", "utf8", dateiVerarbeiten);
```

---

### 🧠 **Tabelle 1: Asynchrone Techniken (Kurz & Vergleich)**

| Technik                  | Zweck                             | Vorteile                               | Nachteile                               |
| ------------------------ | --------------------------------- | -------------------------------------- | --------------------------------------- |
| **Callback**             | Reaktion auf async Vorgänge       | Einfach, weit verbreitet               | Kann zu „Callback-Hell“ führen          |
| **Anonymer Callback**    | Inline-Logik für einmalige Zwecke | Kurz & übersichtlich bei kleiner Logik | Schwer debugbar, nicht wiederverwendbar |
| **Benannter Callback**   | Wiederverwendbare Funktion        | Klarer Code, Debugging möglich         | Etwas mehr Code                         |
| **Callback-Hell**        | Verschachtelte Callbacks          | /                                      | Unleserlicher, schwer wartbarer Code    |
| **Inversion of Control** | Fremdbestimmter Ablauf            | /                                      | Weniger Kontrolle, schweres Debugging   |
| **Promise**              | Alternative zu Callback           | Strukturierter, `.then()/.catch()`     | Kann bei Ketten unübersichtlich werden  |
| **async/await**          | Klarer Codefluss mit Promises     | Lesbar, wie synchron                   | Muss in `async`-Funktion stehen         |

---

### 🌐 **Tabelle 2: Tools & Datenformate**

| Thema                | Zweck                 | Vorteile                                    | Nachteile                    |
| -------------------- | --------------------- | ------------------------------------------- | ---------------------------- |
| **Axios**            | HTTP-Anfragen senden  | Einfach, JSON automatisch, async-freundlich | Externe Bibliothek nötig     |
| **JSON**             | Datenaustausch-Format | Leicht, lesbar, standardisiert              | Muss manuell geparst werden  |
| **JSON.parse()**     | String → JS-Objekt    | Ermöglicht Zugriff auf API-Daten            | Fehler bei ungültigem JSON   |
| **JSON.stringify()** | Objekt → JSON-String  | Macht Daten übertragbar                     | Nur einfache Objekte möglich |

---

### 📝 Empfehlung zur Nutzung

-   **Callback**: Für einfache Dinge – z. B. `fs.readFile()`
-   **Promise**: Wenn du strukturierter arbeiten willst
-   **async/await**: Für klaren, synchron wirkenden Ablauf
-   **Axios + JSON**: Bei HTTP-Anfragen an APIs fast immer

---
