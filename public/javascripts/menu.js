
//index for if fetch returns a list, containerName for where to append in page
const getAndDisplayDataSimpleOne = (index = 0, containerName = 'menu-item') => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(response => {
        var menuItem = {
            mealId: response.data.meals[index].idMeal,
            mealName: response.data.meals[index].strMeal,
            mealCategory: response.data.meals[index].strCategory,
            mealArea: response.data.meals[index].strArea,
            mealInstructions: response.data.meals[index].strInstructions,
            mealPic: response.data.meals[index].strMealThumb,
            mealYTLink: response.data.meals[index].strYoutube,
            mealIngredients:[[],[]]
        }

        //I hate this, but its safe and it works
        const menuIngredientAndMeasure = () => {
            menuItem.mealIngredients[0][0] = response.data.meals[index].strIngredient1
            menuItem.mealIngredients[0][1] = response.data.meals[index].strIngredient2
            menuItem.mealIngredients[0][2] = response.data.meals[index].strIngredient3
            menuItem.mealIngredients[0][3] = response.data.meals[index].strIngredient4
            menuItem.mealIngredients[0][4] = response.data.meals[index].strIngredient5
            menuItem.mealIngredients[0][5] = response.data.meals[index].strIngredient6
            menuItem.mealIngredients[0][6] = response.data.meals[index].strIngredient7
            menuItem.mealIngredients[0][7] = response.data.meals[index].strIngredient8
            menuItem.mealIngredients[0][8] = response.data.meals[index].strIngredient9
            menuItem.mealIngredients[0][9] = response.data.meals[index].strIngredient10
            menuItem.mealIngredients[0][10] = response.data.meals[index].strIngredient11
            menuItem.mealIngredients[0][11] = response.data.meals[index].strIngredient12
            menuItem.mealIngredients[0][12] = response.data.meals[index].strIngredient13
            menuItem.mealIngredients[0][13] = response.data.meals[index].strIngredient14
            menuItem.mealIngredients[0][14] = response.data.meals[index].strIngredient15
            menuItem.mealIngredients[0][15] = response.data.meals[index].strIngredient16
            menuItem.mealIngredients[0][16] = response.data.meals[index].strIngredient17
            menuItem.mealIngredients[0][17] = response.data.meals[index].strIngredient18
            menuItem.mealIngredients[0][18] = response.data.meals[index].strIngredient19
            menuItem.mealIngredients[0][19] = response.data.meals[index].strIngredient20
    
            menuItem.mealIngredients[1][0] = response.data.meals[index].strMeasure1
            menuItem.mealIngredients[1][1] = response.data.meals[index].strMeasure2
            menuItem.mealIngredients[1][2] = response.data.meals[index].strMeasure3
            menuItem.mealIngredients[1][3] = response.data.meals[index].strMeasure4
            menuItem.mealIngredients[1][4] = response.data.meals[index].strMeasure5
            menuItem.mealIngredients[1][5] = response.data.meals[index].strMeasure6
            menuItem.mealIngredients[1][6] = response.data.meals[index].strMeasure7
            menuItem.mealIngredients[1][7] = response.data.meals[index].strMeasure8
            menuItem.mealIngredients[1][8] = response.data.meals[index].strMeasure9
            menuItem.mealIngredients[1][9] = response.data.meals[index].strMeasure10
            menuItem.mealIngredients[1][10] = response.data.meals[index].strMeasure11
            menuItem.mealIngredients[1][11] = response.data.meals[index].strMeasure12
            menuItem.mealIngredients[1][12] = response.data.meals[index].strMeasure13
            menuItem.mealIngredients[1][13] = response.data.meals[index].strMeasure14
            menuItem.mealIngredients[1][14] = response.data.meals[index].strMeasure15
            menuItem.mealIngredients[1][15] = response.data.meals[index].strMeasure16
            menuItem.mealIngredients[1][16] = response.data.meals[index].strMeasure17
            menuItem.mealIngredients[1][17] = response.data.meals[index].strMeasure18
            menuItem.mealIngredients[1][18] = response.data.meals[index].strMeasure19
            menuItem.mealIngredients[1][19] = response.data.meals[index].strMeasure20
        }

        menuIngredientAndMeasure()

        const itemContainer = document.getElementsByClassName(containerName)
        const mealLink = document.createElement("a")
        mealLink.href = "/menu/" + menuItem.mealId
        
        const mealName = document.createElement("h1")
        mealName.textContent = menuItem.mealName;
        mealLink.appendChild(mealName)
        const mealPic = document.createElement("img")
        mealPic.src = menuItem.mealPic;
        mealLink.appendChild(mealPic)
        
        itemContainer[0].appendChild(mealLink)
    })
};

//fetches one item multiple times (for free version api)
const getAndDisplayDataMulti = (numOfItems = 4) => {
    for (var i = 0; i < numOfItems; i++){
        getAndDisplayDataSimpleOne();
    }
}

//add int to params to change amt of items, default 4
getAndDisplayDataMulti()