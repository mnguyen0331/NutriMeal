function showPassWord() {
    let userPassWord = document.getElementById("userPassWord");
    if (userPassWord.type === "password") {
        userPassWord.type = "text";
    } else {
        userPassWord.type = "password";
    }
}

/* Validation code example. May use later

const userEmail = document.querySelector('#userEmail');
const userPassWord = document.querySelector('#userPassWord')
const emailError = document.querySelector('#email-error')
const passwordError = document.querySelector('#password-error')
const loginBox = document.querySelector('#lower-login');



loginBox.addEventListener('submit', validateInput);



function validateInput() {
    if (userEmail.value === '' && userPassWord.value === '') {
        emailError.style.display = "block";
        passwordError.style.display = "block";
        setTimeout(() => emailError.remove(), 3000);
        setTimeout(() => passwordError.remove(), 3000);
        return false;
    }
    else if (userPassWord.value === '') {
        passwordError.style.display = "block";
        setTimeout(() => passwordError.remove(), 3000);
        return false;
    }
    else if (userEmail.value === '') {
        emailError.style.display = "block";
        setTimeout(() => emailError.remove(), 3000);
        return false;
    }

    else return true;
    
}
*/



