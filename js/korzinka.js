    const h = document.querySelector("h1");
    
    const products = JSON.parse(localStorage.getItem("productsK"));
    
    console.log(products);
    
    products.forEach((item) => {
    console.log(item);
    h.innerText += item.name;
    })

    console.log("salom");
    