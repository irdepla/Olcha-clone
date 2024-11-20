const GET_PRODUCT_BY_ID = "http://localhost:5000/products/";
const productName = document.querySelector(".product_name");
const productImg = document.querySelector(".product__img");
const productPrice = document.querySelector(".product__price");
const productDescription = document.querySelector(".product__desc");

const productId = new URLSearchParams(window.location.search).get("id");

console.log(productId);

fetchProductById(productId);

async function fetchProductById(id) {
const res = await fetch(GET_PRODUCT_BY_ID + id);
const body = await res. json();

const product = body.data;

console.log(product);

productName.innerText = product.name;
productImg.setAttribute("src", product.image)
productPrice.innerText = `$${product.price}`
productDescription.innerText = product.description

}