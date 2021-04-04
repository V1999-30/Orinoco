getAllFurnitures = () => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status >= 200 &&
          this.status < 400
        ) {
          resolve(JSON.parse(this.responseText));
        } else {
        }
      };
      request.open("GET", "http://localhost:3000/api/furniture/");
      request.send();
    });
  };
  
  async function furnitures() {
    const furnitures = await getAllFurnitures();
  
    /* Lien avec la page index HTML */
  
    let productsList = document.getElementById("products_list");
  
    /* création de la structure index HTML */
  
    furnitures.forEach((meuble) => {
      let productContainer = document.createElement("section");
      let productImg = document.createElement("figure");
      let productElmnt = document.createElement("figcaption");
      let productPhoto = document.createElement("img");
      let productName = document.createElement("h3");
      let productPrice = document.createElement("p");
      let productLink = document.createElement("a");
  
      /*Ajout des attributs au balise index HTML */
      productContainer.setAttribute("class", "product_container");
      productImg.setAttribute("class", "product_img card shadow");
      productPhoto.setAttribute("src", meuble.imageUrl);
      productPhoto.setAttribute("class", "card-img-top");
      productPhoto.setAttribute("alt", "Image meuble en chêne");
      productElmnt.setAttribute("class", "product_elmnt card-body w-100 position-absolute");
      productElmnt.setAttribute("style", "bottom: 0%;");
      productName.setAttribute("class", "product_name card-title");
      productPrice.setAttribute("class", "product_price card-text");
      productLink.setAttribute("href", "produit.html?id=" + meuble._id);
      productLink.setAttribute("class", "btn btn-secondary");
  
      /* Agencement des éléments index HTML */
      productsList.appendChild(productContainer);
      productContainer.appendChild(productImg);
      productImg.appendChild(productPhoto);
      productImg.appendChild(productElmnt);
      productElmnt.appendChild(productName);
      productElmnt.appendChild(productPrice);
      productElmnt.appendChild(productLink);
  
      /* Contenu des balises index HTML */
      productName.textContent = meuble.name;
      productPrice.textContent = meuble.price / 100 + " euros";
      productLink.textContent = "Voir le produit";
    });
  }