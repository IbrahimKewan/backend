**🎯 Projektidee: Online-Film-Bewertungsplattform (Movie Review API)**
**Ziel:** Erstelle einen RESTful Webservice mit Node.js & Express, der Film-Informationen und Bewertungen verwaltet.

**Funktionen:**

-   **Öffentlich:**

    1. Alle verfügbaren Filme abrufen
    2. Nach Filmen suchen (ID, Titel, Genre, Regisseur)
    3. Bewertungen für einen bestimmten Film abrufen

-   **Registrierung & Login:**
    4\. Neuen Benutzer anlegen
    5\. Login mit JWT oder Session-Auth
-   **Nur für eingeloggte User:**
    6\. Neue Film-Bewertung hinzufügen
    7\. Eigene Bewertung bearbeiten
    8\. Eigene Bewertung löschen
-   **Technisch:**

    -   CRUD-Endpunkte in Express
    -   Datenhaltung (z. B. in einer JSON-Datei oder MongoDB)
    -   Async/Await & Promises nutzen
    -   GET-, POST-, PUT-, DELETE-Routen testen mit Postman

**Bonus:**

-   Pagination für große Filmlisten
-   Middleware für Logging & Fehlerbehandlung
-   Likes/Dislikes für Bewertungen

---
