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
const prompt = require("prompt-sync")();
const axios = require("axios");
const fs = require("fs").promises;

let input = prompt("Geben Sie die Stadt ein: ");

async function setAppJs(city) {
    try {
        const apiKey = "92336d91897e0b9a2463b16da539fced";
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`
        );
        const apiData = res.data;
        const wetter = apiData.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${wetter.icon}@2x.png`;

        const inhalt = `
            //Wetterstation nach Ihre Wahl
            console.log('Stadt: ${city}');
            console.log('Temperatur: ${apiData.main.temp} - ${iconUrl}');
        `;
        await fs.writeFile("app.js", inhalt, "utf-8");
    } catch (err) {
        console.log("Fehler beim: " + err.message);
    }
}

async function getWeather() {
    try {
        const data = await fs.readFile("app.js", "utf-8");
        console.log(data);
    } catch (err) {
        console.log(err.massege);
    }
}

(async () => {
    await setAppJs(input);
    await getWeather();
})();
