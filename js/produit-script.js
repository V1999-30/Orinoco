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
      request.open("GET", "http://localhost:3000/api/furniture/" + idFurniture);
      request.send();
    });
  };

  let idFurniture = "";
    async function detailFurniture() {
        idFurniture = location.search.substring(4);
        const detailFurniture = await getAllFurnitures();
    
        /* Lien avec la page produit HTML */
    
        let itemDetail = document.getElementById("item_detail");
    
        /* création de la structure produit HTML */
    
        let itemContainer = document.createElement("section");
        let itemImg = document.createElement("div");
        let itemElmnt = document.createElement("div");
        let itemPhoto = document.createElement("img");
        let itemName = document.createElement("h3");
        let itemDescription = document.createElement("p");
        let itemInfoPrice = document.createElement("div");
        let itemPrice = document.createElement("p");
        let choiceItemDetail = document.createElement("select");
        let itemLink = document.getElementById("add_to_cart");
    
        /*Ajout des attributs au balise produit HTML */
        itemContainer.setAttribute("class", "item_container text-center");
        itemImg.setAttribute("class", "item_img card shadow");
        itemPhoto.setAttribute("src", detailFurniture.imageUrl);
        itemPhoto.setAttribute("class", "card-img-center");
        itemPhoto.setAttribute("alt", "Photo de " + detailFurniture.name);
        itemElmnt.setAttribute("class", "item_element card card-body shadow w-100");
        itemElmnt.setAttribute("style", "bottom: 0%;");
        itemName.setAttribute("class", "item_name card-title");
        itemDescription.setAttribute("class", "item_description");
        itemInfoPrice.setAttribute("class", "item_info_price");
        itemPrice.setAttribute("class", "item_price card-text");
        choiceItemDetail.setAttribute("id", "choices");
    
        /* Agencement des éléments produit HTML */
        itemDetail.appendChild(itemContainer);
        itemContainer.appendChild(itemImg);
        itemImg.appendChild(itemPhoto);
        itemContainer.appendChild(itemElmnt);
        itemElmnt.appendChild(itemName);
        itemElmnt.appendChild(itemDescription);
        itemDescription.appendChild(itemInfoPrice);
        itemElmnt.appendChild(itemPrice);
        itemElmnt.appendChild(choiceItemDetail)
        itemElmnt.appendChild(itemLink);
    
        /* Contenu des balises produit HTML */
        itemName.textContent = detailFurniture.name;
        itemDescription.textContent = detailFurniture.description;
        itemPrice.textContent = detailFurniture.price / 100 + " €";

        for (var i = 0; i < detailFurniture.varnish.length; i++) {
          let optionColor = document.getElementById("option_color");
          let optionItemDetail = document.createElement("option");

          itemContainer.appendChild(optionColor);
          optionColor.appendChild(itemElmnt);
          choiceItemDetail.appendChild(optionItemDetail);
          optionItemDetail.textContent = detailFurniture.varnish[i];
        }

      console.log(detailFurniture);
    }

    