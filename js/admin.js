console.log("salom");

const form = document.getElementById("product-create-form");

form.addEventListener("submit", async (event) => {
event.preventDefault();

const formData = new FormData(event.target);

try {
const res = await fetch("http://localhost:5000/products", {
method: "post",
body: formData,
});

const body = await res.json();

alert(body?. message);

if (res.status === 201) {
event.target.reset();
}
} catch (err) {
alert("Server ish faoliyatida emas, keyinroq urinib ko'ring.");
}
});

