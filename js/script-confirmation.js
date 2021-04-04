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

  //Récupération des informations pour affichage sur la page de confirmation
  retourOrder = () => {
    if (sessionStorage.getItem("order") != null) {
      let order = JSON.parse(sessionStorage.getItem("order"));
      document.getElementById("orderId").innerHTML = order.orderId;
      sessionStorage.removeItem("order");
    }
    //Redirection vers l'accueil
    else {
      alert("Merci pour vote commande. A bientôt");
      window.location = "./index.html";
    }
  };

  confirmRecap = () => {
      //Création de la structure du tableau récapitulatif
      let recapConfirm = document.createElement("table");
      let confirmRow = document.createElement("tr");
      let confirmImg = document.createElement("th");
      let confirmName = document.createElement("th");
      let confirmArticlePrice = document.createElement("th");
      let rowConfirmTotal = document.createElement("tr");
      let colConfirmTotal = document.createElement("th");
      let confirmTotalPrice = document.createElement("td");

      //Attribution des ID ou class
      recapConfirm.setAttribute("id", "table_recap");
      confirmImg.setAttribute("id", "th_img_recap");
      confirmName.setAttribute("id", "th_name_recap");
      confirmArticlePrice.setAttribute("class", "th_price_recap")

      //Placement de la structure dans la page
      let confirmShopping = document.getElementById("confirm_recap");
      confirmShopping.appendChild(recapConfirm);
      recapConfirm.appendChild(confirmRow);
      confirmRow.appendChild(confirmImg);
      confirmRow.appendChild(confirmName);
      confirmRow.appendChild(confirmArticlePrice);
  
      //contenu des entetes
      confirmImg.textContent = "Article";
      confirmName.textContent = "Nom";
      confirmArticlePrice.textContent = "Prix";
  
      //Incrémentation de l'id des lignes pour chaque produit
      let i = 0;
      let order = JSON.parse(sessionStorage.getItem("order"));
  
      order.products.forEach((orderArticle) => {
      //Création de la ligne
      let rowConfirmArticle = document.createElement("tr");
      let imgConfirmArticle = document.createElement("img");
      let nameConfirmArticle = document.createElement("td");
      let priceConfirmArticle = document.createElement("td");
  
      //Attribution des class pour le css
      rowConfirmArticle.setAttribute("id", "article_acheté" + i);
      imgConfirmArticle.setAttribute("class", "photo_article_acheté");
      imgConfirmArticle.setAttribute("src", orderArticle.imageUrl);
      imgConfirmArticle.setAttribute("alt", "Photo de l'article acheté");
      nameConfirmArticle.setAttribute("class", "td_name_conf_recap");
      priceConfirmArticle.setAttribute("class", "td_price_conf_recap")
      
  
      //Insertion dans le HTML
      recapConfirm.appendChild(rowConfirmArticle);
      rowConfirmArticle.appendChild(imgConfirmArticle);
      rowConfirmArticle.appendChild(nameConfirmArticle);
      rowConfirmArticle.appendChild(priceConfirmArticle);
  
      //Contenu des lignes
  
      nameConfirmArticle.textContent = orderArticle.name;
      priceConfirmArticle.textContent = orderArticle.price / 100 + " €";
      });
  
      //Dernière ligne du tableau : Total
      recapConfirm.appendChild(rowConfirmTotal);
      rowConfirmTotal.appendChild(colConfirmTotal);
      rowConfirmTotal.setAttribute("id", "ligneSomme");
      colConfirmTotal.textContent = "Total payé";
      rowConfirmTotal.appendChild(confirmTotalPrice);
  
      confirmTotalPrice.setAttribute("id", "value_confirm_total");
      confirmTotalPrice.setAttribute("colspan", "4");
      colConfirmTotal.setAttribute("id", "colConfirmTotal");
      colConfirmTotal.setAttribute("colspan", "2");
  
      //Calcule de l'addition total
      let valueConfirmTotal = 0;
      order.products.forEach((orderArticle) => {
      valueConfirmTotal += orderArticle.price / 100;
      });
  
      //Affichage du prix total à payer dans l'addition
      document.getElementById("value_confirm_total").textContent =
      valueConfirmTotal + " €";
  };