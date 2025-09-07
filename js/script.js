const All_Plants_URL = "https://openapi.programming-hero.com/api/plants";
const All_categories_URL = "https://openapi.programming-hero.com/api/categories";
const plants_by_categories_URL_1 = "https://openapi.programming-hero.com/api/category/${id}";
const plants_by_categories_URL_2 = "https://openapi.programming-hero.com/api/category/1";
const Plants_Detail_URL_1 = "https://openapi.programming-hero.com/api/plant/${id}";
const Plants_Detail_URL_2 = "https://openapi.programming-hero.com/api/plant/1";

const categoryList = document.getElementById("category-list");
const productList = document.getElementById("card-container");

async function loadAndDisplayCategories() {
    const res = await fetch(All_categories_URL);
    const data = await res.json();

    console.log("API Response:", data);

    if (data && data.categories) {
        const categories = data.categories;

        categories.forEach(category => {
            const li = document.createElement("li");
            li.textContent = category.category_name;
            li.click = function() {
                loadSelectivePlants(category.id);
            }
            categoryList.appendChild(li);
        });
    }
}

async function loadPlants() {
    const res = await fetch(All_Plants_URL);
    const data = await res.json();

    console.log("API Data:", data);

    if (data && data.plants) {
        const plants = data.plants;

        plants.forEach(plant => {
            const card = document.createElement("div");
            card.classList.add("p-4", "rounded-xl", "shadow-md", "bg-white");

            card.innerHTML = `
          <div class="card">
              <div class="image-container">
                  <img src="${plant.image}" alt="${plant.name}" />
              </div>
              <h3>${plant.name}</h3>
              <p>${plant.description}</p>
              <div class="card-type">
                  <div class="button-type-2">
                      <button>${plant.category}</button>
                  </div>
                  <div class="cost">
                      <h2>৳${plant.price}</h2>
                  </div>
              </div>
              <div class="button-type-3">
                  <button>Add to Cart</button>
              </div>
          </div>
        `;

            productList.appendChild(card);
        });
    } else {
        console.error("No plants array found in API response");
    }
}

async function loadSelectivePlants(id) {
    const res = await fetch(plants_by_categories_URL_2);
    const data = await res.json();

    console.log("API Data:", data);

    if (id === data.id) {
        if (data && data.plants) {
            const plants = data.plants;

            plants.forEach(plant => {
                const card = document.createElement("div");
                card.classList.add("p-4", "rounded-xl", "shadow-md", "bg-white");

                card.innerHTML = `
          <div class="card">
              <div class="image-container">
                  <img src="${plant.image}" alt="${plant.name}" />
              </div>
              <h3>${plant.name}</h3>
              <p>${plant.description}</p>
              <div class="card-type">
                  <div class="button-type-2">
                      <button>${plant.category}</button>
                  </div>
                  <div class="cost">
                      <h2>৳${plant.price}</h2>
                  </div>
              </div>
              <div class="button-type-3">
                  <button>Add to Cart</button>
              </div>
          </div>
        `;

                productList.appendChild(card);
            });
        } else {
            console.error("No plants array found in API response");
        }
    }
}


loadPlants();
loadAndDisplayCategories();