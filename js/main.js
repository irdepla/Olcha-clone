

const sliderWrapper = document.querySelector(".slider-wrapper");
const sliderCards = document.querySelector(".slider-cards");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentScroll = 0;
let isDragging = false;
let startX, currentX;

const cloneFirst = sliderCards.firstElementChild.cloneNode(true);
const cloneLast = sliderCards.lastElementChild.cloneNode(true);
sliderCards.appendChild(cloneFirst);
sliderCards.insertBefore(cloneLast, sliderCards.firstElementChild);

currentScroll = -sliderCards.children[1].offsetWidth;
sliderCards.style.transform = `translateX(${currentScroll}px)`;

nextButton.addEventListener("click", () => {
  slide(-1);
});

prevButton.addEventListener("click", () => {
  slide(1);
});

function slide(direction) {
  const cardWidth = sliderCards.children[1].offsetWidth;
  currentScroll += direction * cardWidth;

  sliderCards.style.transition = "transform 0.3s ease";
  sliderCards.style.transform = `translateX(${currentScroll}px)`;

  setTimeout(() => {
    if (currentScroll <= -cardWidth * (sliderCards.children.length - 1)) {
      currentScroll = -cardWidth;
      sliderCards.style.transition = "none";
      sliderCards.style.transform = `translateX(${currentScroll}px)`;
    } else if (currentScroll >= 0) {
      currentScroll = -cardWidth * (sliderCards.children.length - 2);
      sliderCards.style.transition = "none";
      sliderCards.style.transform = `translateX(${currentScroll}px)`;
    }
  }, 300);
}

sliderWrapper.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  sliderCards.style.cursor = "grabbing";
  sliderCards.style.transition = "none";
});

sliderWrapper.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  sliderCards.style.transform = `translateX(${currentScroll + dx}px)`;
});

sliderWrapper.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  sliderCards.style.cursor = "grab";

  const cardWidth = sliderCards.children[1].offsetWidth;
  const dx = e.clientX - startX;

  if (dx > 50) slide(1);
  else if (dx < -50) slide(-1);
  else sliderCards.style.transform = `translateX(${currentScroll}px)`;
});

sliderWrapper.addEventListener("mouseleave", () => {
  if (!isDragging) return;
  isDragging = false;
  sliderCards.style.cursor = "grab";
  sliderCards.style.transform = `translateX(${currentScroll}px)`;
});

let products;

async function start() {
  const res = await fetch("http://localhost:5000/products");
  const body = await res.json();

  products = body.data;

  console.log(products);

  const productWrapper = document.querySelector(".product__wrapper");

  products.forEach((item, index) => {
    const newElement = document.createElement("div");

    newElement.classList.add("card");

    newElement.innerHTML = `
<h3> <a href="/product-details.html?id=${item.id}"> ${item.name} </a> </h3>
<img
src="${item.image}"
alt=""
/>

<button data-id=${item.id} onclick="addK(event)" class="add-to-cart__btn">
<i class="fa-solid fa-cart-shopping"></i>
</button>


<button data-id=${item.id} onclick="deleteK(event)"> O'chirish</button>
`;
    productWrapper.appendChild(newElement);
  });
}

start();

function addK(event) {
  console.log("bosildi");
  const id = event.target.dataset.id;
  const product = products.find((item) => item.id == id);

  console.log(id, product);

  const productsK = JSON.parse(localStorage.getItem("productsK")) || [];

  console.log(productsK);

  if (productsK.find((item) => item.id === product.id)) {
    alert("Allaqachon qo'shilgan");
  } else {
    productsK.push(product);
    localStorage.setItem("productsK", JSON.stringify(productsK));
  }
}

function deleteK(event) {
  console.log("bosildi");
  const id = event.target.dataset.id;
  fetch("http://localhost:5000/products/" + id, {
    method: "delete",
  }).then(() => {
    console.log("O'chirildi");
  });
}


