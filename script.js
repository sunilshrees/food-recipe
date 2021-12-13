const searchBtn = document.querySelector('#search-btn');
const mealList = document.querySelector('#meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const searchInput = document.getElementById('search-input');
const overlay = document.querySelector('.overlay');

//get meal list that matches with the ingredients

const displayMeal = (data) => {
    let html = '';
    if (data.meals) {
        mealList.classList.remove('notFound');
        data.meals.forEach((meal) => {
            html += `

                    <div class="meal-item" data-id = "${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food" />
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                    </div>

            `;
        });
    } else {
        html += `Sorry, we didn't find any meal for your ingredient`;
        mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;
};

const displayRecipe = (meal) => {
    // console.log(data);
    meal = meal[0];
    // console.log(meal[0]);
    let html = `
                        <h2 class="recipe-title">${meal.strMeal}</h2>
                        <p class="recipe-category">${meal.strCategory}</p>
                        <div class="recipe-instruct">
                            <h3>Instructions</h3>
                            <p>
                                ${meal.strInstructions}
                            </p>
                        </div>
                        <div class="recipe-meal-img">
                            <img src="${meal.strMealThumb}" alt="" />
                        </div>
                        <div class="recipe-link">
                            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
    overlay.classList.add('show');
    console.log(overlay);
};

const getMealList = () => {
    let searchInputTxt = searchInput.value.trim();
    if (!searchInputTxt.length) return;
    fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
    ) // https:// is must
        .then((response) => response.json())
        .then((data) => displayMeal(data));

    searchInput.value = '';
};

const getMealRecipe = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
        )
            .then((response) => response.json())
            .then((data) => displayRecipe(data.meals));
    }
};

const closeModal = () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
    overlay.classList.remove('show');
};

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (
        e.key === 'Escape' &&
        mealDetailsContent.parentElement.classList.contains('showRecipe')
    ) {
        closeModal();
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchBtn.click();
    }
});
