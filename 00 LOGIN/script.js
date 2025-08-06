/*==============================
            config 
==============================*/
window.onload = function() {
    document.getElementById('loginNameInput').focus();
};
/* 
    
    2. E-Mail-Domänenprüfung
    3. Checkbox-Zustimmung
    4. Passwort-Match-Überprüfung
    5. Autovervollständigung für Telefonnummer
    6. Geburtsdatum-Validierung 
*/
/*==============================
            login
==============================*/
function login(event) {
    event.preventDefault();
    if (!passwordValid()) {
        console.log("Invalid password");
    }
}
function validateForm(event) {
    event.preventDefault(); // Verhindert das Absenden des Formulars

    const emailField = document.getElementById('registerEmail');
    const passwordField = document.getElementById('registerPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('felherMeldung');

    // Überprüfen, ob die E-Mail gültig ist
    if (!emailField.value.includes('@')) {
        errorMessage.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        errorMessage.style.color = 'red';
        return false;
    }

    // Überprüfen, ob die Passwörter übereinstimmen
    if (passwordField.value !== confirmPasswordField.value) {
        errorMessage.textContent = 'Die Passwörter stimmen nicht überein.';
        errorMessage.style.color = 'red';
        return false;
    }

    // Wenn alles gültig ist
    errorMessage.textContent = '';
    alert('Formular erfolgreich abgeschickt!');
    return true;
}
/*==============================
    Passwort gültigkeit überprufen
==============================*/
function passwordValid() {
    const loginPassword = document.getElementById('loginPassword');
    let pass = loginPassword.value;

    let Fehlermeldung = document.getElementById('felherMeldung');
    Fehlermeldung.classList.add('hidden');
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecialChar = /[!"§$%&/()=?<>{}[]|]/.test(pass);

    if (
        pass.length >= minLength &&
        hasLowerCase &&
        hasUpperCase &&
        hasNumber &&
        hasSpecialChar
    ) {
        return true;
    } else {
        Fehlermeldung.textContent =
            "Das Passwort muss mindestens 12 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.";
        Fehlermeldung.style.color = "red";
        Fehlermeldung.classList.remove('hidden');
        return false;
    }
}
/*==============================
        Passwortstärke-Anzeige
==============================*/
function checkPasswordStrength(){
    const password = document.getElementById('registerPassword').value;
    const passwordStrength  = document.getElementById('passwordStrength');
    let length = 0;

    if (/[A-Z]/.test(password)) length++;
    if (/[a-z]/.test(password)) length++;
    if (/[!"§$%&/()=?[\]{}*+\-^°<>|,.:_]/.test(password)) length++;
    if (/[0-9]/.test(password)) length++;

    switch (length){
        case 0:
            passwordStrength.textContent = '';
            break;
        case 1:
            passwordStrength.textContent = 'Schwach';
            passwordStrength.style.color = 'red';
            break;
        case 2:
        case 3:
            passwordStrength.textContent = 'Mittel';
            passwordStrength.style.color = 'orange';
            break;
        case 4:
            passwordStrength.textContent = 'Stark';
            passwordStrength.style.color = 'green';
        break;
    }
}

/*==============================
            registrieren 
==============================*/
document.getElementById('registierenLink').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('firstForm').classList.add('hidden');
    document.getElementById('secoundForm').classList.remove('hidden');
    document.getElementById('therdForm').classList.add('hidden');
});

/*==============================
        Passwort Vergessen 
==============================*/
document.getElementById('passwortVergessenLink').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('firstForm').classList.add('hidden');
    document.getElementById('therdForm').classList.remove('hidden');
    document.getElementById('secoundForm').classList.add('hidden');
});

/*==============================
        Start Seite 
==============================*/
function backHome(event){
    event.preventDefault();
    document.getElementById('firstForm').classList.remove('hidden');
    document.getElementById('therdForm').classList.add('hidden');
    document.getElementById('secoundForm').classList.add('hidden');
}