# 📦 **Teil 1 – Produktverwaltung mit CRUD + Suchfunktion**

## 📁 Zielstruktur

```
produkt-api/
├── index.js
├── package.json
└── routes/
    └── products.js
```

---

## 📌 Aufgaben Schritt für Schritt

### 🛠 Setup

1. Projektordner `produkt-api/` erstellen
2. Projekt initialisieren: `npm init -y`
3. Express installieren: `npm install express`
4. Erstelle die Datei `index.js`
5. Lege den Ordner `routes/` an und darin `products.js`

---

### 📄 `index.js` Aufgaben

6. Express-App erstellen
7. JSON-Body-Parsing mit `express.json()` aktivieren
8. Importiere das Router-Modul `products.js`
9. Registriere es unter `/products`
10. Erstelle eine Startseite `/`, die `"Produkt-API läuft"` zurückgibt
11. Starte den Server auf Port `4000`

---

### 📄 `routes/products.js` Aufgaben

12. Lege ein Array `products` an mit Beispielprodukten, z. B.:

```js
{ id: 1, name: 'Tastatur', price: 29.99 }
```

13. Exportiere einen Router

### 🔁 Erstelle folgende Routen:

| Methode | Pfad            | Aufgabe                              |
| ------- | --------------- | ------------------------------------ |
| GET     | `/`             | Alle Produkte anzeigen               |
| GET     | `/:id`          | Einzelnes Produkt nach ID anzeigen   |
| POST    | `/`             | Neues Produkt hinzufügen             |
| PUT     | `/:id`          | Produkt mit ID bearbeiten            |
| DELETE  | `/:id`          | Produkt löschen                      |
| GET     | `/search/:name` | Produkte mit bestimmtem Namen suchen |

---

## 🧠 Bonus (Optional)

-   Validierung: Prüfe, ob Name & Preis übergeben wurden
-   Bei POST: Verhindere doppelte Produktnamen
-   Gib bei Fehlern passende HTTP-Statuscodes zurück

---
