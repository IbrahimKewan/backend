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

async function login(event) {
    event.preventDefault();
    const name = document.getElementById("registerNameInput").value;
    const email = document.getElementById("registerEmail").value;
    const birthDay = document.getElementById("registerBirthDate").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const termsAccepted = document.getElementById("terms").checked;
    const felherMeldung = document.getElementById("felherMeldungReg");

    if (name.trim() === "" || !name.includes("@")) {
        felherMeldung.innerHTML = `geben Sie Ihre Email ein !!!`;
        return;
    }
    if (!termsAccepted) {
        felherMeldung.innerHTML = "AGB akzeptieren!";
        return;
    }
    if (password !== confirmPassword) {
        felherMeldung.innerHTML = "Passwörter stimmen nicht überein.";
        return;
    }
}
function vorgetPassword(event) {
    event.preventDefault();
}
