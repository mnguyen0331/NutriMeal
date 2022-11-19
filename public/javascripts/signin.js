function showPassWord() {
    let userPassWord = document.getElementById("userPassWord");
    console.log(userPassWord);
    if (userPassWord.type === "password") {
        userPassWord.type = "text";
    } else {
        userPassWord.type = "password";
    }
}

const signInForm = document.querySelector('#signin-form')





