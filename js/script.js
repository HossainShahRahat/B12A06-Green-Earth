const all_plants_URL = "https://openapi.programming-hero.com/api/plants";
const all_categories_URL = "https://openapi.programming-hero.com/api/categories";
const plants_by_categories_URL = "https://openapi.programming-hero.com/api/category/";
const plants_detail_URL = "https://openapi.programming-hero.com/api/plant/";

const categoryList = document.getElementById("category-list");
const productList = document.getElementById("card-container");
const allTree = document.getElementById("all-tree");
const modal = document.getElementById("plant-modal");
const closeButton = document.querySelector(".close-button");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");

let cart = [];
let currentPlants = [];

function showContentLoader() {
    productList.innerHTML = `
        <div class="content-loader">
            <div class="spinner"></div>
        </div>
    `;
}


function loadAndDisplayCategories() {
    fetch(all_categories_URL)
        .then(res => res.json())
        .then(data => {
            if (data && data.categories) {
                data.categories.forEach(category => {
                    const li = document.createElement("li");
                    li.textContent = category.category_name;
                    li.dataset.categoryId = category.id;
                    categoryList.appendChild(li);
                });
            }
        })
        .catch(error => console.error("Failed to load categories:", error));
}

function fetchAndDisplayPlants(url) {
    showContentLoader();

    fetch(url)
        .then(res => res.json())
        .then(data => {
            currentPlants = data.plants || [];
            displayPlants(currentPlants);
        })
        .catch(error => {
            console.error("Failed to load plants:", error);
            productList.innerHTML = "<p>Sorry, we could not load the trees. Please try again.</p>";
        });
}

function loadPlantDetails(id) {
    if (!id) return;

    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<div class="spinner"></div>`;
    modal.style.display = "flex";

    fetch(plants_detail_URL + id)
        .then(res => res.json())
        .then(data => {
            if (data && data.plant) {
                displayModal(data.plant);
            }
        })
        .catch(error => {
            console.error("Failed to load plant details:", error);
            modalBody.innerHTML = "<p>Could not load plant details.</p>";
        });
}


function displayPlants(plants) {
    productList.innerHTML = "";
    if (plants.length === 0) {
        productList.innerHTML = "<p>No plants found in this category.</p>";
        return;
    }
    plants.forEach(plant => {
        const card = createPlantCard(plant);
        productList.appendChild(card);
    });
}

function createPlantCard(plant) {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "card";
    cardWrapper.dataset.plantId = plant.id;

    cardWrapper.innerHTML = `
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
};

function handleCategorySelection(selectedLi) {
    document.querySelectorAll('#category-list li').forEach(li => li.classList.remove('selected'));
    selectedLi.classList.add('selected');
}


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
        alert(`"${plantToAdd.name}" has been added`);
    }
}

function removeFromCart(plantId) {
    const itemToRemove = cart.find(item => item.id == plantId);
    if (itemToRemove) {
        cart = cart.filter(item => item.id != plantId);
        updateCartDisplay();
        alert(`"${itemToRemove.name}" has been removed`);
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


categoryList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const li = event.target;
        const categoryId = li.dataset.categoryId;
        if (categoryId) {
            handleCategorySelection(li);
            fetchAndDisplayPlants(plants_by_categories_URL + categoryId);
        }
    }
});

allTree.addEventListener("click", () => {
    handleCategorySelection(allTree);
    fetchAndDisplayPlants(all_plants_URL);
});

productList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("add-to-cart-btn")) {
        const plantId = target.dataset.plantId;
        addToCart(plantId);
    } else if (target.closest(".card")) {
        const plantId = target.closest(".card").dataset.plantId;
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

function initializeApp() {
    loadAndDisplayCategories();
    fetchAndDisplayPlants(all_plants_URL);
    updateCartDisplay();
    handleCategorySelection(allTree);
}

initializeApp();