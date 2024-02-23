let Searchbar = document.querySelector(".Searchbar");
let Searchbtn = document.querySelector(".Searchbtn");
let recipeContainer = document.querySelector(".recipe-container");
let recipedetailcontent = document.querySelector(".recipe-detail-content");
let closebutton = document.querySelector(".menu-closebtn");
let recipebox = document.querySelector(".recipe_box");
let headingmeals = document.querySelector(".heading_meals");

var typed = new Typed(".text_fur", {
    strings: ["CAKES. ", "SALAD. ", "CHEESE CAKE. ", "FISH. ", "WONTONS. ", "CORBA. ", "CHAKCHOUKA. ", "DUCK CONFIT. ", "CHELSEA BUNS. ", "TREACLE TART. ", "BEEF RENDANG. ", "SZECHUAN BEEF. ", "BEEF WELLINGTON. ", "AND  MORE DISHES...."],
    typeSpeed: 120,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})
/* <h2>Fetching Recipes...</h2> */
const fetchdataapi = async (ecceptdata) => {
    recipeContainer.innerHTML = `<div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`;
    try {
        let datafecth = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ecceptdata}`);
        let reponse = await datafecth.json();
        // console.log(reponse );
        recipeContainer.innerHTML = "";
        recipebox.innerHTML = "";
        headingmeals.innerHTML = "";
        reponse.meals.forEach(meals => {
            let resipediv = document.createElement('div');
            resipediv.classList.add('divadd');
            resipediv.innerHTML = `
            <img src="${meals.strMealThumb}">
           <h3 class"titleheading">${meals.strMeal}</h3>
           <h5><span>${meals.strArea} </span>Dish</h5>
           <h6>Belongs to <span>${meals.strCategory}</span></h6>
           `
            let button = document.createElement("button");
            button.textContent = "View Recipe";
            resipediv.appendChild(button);

            button.addEventListener('click', () => {
                openrecipemenu(meals);
            });
            recipeContainer.appendChild(resipediv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>This Recipe Does not Exist in the meals...</h2>";
    }
}

const fetchIngredient = (meals) => {
    let fIngredients = "";
    for (let i = 1; i <= 20; i++) {
        let Ingredient = meals[`strIngredient${i}`];
        if (Ingredient) {
            let measure = meals[`strMeasure${i}`];
            fIngredients += `<li>${measure} ${Ingredient}</li>`
        }
        else {
            break;
        }
    }
    return fIngredients;
}

const openrecipemenu = (meals) => {
    recipedetailcontent.innerHTML = `
    <h2 class="Recipename">${meals.strMeal}</h2>
    <h3 class="ingredientunderline">Ingredient: </h3>
    <ul class"Ingredientlist">${fetchIngredient(meals)}</ul>
    <div>
    <h3 class="ingredientunderline">Instructions: </h3>
    <p class"recipeinstructions">${meals.strInstructions}</p>
    </div>
    `
    recipedetailcontent.parentElement.style.display = "block";
}

closebutton.addEventListener('click', () => {
    recipedetailcontent.parentElement.style.display = "none";

});
Searchbtn.addEventListener('click', () => {
    recipeblock.style.display = "none"
})

Searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchinputwebpage = Searchbar.value.trim();
    recipebox.innerHTML = "";
    headingmeals.innerHTML = "";
    if (!Searchbar.value) {
        recipeContainer.innerHTML = "<h2>Type The Meals & Items Names in the Search Box....</h2>";
        return;
    }
    fetchdataapi(searchinputwebpage);
});
// nav sticky
$(window).on("scroll", () => {
    if ($(window).scrollTop()) {
        $("header").addClass("change_header");
    }
    else {
        $("header").removeClass("change_header");
    }
});