## 🔧 ARCHITEKTURSTILE – einfache Erklärung & Beispiel

| Stil                         | Beschreibung                                                                | Mini-Beispiel                                            | Wann nutzen                                                                      |
| ---------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **REST API**                 | Der Client fragt per HTTP (GET, POST etc.) Daten an.                        | `GET /users` → Liste von Nutzern                         | Wenn du **Daten per URL/HTTP** anbieten willst, z. B. für Mobile Apps, Webseiten |
| **MVC**                      | Aufteilung in **Model (Daten)**, **View (Anzeige)**, **Controller (Logik)** | Controller holt Daten → schickt an View (HTML oder JSON) | Wenn du **Webseiten mit UI** oder **komplexe Struktur** brauchst                 |
| **GraphQL**                  | Der Client bestimmt selbst, **welche Daten** er will                        | `query { user { name, email } }`                         | Wenn Frontend **flexibel und schnell** auf Daten zugreifen soll                  |
| **WebSocket (eventbasiert)** | Server & Client können **ständig Daten senden** (nicht nur bei Anfragen)    | Chat-App, Live-Updates                                   | Wenn du **Live-Kommunikation brauchst** (Chat, Spiele, Börsenkurse)              |

---

## 🔧 API-Vergleich REST vs GraphQL

| Merkmal        | REST                          | GraphQL                                    |
| -------------- | ----------------------------- | ------------------------------------------ |
| Anfragen       | Feste URLs (`/users/1`)       | Eine URL mit flexibler Abfrage             |
| Datenmenge     | Oft "zu viel" oder "zu wenig" | Genau das, was der Client will             |
| Einfachheit    | Einfach zu starten            | Etwas komplexer, aber flexibler            |
| Beste Wahl für | Klassische APIs               | Dynamische Frontends (React, Angular etc.) |

---

## 🧱 NODE FRAMEWORKS – kurz erklärt + Beispiel

| Framework   | Mini-Code-Beispiel      | Besonderheiten                             | Wann verwenden                               |
| ----------- | ----------------------- | ------------------------------------------ | -------------------------------------------- |
| **Express** | `app.get('/user', ...)` | Minimal, schnell, riesige Community        | Für **einfach bis mittelgroße REST-APIs**    |
| **Koa**     | `ctx.body = 'Hi'`       | Modern, kleiner, async/await von Anfang an | Für **Fortgeschrittene**, sauberen Code      |
| **NestJS**  | `@Get('/user')`         | TypeScript, Struktur, Dependency Injection | Für **Enterprise-Apps**, große Teams         |
| **HapiJS**  | `server.route(...)`     | Integrierte Validierung, Sicherheit        | Für **sichere APIs**, z. B. Firmenportale    |
| **Fastify** | `fastify.get(...)`      | Sehr schnell, JSON-optimiert               | Für **hohe Performance** bei vielen Anfragen |

---

## 🎯 Beispielvergleiche (in Node.js)

### 🧪 REST (Express)

```js
const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
    res.json({ message: "Hallo REST!" });
});

app.listen(3000);
```

### 🧪 MVC (Express – logisch getrennt)

```js
// controller.js
exports.sayHello = (req, res) => {
    res.send("Hallo von Controller!");
};

// server.js
const express = require("express");
const { sayHello } = require("./controller");
const app = express();

app.get("/", sayHello);
app.listen(3000);
```

### 🧪 GraphQL (mit express-graphql)

```js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query { hello: String }
`);
const root = { hello: () => "Hallo GraphQL!" };

const app = express();
app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));
app.listen(3000);
```

### 🧪 WebSocket (Socket.io)

```js
const io = require("socket.io")(3000);

io.on("connection", (socket) => {
    console.log("Benutzer verbunden");
    socket.emit("nachricht", "Hallo WebSocket!");
});
```

---

## 💡 Fazit – **Wann was?**

| Wenn du brauchst…                | Dann nimm…                    | Warum                                  |
| -------------------------------- | ----------------------------- | -------------------------------------- |
| Einfache API                     | **Express** + **REST**        | Schnell aufgebaut, leicht verständlich |
| Struktur + große App             | **NestJS** + **MVC**          | Für wartbare, saubere Projekte         |
| Viel Benutzerinteraktion         | **Socket.io** + **WebSocket** | Für Chat, Live-Updates, Spiele         |
| Flexibles Frontend (z. B. React) | **GraphQL**                   | Nur die Daten, die du brauchst         |

---
