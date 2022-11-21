const profileForm = document.querySelector('#profile-form');
const allergensArray = profileForm.allergens
const arrayLength = allergensArray.length
const otherAllergens = document.querySelector('#otherAllergens')
function displayOtherInput(other) {
    otherAllergens.style.display = other.checked ? "block" : "none"
}

// Store allergies checkboxes into arrays
profileForm.addEventListener('submit', (e) => {
    const answer = allergiesAnswer.value
    let allergensInput = []
    // Store checkboxes to array
    if (answer === 'yes') {
        for (let i = 0; i < arrayLength; i++) {
            if (allergensArray[i].checked) {
                if (allergensArray[i].value !== 'other')
                    allergensInput.push(allergensArray[i].value)
                else {
                    otherAllergens.value.split(",").forEach(element => {
                        allergensInput.push(element.trim())
                    });             
                }      
            }
        }
        if (allergensInput.length === 0) {
            alert('Please check applicable allergens')
            e.preventDefault()
        }
    }
    // Send array together with form elements
    const hiddenInput = document.createElement('input')
    hiddenInput.type = 'hidden'
    hiddenInput.name = 'allergensInput'
    hiddenInput.value = JSON.stringify(allergensInput)
    profileForm.appendChild(hiddenInput)
});