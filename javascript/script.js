// Récupérer l'élement bouton
let boutonvalide = document.querySelector("#boutonValide");


// Récupérer l'élement  formulaire
let inputnomProduit = document.querySelector("#inputProduit");
let numberstock = document.querySelector("#numberStock");
let choixtype = document.querySelector("#inputDegre");
let numberprixAchate = document.querySelector("#numberPrixAchat");
let numberprixVente = document.querySelector("#numberPrixVente");
let numberTva = document.querySelector("#numberTVA");
let tbody = document.querySelector(".tableau");
let numberDegres = document.querySelector("#numberDegre");

//  Récupérer l'élement pour  afficher
let afficheNomProduit = document.querySelector("#Produit")
let afficheStock = document.querySelector("#Stock")
let afficheType = document.querySelector("#Type")
let affichePrixAchat = document.querySelector("#PrixdAchatHT")
let affichePrixVente = document.querySelector("#PrixVente")
let afficheMarge = document.querySelector("#Marge")
let afficheDegre = document.querySelector(".degre")



// code de teste 
let afficheTva = document.querySelector(".tva")

// code pour affiche  les bouton  
let afficherAction = document.querySelector("#Actions")

// récupère le localStorage au chargement de la page
let LSTableau = JSON.parse(localStorage.getItem("array"));
// On créer une variable à vide
let tableau;

// SI LE LOCALSTORAGE "array" existe
if (LSTableau) {
  // la variable tableau prend la valeur du localStorage
  tableau = LSTableau;
  // On affiche les contacts qui sont présent dans le localStorage
  showProduit();
  modifStock();
} else {
  // On part d'un tableau vide
  tableau = [];
}

choixtype.addEventListener("input", function () {
  if (choixtype.value === "non alcoolisée") {
    afficheDegre.style.display = "none"
  } else {
    afficheDegre.style.display = "block"
  }
})


// Fonction qui va afficher mes produit
function showProduit() {
  // Création du content à vide
  let content = "";

  tableau.forEach(function (element, index) {
    // Pour chaque élément du tableau on va créer cette phrase à l'interieur de content
    content += ` <tr>
    <td>${element.nomProduit}</td>
    <td><input type="number" class="modifStock" value="${element.nomStock}" placeholder="${element.nomStock}"/></td>
    <td>${element.Type}</td>
    <td>${element.prixAchat}€</td>
    <td>${element.prixVente}€(${(parseInt(element.prixVente) * 20) / 100 + parseInt(element.prixVente)}€)</td>
    <td>${element.marge}€</td>
    <td >${element.degre}</td>
    <td class="fa-solid fa-trash suppri"></td></tr>`;
  });

  // code cree bouton supprimer 
  tbody.innerHTML = content
  let suppri = tbody.querySelectorAll(".suppri");
  suppri.forEach(function (element, index) {
    element.addEventListener("click", function () {
      if (
        confirm(
          "Voulez vraiment supprimer " + tableau[index].nomProduit + " ? "
        )
      ) {

        tableau.splice(index, 1);//supprime le premier element sur index 1
        localStorage.setItem("array", JSON.stringify(tableau));//supprim localStorage
        showProduit();

      }
    })
  })
}


// Partie modifier produit
function modifStock() {
  // On récupère tout les boutons modifier
  let buttons = document.querySelectorAll(".modifStock");

  // Pour chaque bouton présent dans le tableau buttons
  buttons.forEach((element, index) => {
    // On créer un évenement qui au changement de valeur de l'input
    element.addEventListener("input", (e) => {
      // On modifie le stock du produit concerné
      tableau[index].nomStock = element.value;

      // Si le stock est inférieur à 5
      if (tableau[index].nomStock < 5) {
        // On prévient l'utilisateur
        alert("Attention votre stock est au plus bas veuillez recommander");
        // On change le backgroundColor de l'input en rouge
        element.style.backgroundColor = "red";
      } else {
        // On change le backgroundColor de l'input en vert
        element.style.backgroundColor = "green";
      }
      // On sauvegarde le localStorage
      localStorage.setItem("array", JSON.stringify(tableau));
    });
  });
}




boutonvalide.addEventListener("click", function (e) {
  e.preventDefault()
  if (inputnomProduit.value == "" || numberstock.value == "" || numberprixAchate.value == "" || numberprixVente.value == "") {
    alert("Veuillez remplir le champs obligatoire");
  } else {

    // Mettre les values du formulaire dans un objet 
    let formulaireProduit = {
      nomProduit: inputnomProduit.value,
      nomStock: numberstock.value,
      Type: choixtype.value,
      prixAchat: numberprixAchate.value,
      prixVente: numberprixVente.value,
      marge: (numberprixVente.value - numberprixAchate.value),
      degre: numberDegres.value,

    }
    // On envoi l'objet contact dans le tableau
    tableau.push(formulaireProduit);
    localStorage.setItem("array", JSON.stringify(tableau));//sauve sur localStorge
    showProduit();
    modifStock();

    // vide cache
    inputnomProduit.value = "";
    numberstock.value = "";
    numberprixAchate.value = "";
    numberprixVente.value = "";
    numberDegres.value = "";
  }
})






