const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Filter the menu cards by category.
const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const selectedCategory = button.dataset.filter;
    foodCards.forEach((card) => {
      card.hidden = selectedCategory !== "all" && card.dataset.category !== selectedCategory;
    });
  });
});

// Demo order list: add dishes, remove them, and calculate the total.
const orderItemsContainer = document.querySelector("#order-items");
const orderTotal = document.querySelector("#order-total");
const cartCount = document.querySelector("#cart-count");
const orderMessage = document.querySelector("#order-message");
const placeOrderButton = document.querySelector("#place-order");
const order = [];

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    order.push({ name: button.dataset.name, price: Number(button.dataset.price) });
    orderMessage.textContent = "";
    renderOrder();
    document.querySelector("#order").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

function renderOrder() {
  orderItemsContainer.innerHTML = "";
  if (order.length === 0) {
    orderItemsContainer.innerHTML = '<p class="empty-order">Your order is empty for now. Add something delicious above!</p>';
  } else {
    order.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "order-item";
      const name = document.createElement("span");
      name.textContent = item.name;
      const priceArea = document.createElement("span");
      const price = document.createElement("strong");
      price.textContent = `EGP ${item.price}`;
      const removeButton = document.createElement("button");
      removeButton.className = "remove-item";
      removeButton.textContent = "Remove";
      removeButton.setAttribute("aria-label", `Remove ${item.name}`);
      removeButton.addEventListener("click", () => {
        order.splice(index, 1);
        orderMessage.textContent = "";
        renderOrder();
      });
      priceArea.append(price, removeButton);
      row.append(name, priceArea);
      orderItemsContainer.appendChild(row);
    });
  }
  const total = order.reduce((sum, item) => sum + item.price, 0);
  orderTotal.textContent = `EGP ${total}`;
  cartCount.textContent = `${order.length} ${order.length === 1 ? "item" : "items"}`;
}

placeOrderButton.addEventListener("click", () => {
  if (order.length === 0) {
    orderMessage.textContent = "Add at least one dish before reviewing your order.";
    return;
  }
  const total = order.reduce((sum, item) => sum + item.price, 0);
  orderMessage.textContent = `Your demo order has ${order.length} item(s), total EGP ${total}. No real order was sent.`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
