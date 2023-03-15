const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// Event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipes);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// Get meal list that matches with the ingredients list
function getMealList() {
  let searchInputText = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-container" data-id="${meal.idMeal}">
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                </div>
                <div class="meal-image">
                    <img src="${meal.strMealThumb}" alt="" />
                </div>
                <a href="" class="recipe-btn">Get Recipe</a>
            </div>
        `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we couldn't find your main recipe";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    })
    .catch((err) => console.log(err));
}

// get recipe of the meal
function getMealRecipes(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement;
    let mealId = mealItem.dataset.id;
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        mealRecipeModal(data.meals);
      })
      .catch((err) => console.log(err));
  }
}
function mealRecipeModal(meal) {
  // console.log(meal);
  meal = meal[0];
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:  </h3>
        <p>
            ${meal.strInstructions}
        </p>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="img" />
        </div>
        <div class="recipe-link">
            <a
                href="${meal.strYoutube}"
                target="_blank
            "
                >Video</a
            >
        </div>
    </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
