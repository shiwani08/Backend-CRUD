// public/app.js
const API_URL = "http://localhost:3000/api/products";

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, quantity }),
  });

  e.target.reset();
  loadProducts();
});

async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.name} - ₹${p.price} (${p.quantity})`;
    list.appendChild(li);
  });
}

loadProducts();
