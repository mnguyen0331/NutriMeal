const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

console.log(togglePassword);
console.log(password);

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type',type);
    this.classList.toggle('bi-eye');
});

const number = document.querySelector('#number');
const lower = document.querySelector('#lower');
const upper = document.querySelector('#upper');
const special = document.querySelector('#special');
const length = document.querySelector('#length');

// Display password requirements when user click on password field
password.onfocus = function() {
    document.querySelector('#password-requirements').style.display = 'block';
}

// Hide password requirement when user click outside of password field
password.onblur = function() {
    document.querySelector('#password-requirements').style.display = 'none';
}

// When user starts to type in password field
password.onkeyup = function() {
    // Validate number
    const numbers = /[0-9]/g;
    if(password.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    }
    else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate lowercase letter
    const lowers = /[a-z]/g;
    if(password.value.match(lowers)) {
        lower.classList.remove("invalid");
        lower.classList.add("valid");
    }
    else {
        lower.classList.remove("valid");
        lower.classList.add("invalid");
    }

    // Validate uppercase letter
    const uppers = /[A-Z]/g;
    if(password.value.match(uppers)) {
        upper.classList.remove("invalid");
        upper.classList.add("valid");
    }
    else {
        upper.classList.remove("valid");
        upper.classList.add("invalid");
    }

    // Validate special char
    const specials = /[@,#,$]/g;
    if(password.value.match(specials)) {
        special.classList.remove("invalid");
        special.classList.add("valid");
    }
    else {
        special.classList.remove("valid");
        special.classList.add("invalid");
    }

    // Validate length
    if(password.value.length >= 9) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    }
    else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}