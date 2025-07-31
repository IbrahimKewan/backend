## 🌐 Interaktive Übersicht: Wie alles im modernen Web zusammenhängt

### 🧩 Überblickskomponenten

**Frontend (Browser)**

-   HTML = Struktur (Gerüst)
-   CSS = Design (Farbe, Form)
-   JavaScript = Logik (Buttons, Klicks)
-   📦 Tools: React, Vue, Bootstrap

**Kommunikation zwischen Frontend & Backend**

-   📮 HTTP-Anfrage (Axios, Fetch)
-   🔐 Authentifizierung (JWT, Cookies)

**Backend (Server)**

-   🖥️ Node.js (JavaScript außerhalb des Browsers)
-   🍝 Express.js (Routing, Middleware, Endpunkte)
-   🔒 Authentifizierung (Sessions, JWT, Passwortlos)
-   📦 Tools: JWT, bcrypt, express-session

**APIs (Schnittstellen)**

-   REST: GET, POST, PUT, DELETE
-   GraphQL (optional): Client bestimmt, welche Daten er will
-   WebSocket: Echtzeit-Kommunikation (z. B. Chat)

**Datenbank**

-   MongoDB (NoSQL)
-   PostgreSQL, MySQL (SQL)
-   Tools: Mongoose, Sequelize, Prisma

**Paketmanager & Tools**

-   npm (Node.js)
-   pip (Python)
-   composer (PHP)
-   yarn (Alternative zu npm)

### 🔄 Datenfluss (Beispiel: Benutzer meldet sich an)

1. Nutzer gibt im Browser Name + Passwort ein
2. JS im Frontend sendet mit **Axios** POST-Anfrage an `/login`
3. Express-Server empfängt Anfrage → prüft Datenbank
4. Wenn gültig: Server gibt **JWT-Token** zurück
5. Browser speichert Token (z. B. im LocalStorage)
6. Bei späteren Anfragen: Token wird im Header mitgeschickt
7. Server prüft Token → gibt Daten zurück

### 🧠 Begriffe einfach erklärt

**Framework**

-   Ein "Baukasten" mit vorgefertigten Bauteilen, die dir helfen, schneller Anwendungen zu bauen.
-   Du musst nicht alles selbst programmieren, sondern passt das Framework an.
-   Beispiel: Express ist ein Framework für Webserver mit Node.js, Sencha ist ein Framework für Benutzeroberflächen.

**API (Application Programming Interface)**

-   Eine Schnittstelle (wie eine Speisekarte), über die zwei Programme (z. B. Frontend & Backend) miteinander reden.
-   Axios ist ein Werkzeug auf der Client-Seite, um über eine API Anfragen zu senden.
-   Express stellt als Framework API-Endpunkte bereit, also die Gegenseite für Anfragen.

**Middleware**

-   "Zwischenschicht" zwischen Anfrage und Antwort im Backend.
-   Sie verarbeitet Daten, bevor sie beim Server oder beim Client landen.
-   Beispiel: Eine Middleware prüft, ob der Benutzer eingeloggt ist, bevor er eine Seite sieht.

**JWT (JSON Web Token)**

-   Eine digitale "Zugangskarte" für geschützte Bereiche einer Webanwendung.
-   Der Server stellt beim Login ein signiertes Token aus, das der Client bei jeder Anfrage mitschickt.
-   Damit weiß der Server, wer der Nutzer ist – ohne Passwort erneut prüfen zu müssen.

### 🧠 Architektur-Entscheidungen

| Frage                         | Empfehlung                     |
| ----------------------------- | ------------------------------ |
| Kleine REST-API?              | Node.js + Express + MongoDB    |
| Viel Benutzer-UI?             | React + Express + REST         |
| Komplexe Business-Logik?      | NestJS oder Django             |
| Passwortloser Login?          | Express + E-Mail-Verifizierung |
| Live-Chat oder Multiplayer?   | Express + Socket.io            |
| Typisierung & Skalierbarkeit? | NestJS + TypeScript            |

### 🧰 Bibliotheken je nach Zweck

| Bereich                | Bibliothek                              |
| ---------------------- | --------------------------------------- |
| HTTP-Anfragen (Client) | Axios, Fetch                            |
| Server & Routing       | Express, Koa, Fastify                   |
| Authentifizierung      | Passport, jsonwebtoken, express-session |
| Datenbank (MongoDB)    | Mongoose                                |
| Datenbank (SQL)        | Sequelize, Prisma                       |
| Validierung            | Joi, express-validator                  |
| E-Mail-Versand         | Nodemailer                              |

### 🎯 Best Practices

-   Trenne **Frontend und Backend** sauber
-   Nutze **Umgebungsvariablen** (.env) für Schlüssel & URLs
-   Speichere Passwörter **verschlüsselt** (bcrypt)
-   Benutze **Statuscodes richtig** (200, 401, 404, 500)
-   Mach deine API **RESTful** – klar, logisch, konsistent

---
