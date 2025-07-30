const fs = require("fs").promises;
const axios = require("axios");

async function readCsvFile() {
    try {
        const res = await fs.readFile("products.csv", "utf-8");
        const lines = res.trim().split("\n");
        const header = lines[0].split(",");
        const products = lines.slice(1).map((line) => {
            const values = line.split(",");
            const obj = {};
            header.forEach((key, index) => {
                obj[key.trim()] = values[index].trim();
            });
            return obj;
        });
        return products;
    } catch (err) {
        console.log("Fehler beim lesen von datei" + err);
    }
}

// produkte mit gültigen preis filtern
function filterProduct(obj) {
    return obj.filter((item) => item.price > 0);
}

async function main() {
    const data = await readCsvFile();
    const filteredData = filterProduct(data);
    filteredData.forEach((x) => {
        console.log(`${x.name} - €${x.price}`);
    });
    try {
        await axios.post("https://ibrahimkewan.de", filteredData);
    } catch (err) {
        console.log("kann nicht posten " + err);
    }
}
main();
