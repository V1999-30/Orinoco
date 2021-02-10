/*connexion avec l'API*/
getAllFurnitures = () => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status >= 200) {
          resolve(JSON.parse(this.responseText));
          console.log("Connecté");
        } else {
        }
      };
      request.open("GET", "http://localhost:3000/api/furniture");
      request.send();
    });
  };
  
  async function furnitures() {
    const furnitures = await getAllFurnitures();
  
  
    let products = document.getElementById("products");

    /* création du HTML */
    
    furnitures.forEach((meuble) => {
      let productContainer = document.createElement("section");
      let productImg = document.createElement("figure");
      let productElmnt = document.createElement("figcaption");
      let productPhoto = document.createElement("img");
      let productName = document.createElement("h3");
      let productPrice = document.createElement("p");
      let productLink = document.createElement("a");

      /* Ajout des attributs - HTML */
      productContainer.setAttribute("class", "product_container mx-5 my-5");
      productImg.setAttribute("class", "product_img card shadow");
      productPhoto.setAttribute("src", meuble.imageUrl);
      productPhoto.setAttribute("class", "card-img-top");
      productPhoto.setAttribute("alt", "Image meuble en chêne");
      productElmnt.setAttribute("class", "product_elmnt card-body w-100 position-absolute");
      productElmnt.setAttribute("style", "bottom: 0%;")
      productName.setAttribute("class", "product_name card-title");
      productPrice.setAttribute("class", "product_price card-text");
      productLink.setAttribute("href", "produit.html?id=" + meuble._id);
      productLink.setAttribute("class", "btn btn-secondary");

      /* Liste parents/enfants  - HTML */
      products.appendChild(productContainer);
      productContainer.appendChild(productImg);
      productImg.appendChild(productPhoto);
      productImg.appendChild(productElmnt);
      productElmnt.appendChild(productName);
      productElmnt.appendChild(productPrice);
      productElmnt.appendChild(productLink);

      /* Contenu bandeau-figcaption  - HTML */
      productName.textContent = meuble.name;
      productPrice.textContent = meuble.price / 100 + " euros";
      productLink.textContent = "Voir le porduit";
    })
  }