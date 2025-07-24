const prompt = require("prompt-sync")();
const axios = require("axios");

const userID = prompt("Geben Sie die Benutzer-ID ein: ");

// Benutzerdaten holen
axios
    .get(`https://dummyjson.com/users/${userID}`)
    .then((userRes) => {
        const user = userRes.data;
        console.log(`${user.firstName} ${user.lastName} (ID: ${user.id})`);

        // Alle Carts holen und passenden suchen
        return axios.get("https://dummyjson.com/carts").then((cartRes) => {
            const carts = cartRes.data.carts;
            const cart = carts.find((c) => c.userId === Number(userID));

            if (!cart) {
                console.log("Kein Warenkorb gefunden.");
                return;
            }

            console.log(`Warenkorb-ID: ${cart.id}`);
            const produkt = cart.products[0];

            if (!produkt) {
                console.log("Warenkorb ist leer.");
                return;
            }

            console.log(`Produkt: ${produkt.title} – €${produkt.price}`);
        });
    })
    .catch((err) => {
        console.log("Fehler:", err.message);
    });
