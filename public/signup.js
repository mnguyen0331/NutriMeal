const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

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
const space = document.querySelector('#space');

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
    const specials = /[!,@,#,$,%,&,_]/g; // Not numeric and not letters
    if(password.value.match(specials)) {
        special.classList.remove("invalid");
        special.classList.add("valid");
    }
    else {
        special.classList.remove("valid");
        special.classList.add("invalid");
    }

    // No space allowed
    const spaces = /\s/g;
    if(password.value.match(spaces)) {
        space.classList.remove("valid");
        space.classList.add("invalid"); 
    }
    else {
        space.classList.remove("invalid");
        space.classList.add("valid");
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

// Display allergies selection if user select yes
const allergiesAnswer = document.querySelector('#allergies-answer');
const allergiesSelection = document.querySelector('#food-allergy-selection');

const displayWhenSelected = (source, value, target) => {
    const selectedIndex = source.selectedIndex;
    console.log(selectedIndex);
    const isSelected = source[selectedIndex].value === value;
    target.classList[isSelected
        ? "add"
        : "remove"
    ]("show");
};

allergiesAnswer.addEventListener("change", (evt) =>
    displayWhenSelected(allergiesAnswer, "yes", allergiesSelection)
);
