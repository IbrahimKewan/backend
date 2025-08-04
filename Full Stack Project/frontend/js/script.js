const BASE_URL = "http://localhost:64125";
/*==============================
        Allgemeine Konfiguration
==============================*/
window.onload = function () {
    document.getElementById("loginNameInput").focus();
};

/*==============================
        Formular-Navigation
==============================*/
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
        document.getElementById("therdForm").classList.remove("hidden");
        document.getElementById("secoundForm").classList.add("hidden");
    });

function backHome(event) {
    event.preventDefault();
    document.getElementById("firstForm").classList.remove("hidden");
    document.getElementById("therdForm").classList.add("hidden");
    document.getElementById("secoundForm").classList.add("hidden");
}

/*==============================
        Login-Funktion
==============================*/
async function login(event) {
    event.preventDefault();

    const email = document.getElementById("loginNameInput").value;
    const password = document.getElementById("loginPassword").value;
    const fehlermeldung = document.getElementById("felherMeldung");

    try {
        const res = await fetch(`${BASE_URL}/teilnehmer/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await res.json();

        if (res.ok) {
            localStorage.setItem("token", result.token);
            alert("Login erfolgreich!");
            // window.location.href = "/dashboard.html";
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
}

/*==============================
    Registrierung absenden
==============================*/
document
    .querySelector("#secoundForm form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("registerNameInput").value;
        const email = document.getElementById("registerEmail").value;
        const birthDay = document.getElementById("registerBirthDate").value;
        const password = document.getElementById("registerPassword").value;
        const confirm = document.getElementById("confirmPassword").value;
        const termsAccepted = document.getElementById("terms").checked;
        const kurse = []; // Beispiel: später per Checkbox oder Auswahlfeld ergänzen

        const errorMessage = document.getElementById("felherMeldung");
        errorMessage.textContent = "";

        if (!email.includes("@")) {
            errorMessage.textContent = "Bitte gültige E-Mail eingeben.";
            errorMessage.style.color = "red";
            return;
        }

        if (!termsAccepted) {
            errorMessage.textContent = "Bitte Nutzungsbedingungen akzeptieren.";
            errorMessage.style.color = "red";
            return;
        }

        if (password !== confirm) {
            errorMessage.textContent = "Passwörter stimmen nicht überein.";
            errorMessage.style.color = "red";
            return;
        }

        const newUser = { name, email, birthDay, password, kurse };
        debugger;
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

/*==============================
    Passwort vergessen (Demo)
==============================*/
document
    .querySelector("#therdForm form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("forgotEmail").value;
        alert(`Wenn verfügbar, wird an ${email} ein Reset-Link gesendet.`);
        backHome(event);
    });

/*==============================
        Passwortstärke-Anzeige
==============================*/
function checkPasswordStrength() {
    const password = document.getElementById("registerPassword").value;
    const passwordStrength = document.getElementById("passwordStrength");
    let length = 0;

    if (/[A-Z]/.test(password)) length++;
    if (/[a-z]/.test(password)) length++;
    if (/[!"§$%&/()=?[\]{}*+\-^°<>|,.:_]/.test(password)) length++;
    if (/[0-9]/.test(password)) length++;

    switch (length) {
        case 0:
            passwordStrength.textContent = "";
            break;
        case 1:
            passwordStrength.textContent = "Schwach";
            passwordStrength.style.color = "red";
            break;
        case 2:
        case 3:
            passwordStrength.textContent = "Mittel";
            passwordStrength.style.color = "orange";
            break;
        case 4:
            passwordStrength.textContent = "Stark";
            passwordStrength.style.color = "green";
            break;
    }
}
async function register(event) {
    event.preventDefault();

    const name = document.getElementById("registerNameInput").value;
    const email = document.getElementById("registerEmail").value;
    const birthDay = document.getElementById("registerBirthDate").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const termsAccepted = document.getElementById("terms").checked;

    const fehlermeldung = document.getElementById("felherMeldung");

    if (!termsAccepted) {
        fehlermeldung.textContent =
            "Bitte akzeptieren Sie die Nutzungsbedingungen.";
        fehlermeldung.style.color = "red";
        return;
    }

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
                name,
                email,
                birthDay,
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
