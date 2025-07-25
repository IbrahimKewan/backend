const fs = require("fs").promises;
const axios = require("axios");

async function readContactsCsv() {
    try {
        const data = await fs.readFile("contacts.csv", "utf-8");
        const lines = data.trim().split("\n");
        const header = lines[0].trim().split(";");
        const contacts = lines.slice(1).map((line) => {
            const values = line.split(";");
            const obj = {};
            header.forEach((key, index) => {
                obj[key.trim()] = values[index].trim();
            });
            return obj;
        });
        return contacts;
    } catch (err) {
        console.log("Fehler beim Lesen der Datei:", err.message);
    }
}

// Nur gültige Mail behalten
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// MAIN
async function main() {
    const contacts = await readContactsCsv();
    const validContact = contacts.filter((c) => isValidEmail(c.email));
    console.log(`${validContact.length} gültige Kontakte gefunden`);
    for (const contact of validContact) {
        try {
            await axios.post("https://google.com", contact);
        } catch (err) {
            console.log("daten könnten nicht gesendet werden " + err);
        }
    }
}
main();
