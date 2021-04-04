 //------Page Panier-------//
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

  //Panier de l'utilisateur
  let shopping = JSON.parse(localStorage.getItem("shopping"));
      
  //Affichage du nombre d'article dans le panier
  function indexInCart() {
  let indexShopping = document.getElementById("index_shopping");
  indexShopping.textContent = shopping.length;
  }

  function productInCart() {
  let itemShopping = document.getElementById("item_shopping");
  itemShopping.textContent = shopping.length;
  }

  //Vérification et initialisation du panier

  if (localStorage.getItem("shopping")) {
  } else {
  let shoppingInit = [];
  localStorage.setItem("shopping", JSON.stringify(shoppingInit));
  }

  //Ajout de l'article au panier

  addToCart = () => {
  let buy = document.getElementById("add_to_cart");
  buy.addEventListener("click", async function () {
      const ajout = await getAllFurnitures();
      shopping.push(ajout);
      localStorage.setItem("shopping", JSON.stringify(shopping));
      alert("Cet article a été ajouté au panier");
      location.reload();
  });
  };

 createCart = () => {
  if (shopping.length > 0) {
      document.getElementById("empty").remove();

      //Création de la structure du tableau récapitulatif
      let recap = document.createElement("table");
      let tableRow = document.createElement("tr");
      let recapImg = document.createElement("th");
      let recapName = document.createElement("th");
      let recapProductPrice = document.createElement("th");
      let recapRemove = document.createElement("th");
      let totalRow = document.createElement("tr");
      let totalCol = document.createElement("th");
      let recapTotalPrice = document.createElement("td");

      //Placement de la structure dans la page
      let recapShopping = document.getElementById("recap_shopping");
      recapShopping.appendChild(recap);
      recap.appendChild(tableRow);
      tableRow.appendChild(recapImg);
      tableRow.appendChild(recapName);
      tableRow.appendChild(recapProductPrice);
      tableRow.appendChild(recapRemove);

      //contenu des entetes
      recapImg.textContent = "Article(s)";
      recapName.textContent = "Nom";
      recapProductPrice.textContent = "Prix";
      recapRemove.textContent = "Supprimer";

  
      
  //Boucle FOR pour affichage des articles dans le panier
      
      for (let i = 0; i<shopping.length; i++) {
      
      //Création des lignes du tableau

      let itemRow = document.createElement("tr");
      let articleImg = document.createElement("img");
      let articleName = document.createElement("td");
      let articlePrice = document.createElement("td");
      let suppItem = document.createElement("td");
      let removeItem = document.createElement("i");

      //Attribution des class ou Id
      itemRow.setAttribute("id", "article" + [i]);
      articleImg.setAttribute("class", "photo_article");
      articleImg.setAttribute("src", shopping[i].imageUrl);
      articleImg.setAttribute("alt", "Photo de l'article commandé");
      removeItem.setAttribute("id", "remove" + [i]);
      removeItem.setAttribute("class", "fas fa-times-circle fa-1x");
      removeItem.setAttribute("title", "Supprimer article ");
      
      


  //Supprimer un produit du panier
  removeItem.addEventListener("click", (event) => {this.deleteItem(i);})
  
          
      

      //Agencement de la structure HTML
      recap.appendChild(itemRow);
      itemRow.appendChild(articleImg);
      itemRow.appendChild(articleName);
      itemRow.appendChild(articlePrice);
      itemRow.appendChild(suppItem);
      suppItem.appendChild(removeItem);

      //Contenu de chaque ligne

      articleName.textContent = shopping[i].name;
      articlePrice.textContent = shopping[i].price / 100 + " €";
      

      };


      //Dernière ligne du tableau : Total
      recap.appendChild(totalRow);
      totalRow.appendChild(totalCol);
      totalRow.setAttribute("id", "ligneSomme");
      totalCol.textContent = "Total à payer";
      totalRow.appendChild(recapTotalPrice);

      recapTotalPrice.setAttribute("id", "total_value");
      recapTotalPrice.setAttribute("colspan", "4");
      totalCol.setAttribute("id", "totalCol");
      totalCol.setAttribute("colspan", "2");

      //Calcule de l'addition total
      let totalValue = 0;
      shopping.forEach((shopping) => {
      totalValue += shopping.price / 100;
      });

      //Affichage du prix total à payer dans l'addition
      document.getElementById("total_value").textContent = totalValue + " €";
  }
  };



  deleteItem = (i) => {
  shopping.splice(i, 1);
  localStorage.clear();
  // Mise à jour du nouveau panier avec suppression de l'article
  localStorage.setItem("shopping", JSON.stringify(shopping));
  //Mise à jour de la page de l'affichage 
  window.location.reload();
  };

//Vérification du panier
checkShopping = () => {
  //Si il y a au moins 1 produit
  let statusShopping = JSON.parse(localStorage.getItem("shopping"));
  //Si le panier est vide 
  if  (statusShopping.length < 1 || statusShopping == null) {
    alert("Votre panier est vide");
    return false;
  } else {
    return true;
  }
};

//vérification les champs du formulaire
checkInput = () => {
  //Controle Regex
  let checkNumber = /[0-9]/;
  let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

  //message fin de controle
  let checkMessage = "";

  //Récupération des inputs

  let lastName = document.getElementById("lastname").value;
  let firstName = document.getElementById("firstname").value;
  let email = document.getElementById("email").value;
  let adresse = document.getElementById("adresse").value;
  let town = document.getElementById("town").value;

  //tests des différents champs du formulaire
  //Nom
  if (
    checkNumber.test(lastName) == true ||
    checkSpecialCharacter.test(lastName) == true ||
    lastName == ""
  ) {
    checkMessage = "Veuillez vérifier les informations saisient. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
  }
  //Prénom
  if (
    checkNumber.test(firstName) == true ||
    checkSpecialCharacter.test(firstName) == true ||
    firstName == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations saisient. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
  }
  //Mail
  if (checkMail.test(email) == false) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations saisient.";
  } else {
  }
  //Adresse
  if (checkSpecialCharacter.test(adresse) == true || adresse == "") {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations saisient. Les caractères spéciaux ne sont pas autorisés";
  } else {
  }
  //Ville
  if (
    (checkSpecialCharacter.test(town) == true ||
      checkNumber.test(town) == true) ||
    town == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations saisient. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
  }
  //Alerte si un des champs n'est pas correcte
  if (checkMessage != "") {
    alert("Attention certaines données ne sont pas conformes :" + "\n" + checkMessage);
  }
  //Si le formulaire est validé 
  else {
    contact = {
      lastName: lastName,
      firstName: firstName,
      email: email,
      address: adresse,
      city: town,
    };
    return contact;
  }
};

/*Envoi à l'API */
//Tableau et objet demandé par l'API pour la commande
let contact;
let products = [];
let url = "http://localhost:3000/api/furniture/order";

const envoiFormulaire = (sendForm, url) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        sessionStorage.setItem("order", this.responseText);
        window.location = "page-confirmation.html";
        resolve(JSON.parse(this.responseText));
      } else {
      }
    };
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(sendForm);
  });
};

confirmBuy = () => {
  let command = document.getElementById("form_1");
  command.addEventListener("submit", (event) => {
    event.preventDefault()
    //Si le panier n'est pas vide et que le formulaire est valide => Construction du tableau products envoyé à l'API
    if (checkShopping() == true && checkInput() != null) {
      shopping.forEach((article) => {
        products.push(article._id);
      });

      //Création de l'objet à envoyer
      let purchase = {
        contact,
        products,
      };

      let sendForm = JSON.stringify(purchase);
      envoiFormulaire(sendForm, url);

      //Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
      contact = {};
      products = [];
      localStorage.clear();
    } else {
    }
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