const BASE_URL = "http://localhost:64125";
window.onload = function () {
    document.getElementById("loginNameInput").focus();
};

document
    .getElementById("registierenLink")
    .addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("firstForm").classList.add("hidden");
        document.getElementById("secoundForm").classList.remove("hidden");
        document.getElementById("therdForm").classList.add("hidden");
    });

document
    .getElementById("passwortVergessenLink")
    .addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("firstForm").classList.add("hidden");
        document.getElementById("secoundForm").classList.add("hidden");
        document.getElementById("therdForm").classList.remove("hidden");
    });

function backHome(event) {
    event.preventDefault();
    document.getElementById("firstForm").classList.remove("hidden");
    document.getElementById("secoundForm").classList.add("hidden");
    document.getElementById("therdForm").classList.add("hidden");
}

/*==============================
        Login-Funktion
==============================*/
async function login(event) {
    event.preventDefault();
    const email = document.getElementById("loginNameInput").value;
    const password = document.getElementById("loginPassword").value;
    const fehlermeldung = document.getElementById("felherMeldung");

    if (email.trim() === "") {
        fehlermeldung.innerHTML = `Geben Sie Ihre Anmeldename oder Email ein !!!`;
        fehlermeldung.style.color = "red";
        return;
    }
    if (password.trim() === "") {
        fehlermeldung.innerHTML = `Geben Sie Ihre passwort ein !!!`;
        fehlermeldung.style.color = "red";
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/teilnehmer/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const result = await res.json();
        if (res.ok) {
            localStorage.setItem("token", result.token);
            // localStorage.setItem("name", result.name);
            localStorage.setItem("name", result.email);
            console.log("Ihre Anmeldung war erfolgreich ");
            window.location.href = "../dashboard/index.html";
        } else {
            fehlermeldung.textContent =
                result.message || "Login fehlgeschlagen.";
            fehlermeldung.style.color = "red";
        }
    } catch (err) {
        console.error("Fehler beim Login", err);
        fehlermeldung.textContent = "Netzwerkfehler beim Login.";
        fehlermeldung.style.color = "red";
    }

    felherMeldung.innerHTML = "";
}

/*==============================
    Registrierung absenden
==============================*/
document
    .querySelector("#secoundForm form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirm = document.getElementById("confirmPassword").value;
        const kurse = [];

        const errorMessage = document.getElementById("felherMeldungRegis");
        errorMessage.innerHTML = "";

        if (!email.includes("@")) {
            errorMessage.textContent = "Bitte gültige E-Mail eingeben.";
            errorMessage.style.color = "red";
            return;
        }

        if (password !== confirm) {
            errorMessage.textContent = "Passwörter stimmen nicht überein.";
            errorMessage.style.color = "red";
            return;
        }
        const newUser = [email, password];
        try {
            const res = await fetch(`${BASE_URL}/teilnehmer/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            const result = await res.text();
            alert(result);
            backHome(event);
        } catch (err) {
            console.error("Fehler bei der Registrierung:", err);
            errorMessage.textContent = "Registrierung fehlgeschlagen.";
            errorMessage.style.color = "red";
        }
    });

async function register(event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const fehlermeldung = document.getElementById("felherMeldungRegis");

    if (password !== confirmPassword) {
        fehlermeldung.textContent = "Passwörter stimmen nicht überein.";
        fehlermeldung.style.color = "red";
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/teilnehmer/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                kurse: [], // oder beliebige default-Werte
            }),
        });

        const result = await res.json();

        if (res.ok) {
            alert("Registrierung erfolgreich!");
            backHome(event); // Zurück zum Login
        } else {
            fehlermeldung.textContent =
                result.message || "Fehler bei der Registrierung.";
            fehlermeldung.style.color = "red";
        }
    } catch (err) {
        console.error("Fehler bei der Registrierung:", err);
        fehlermeldung.textContent = "Netzwerkfehler.";
        fehlermeldung.style.color = "red";
    }
}

function checkPasswordStrength() {
    const password = document.getElementById("registerPassword").value;
    const passwordStrength = document.getElementById("passwordStrength");
    let length = 0;

    // Test@@KK!"§"123
    if (password.length >= 8) length++;
    if (/[A-Z]/.test(password)) length++;
    if (/[a-z]/.test(password)) length++;
    if (/[!"§$%&/()=?[\]{}*+\-^°<>|,.:_]/.test(password)) length++;
    if (/[0-9]/.test(password)) length++;

    switch (length) {
        case 0:
            passwordStrength.innerHTML = "";
            break;
        case 1:
            passwordStrength.innerHTML = "Schwach";
            passwordStrength.style.color = "red";
            break;
        case 2:
        case 3:
        case 4:
            passwordStrength.innerHTML = "Mittel";
            passwordStrength.style.color = "orange";
            break;
        case 5:
            passwordStrength.innerHTML = "Stark";
            passwordStrength.style.color = "green";
            break;
    }
}
