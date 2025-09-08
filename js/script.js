const all_plants_URL = "https://openapi.programming-hero.com/api/plants";
const all_categories_URL = "https://openapi.programming-hero.com/api/categories";
const plants_by_categories_URL = "https://openapi.programming-hero.com/api/category/${id}";
const plants_detail_URL = "https://openapi.programming-hero.com/api/plant/${id}";

const closeButton = document.querySelector(".close-button");
const categoryList = document.getElementById("category-list");
const productList = document.getElementById("card-container");
const allTree = document.getElementById("all-tree");
const modal = document.getElementById("plant-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");

let cart = [];
let currentPlants = [];

loadPlants();
loadAndDisplayCategories();
updateCartDisplay();

allTree.addEventListener("click", () => {
    handleCategorySelection(allTree);
    productList.innerHTML = "";
    loadPlants();
});

productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const plantId = event.target.dataset.plantId;
        addToCart(plantId);
    } else if (event.target.closest(".card")) {
        const clickedCard = event.target.closest(".card");
        const plantId = clickedCard.dataset.plantId;
        loadPlantDetails(plantId);
    }
});

cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart-btn')) {
        const plantId = event.target.dataset.plantId;
        removeFromCart(plantId);
    }
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

async function loadAndDisplayCategories() {
    const res = await fetch(all_categories_URL);
    const data = await res.json();
    if (data && data.categories) {
        data.categories.forEach(category => {
            const li = document.createElement("li");
            li.textContent = category.category_name;
            li.classList.add("cursor-pointer");
            li.addEventListener("click", () => {
                handleCategorySelection(li);
                productList.innerHTML = "";
                loadSelectivePlants(`${category.id}`);
            });
            categoryList.appendChild(li);
        });
    }

}

async function loadPlants() {

    handleCategorySelection(allTree);
    const res = await fetch(all_plants_URL);
    const data = await res.json();
    if (data && data.plants) {
        currentPlants = data.plants;
        productList.innerHTML = "";
        currentPlants.forEach(plant => {
            const card = createPlantCard(plant);
            productList.appendChild(card);
        });
    }

}

async function loadSelectivePlants(id) {
    const res = await fetch(plants_by_categories_URL.replace("${id}", id));
    const data = await res.json();
    if (data && data.plants) {
        currentPlants = data.plants;
        productList.innerHTML = "";
        currentPlants.forEach(plant => {
            const card = createPlantCard(plant);
            productList.appendChild(card);
        });
    }
}

async function loadPlantDetails(id) {
    if (!id) {
        console.error("Invalid plant ID");
        return;
    }
    const res = await fetch(plants_detail_URL.replace("${id}", id));
    const data = await res.json();
    if (data && data.plants) {
        displayModal(data.plants);
    }
}

function handleCategorySelection(selectedLi) {
    const allCategoryItems = categoryList.querySelectorAll('li');
    allCategoryItems.forEach(li => {
        li.classList.remove('selected');
    });
    selectedLi.classList.add('selected');
}

function createPlantCard(plant) {
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("p-4", "rounded-xl", "shadow-md", "bg-white");

    cardWrapper.innerHTML = `
      <div class="card" data-plant-id="${plant.id}">
          <div class="image-container">
              <img src="${plant.image}" alt="${plant.name}" />
          </div>
          <h3>${plant.name}</h3>
          <p>${plant.description.substring(0, 80)}...</p>
          <div class="card-type">
              <div class="button-type-2">
                  <button>${plant.category}</button>
              </div>
              <div class="cost">
                  <h2>৳${plant.price}</h2>
              </div>
          </div>
          <div class="button-type-3">
              <button class="add-to-cart-btn" data-plant-id="${plant.id}">Add to Cart</button>
          </div>
      </div>
    `;
    return cardWrapper;
}

const displayModal = (plant) => {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}">
        <h2>${plant.name}</h2>
        <p>${plant.description}</p>
        <p><strong>Category:</strong> ${plant.category}</p>
        <div class="price">Price: ৳${plant.price}</div>
    `;
    modal.style.display = "flex";
};

function addToCart(plantId) {
    const plantToAdd = currentPlants.find(plant => plant.id == plantId);
    if (plantToAdd) {
        const existingItem = cart.find(item => item.id == plantId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({...plantToAdd, quantity: 1 });
        }
        updateCartDisplay();
        alert(`"${plantToAdd.name}" has been added to the cart.`);
    }
}

function removeFromCart(plantId) {
    const itemToRemove = cart.find(item => item.id == plantId);
    if (itemToRemove) {
        cart = cart.filter(item => item.id != plantId);
        updateCartDisplay();
        alert(`"${itemToRemove.name}" has been removed from the cart.`);
    }
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <div class="cart-item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">৳${item.price} × ${item.quantity}</p>
            </div>
            <button class="remove-from-cart-btn" data-plant-id="${item.id}">&times;</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotalContainer.innerHTML = `
        <span>Total:</span>
        <span>৳${total}</span>
    `;
}