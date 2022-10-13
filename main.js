const arrayProducts = [
  {
    price: "US$ 10.5",
    id: 0,
    name: "Camisas",
    stock: 10,
    description: "Rojo",
    img: "../img/featured1.png",
  },
  {
    price: "US$ 10.5",
    id: 1,
    name: "Camisas",
    stock: 10,
    description: "Negro",
    img: "../img/featured2.png",
  },
  {
    price: "US$ 10.5",
    id: 2,
    name: "Sudaderas",
    stock: 10,
    description: "Blanco",
    img: "../img/featured3.png",
  },
];

let cart = [];

document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelector(".products");
  let html = "";
  for (let i = 0; i < arrayProducts.length; i++) {
    html += `<div class="product">
            <div class="product_img">
                <img src=" ${arrayProducts[i].img}" alt="${arrayProducts[i].name}">
            </div>
            <div class="product_info">                
                <div class="container-price">
                    <p> ${arrayProducts[i].price}</p>                    
                </div> 
                <div class="container-stock">
                    <p> <small>stock:  ${arrayProducts[i].stock}</small> </p>
                </div>  
                <p class="name"> ${arrayProducts[i].name}</p>
                <p> <small>Descripcion: ${arrayProducts[i].description}</small></p>        
                </div>
                <div class="product_action" id='${arrayProducts[i].id}'>
                   <button class="btn"> + </button>
                </div>
           </div>`;
  }
  products.innerHTML = html;

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
      const idProduct = e.target.parentElement.id;
      let currentProduct = null;
      for (let i = 0; i < arrayProducts.length; i++) {
        if (arrayProducts[i].id === parseInt(idProduct)) {
          currentProduct = arrayProducts[i];
        }
      }

      if (cart[idProduct]) {
        if (cart[idProduct].amount === cart[idProduct].stock) {
          alert("no hay mas productos");
          return;
        }
        cart[idProduct].amount++;
      } else {
        cart[idProduct] = currentProduct;
        cart[idProduct].amount = 1;
      }

      const amount = document.querySelector("#amount");
      amount.textContent = Object.entries(cart).length;
    }
  });

  const sideBarCart = document.querySelector(".sidebar_cart");

  const cartShopping = document.querySelector(".cartShopping");

  cartShopping.addEventListener("click", function () {
    sideBarCart.classList.toggle("show_sidebar_cart"); // para que despliegue

    const contentShopping = document.querySelector(".content_shopping");
    const shoppingArray = Object.values(cart);

    let html = "";
    shoppingArray.forEach(({ id, name, price, stock, img, amount }) => {
      html += `
                <div class="shopping">
                    <div class="shopping__header">
                        <div class="shopping__img">
                            <img src="${img}" alt="${name}">
                        </div>
                        <div class="shopping__info">
                            <p>nombre: ${name}</p>
                            <p>precio: ${price}</p>
                            <p>stock: ${stock}</p>
                        </div>
                    </div>
                    <div class="shopping__actions" id="${id}">
                        <button class="rest">-</button>
                        <b class="amount">${amount}</b>
                        <button class="add">+</button>
                        <button class='bx bxs-trash del'></button>
                    </div>
                </div>`;
    });
    contentShopping.innerHTML = html;
  });

  const contentShopping = document.querySelector(".content_shopping");
  contentShopping.addEventListener("click", (event) => {
    if (event.target.classList.contains("rest")) {
      const id = parseInt(event.target.parentElement.id);

      if (cart[id].amount === 1) {
        const res = confirm("desea eliminar?");
        if (res) {
          delete cart[id];
        }
      } else {
        cart[id].amount--;
      }
    }

    if (event.target.classList.contains("add")) {
      const id = parseInt(event.target.parentElement.id);

      if (cart[id].stock > cart[id].amount) {
        cart[id].amount++;
      } else {
        alert("No tenemos disponibilidad de este producto");
      }
    }

    if (event.target.classList.contains("del")) {
      const id = parseInt(event.target.parentElement.id);

      const res = confirm("seguro quieres eliminar este producto?");

      if (res) {
        delete cart[id];
      }
    }

    const amount = document.querySelector("#amount");
    amount.textContent = Object.entries(cart).length;
    const shoppingArray = Object.values(cart);
    let suma = 0;

    console.log(shoppingArray);

    cart.forEach((n) => {
      suma += n.amount * n.price;
    });

    const shoppingTotal = document.querySelector(".shoppingTotal");
    shoppingTotal.textContent = suma;
    const btnBuy = document.querySelector("#btnBuy");
    btnBuy.addEventListener("click", () => {
      const res = confirm("Desea encargar este producto?");

      if (res) {
        sideBarCart.classList.toggle("show_sidebar_cart");
        cart = [];
        amount.textContent = 0;
      }
    });
  });

  const iconMenu = document.querySelector("#iconMenu");
  const menu = document.querySelector("#menu");
  iconMenu.addEventListener("click", function () {
    menu.classList.toggle("menu_show");
  });
});
