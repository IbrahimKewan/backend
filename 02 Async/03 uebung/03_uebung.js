// #########################################################
// const fs = require("fs").promises;

// let readTxtFile = new Promise((resolve, reject) => {
//     fs.readFile("info.txt", "utf8", (err, data) => {
//         if (err) {
//             reject(err);
//         }
//         resolve("Die daten sind: "+ data);
//     });
// });

// readTxtFile
//     .then((text) => {
//         console.log(text);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

// #########################################################
// const prompt = require("prompt-sync")();
// const axios = require("axios");

// let input = prompt("geben Sie die stadt ein: ");

// async function getWeather(city) {
//     try {
//         const apiKey = "92336d91897e0b9a2463b16da539fced";
//         const res = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`
//         );
//         const wetter = res.data.weather[0];
//         const iconCode = wetter.icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
//         console.log(`Temp: ${res.data.main.temp} ${iconUrl}`);
//     } catch (err) {
//         console.error("Fehler bei Anfrage: ", err.message);
//     }
// }
// getWeather(input);

// #########################################################
// const fs = require("fs").promises;
// const axios = require("axios");
// const prompt = require("prompt-sync")();

// let input = prompt("Geben Sie Ihre staat: ");

// async function writeApp(city) {
//     try {
//         const apiKey = "92336d91897e0b9a2463b16da539fced";
//         const res = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`
//         );
//         const data = res.data;
//         const weather = data.weather[0];
//         const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

//         const output = `
//         // Automatisch generiert
//         console.log('######################################################');
//         console.log('Die eingegebene Stadt: ${city}');
//         console.log('Temperatur: ${data.main.temp} °C');
//         console.log('Wetter: ${weather.description}');
//         console.log('Icon: ${iconUrl}');
//         console.log('######################################################');
//         `;
//         await fs.writeFile("app.js", output);
//         console.log("Daten würden erfolgreich geschrieben");
//     } catch (err) {
//         console.log("API Key ist falsch" + err);
//     }
// }

// async function readApp() {
//     try {
//         const data = await fs.readFile("app.js", "utf-8");
//         console.log(data);
//     } catch (err) {
//         console.log("Fehler beim lesen von daten... " + err);
//     }
// }

// (async () => {
//     await writeApp(input);
//     await readApp();
// })();
// #########################################################
// const fs = require("fs").promises;
// const axios = require("axios");
// const prompt = require("prompt-sync")();

// const input = prompt("Geben Sie ihre name: ");

// let found = false;
// // write prfile.js
// async function writeProfile(person) {
//     try {
//         const res = await axios.get(
//             `https://jsonplaceholder.typicode.com/users?username=${person}`
//         );
//         if (res.data.length === 0) {
//             console.log("Person nicht gefunden ...");
//             return;
//         }
//         found = true;
//         const output = res.data[0];
//         const inhalt = `
//             //*******************************************
//             *\tID: ${output.id}
//             *\tusername: ${output.username}
//             *\temail: ${output.email}
//             *\tAdresse: ${output.address.city}
//             //*******************************************
//         `;
//         await fs.writeFile("prfile.js", inhalt, "utf-8");
//         console.log("Datei würde erfolgreich geschrieben ... ");
//     } catch (err) {
//         console.log("Fehler beim datei schreiben: " + err);
//     }
// }

// // read data from profile.js
// async function readProfile() {
//     try {
//         const data = await fs.readFile("prfile.js", "utf-8");
//         console.log(data);
//     } catch (err) {
//         console.log("Daten könnten nicht gelesen werden " + err);
//     }
// }

// (async () => {
//     await writeProfile(input);
//     if (found) await readProfile();
// })();
// #########################################################
// Benutzer gibt eine User-ID ein (z. B. 1, 2, 3)

// Du sendest eine Anfrage an:
// 👉 https://jsonplaceholder.typicode.com/todos?userId=1

// Du bekommst eine Liste von Aufgaben im JSON-Format

// Speichere nur die ersten 5 Aufgaben des Benutzers in todos.js als JavaScript-Ausgabe wie:

// js
// Kopieren
// Bearbeiten
// console.log("Aufgabe: delectus aut autem – offen");
// console.log("Aufgabe: quis ut nam facilis – abgeschlossen");
// ...
// Danach liest du die Datei todos.js und gibst den Inhalt in der Konsole aus.
const fs = require("fs").promises;
const prompt = require("prompt-sync")();
const axios = require("axios");
const { exec } = require("child_process");

let input = prompt("Geben Sie ein Nummer ein: ");

// Read Json from link then WriteFile
async function readApi(input) {
    try {
        const res = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?userId=${input}`,
            "utf-8"
        );
        // nur die erste 5 auftrage
        return res.data.slice(0, 5);
    } catch (err) {
        console.log("Fehler beim lesen von datei" + err);
    }
}

// Write File from APi in .js
async function writeFileJS(arr) {
    try {
        let content =
            "//*************************** TODO List *******************\n";
        arr.forEach((elem, index) => {
            const status = elem.completed ? "abgeschloßen" : "offen";
            content += `console.log("Aufgabe ${index + 1}: ${
                elem.title
            } - ${status}");\n`;
        });
        content +=
            "//**********************************************************\n";
        await fs.writeFile("userID.js", content, "utf-8");
        console.log("Datei wurde erfolgreich geschrieben");
    } catch (err) {
        console.log("Datei kann nicht schrieben werden " + err);
    }
}

// read js file
async function readJsFile() {
    try {
        const output = await fs.readFile("userID.js", "utf-8");
        console.log("Datei wurde gelesen !!!");
        return output;
    } catch (err) {
        console.log("JS Datei könnte nicht gelesen werden !!!" + err);
    }
}
// ######################################################### MAIN
async function main() {
    const arrFromApi = await readApi(input);
    await writeFileJS(arrFromApi);
    const output = await readJsFile();
    exec("node userId.js", (err, stdout, stderr) => {
        if (err) return console.error("Fehler beim Ausführen: " + err);
        console.log("\nAusgabe der Datei: \n");
        console.log(stdout);
    });
}
main();
