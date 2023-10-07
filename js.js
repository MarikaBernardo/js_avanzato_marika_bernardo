let listaProdotti;
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIwNDVjOTZiYmQ5YTAwMTg3NGI5NmYiLCJpYXQiOjE2OTY2NjY5NjQsImV4cCI6MTY5Nzg3NjU2NH0.L8SB_DuACjxMzEq6W10_YnoyFGSwd1FZQza4WcTD68o';
let containerProdotti = document.getElementById("containerProdotti");
const prodottoDaAggiungere = 
{
  "name": "3311 callphone",
  "description": "icon2",
  "brand": "Nokia2",
  "imageUrl": "http://bith.ly_3CExjRa",
  "price": 200,
};

add(prodottoDaAggiungere);

async function getProdotti(){
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      listaProdotti = data;
      renderizzaProdotti();
    })
}

async function put(prodottoAggiornato){
  fetch(`${apiUrl}/${prodottoAggiornato.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prodottoAggiornato)
  })
    .then(response => {
      return response.json();
    })
    .then(productUpdated => {
      document.getElementById("idProdotto").value = productUpdated.id;
      document.getElementById("nomeProdotto").value = productUpdated.name;
      document.getElementById("descrizioneProdotto").value = productUpdated.description;
      document.getElementById("bandProdotto").value = productUpdated.brand;
      document.getElementById("immagineProdotto").value = productUpdated.imageUrl;
      document.getElementById("prezzpProdotto").value = productUpdated.price;
    })
}

async function deleteById(idProdotto){
  fetch(`${apiUrl}/${idProdotto}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

async function add(prodottoDaAggiungere){
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prodottoDaAggiungere)
  })
    .then(response => {
      return response.json();
    })
    .then(() => {
      getProdotti();
    })
}

  function renderizzaProdotti() {
    containerProdotti.innerHTML = "";

    listaProdotti.forEach((prodotto) => {
      let divProdotto = document.createElement("div");
      divProdotto.className = "col-md-4";

      let divCard = document.createElement("div");
      divCard.className = "card";

      let imgElement = document.createElement("img");
      imgElement.className = "card-img-top";
      imgElement.src = prodotto.imageUrl;
      divCard.appendChild(imgElement);

      let divCardBody = document.createElement("div");
      divCardBody.className = "card-body";

      let idElemento = document.createElement("p");
      idElemento.className = "card-text";
      idElemento.textContent = `ID: ${prodotto.id}`;
      divCardBody.appendChild(idElemento);

      let nomeElemento = document.createElement("h5");
      nomeElemento.className = "card-title";
      nomeElemento.textContent = prodotto.name;
      divCardBody.appendChild(nomeElemento);

      let descrizioneElemento = document.createElement("p");
      descrizioneElemento.className = "card-text";
      descrizioneElemento.textContent = `Description: ${prodotto.description}`;
      divCardBody.appendChild(descrizioneElemento);

      let brandElemento = document.createElement("p");
      brandElemento.className = "card-text";
      brandElemento.textContent = `Brand: ${prodotto.brand}`;
      divCardBody.appendChild(brandElemento);

      let prezzoElemento = document.createElement("p");
      prezzoElemento.className = "card-text";
      prezzoElemento.textContent = `Price: $${prodotto.price}`;
      divCardBody.appendChild(prezzoElemento);

      let buttonElemento = document.createElement("button");
      buttonElemento.className = "card-text";
      buttonElemento.textContent = `Seleziona`;
      buttonElemento.addEventListener("click", async function() {
        document.getElementById("idProdotto").value = prodotto.id;
        document.getElementById("nomeProdotto").value = prodotto.name;
        document.getElementById("descrizioneProdotto").value = prodotto.description;
        document.getElementById("bandProdotto").value = prodotto.brand;
        document.getElementById("immagineProdotto").value = prodotto.imageUrl;
        document.getElementById("prezzpProdotto").value = prodotto.price;
      });
      divCardBody.appendChild(buttonElemento);

      let buttonElemento2 = document.createElement("button");
      buttonElemento2.className = "card-text";
      buttonElemento2.textContent = `Vai al prodotto`;
      buttonElemento2.addEventListener('click', function () {
      const newUrl = `prodotto.html?id=${prodotto.id}`;
      window.location.href = newUrl;
    });
      divCardBody.appendChild(buttonElemento2);
      divCard.appendChild(divCardBody);
      divProdotto.appendChild(divCard);
      containerProdotti.appendChild(divProdotto);
    });
  }

  document.getElementById("formProdotti").addEventListener("submit", async function(event) {
    event.preventDefault();
    let idProdotto = document.getElementById("idProdotto").value;
    let nomeProdotto = document.getElementById("nomeProdotto").value;
    let descrizioneProdotto = document.getElementById("descrizioneProdotto").value;
    let bandProdotto = document.getElementById("bandProdotto").value;
    let immagineProdotto = document.getElementById("immagineProdotto").value;
    let prezzpProdotto = document.getElementById("prezzpProdotto").value;

    if (idProdotto) {
      let prodottoEsistente = listaProdotti.find(prodotto => prodotto.id === idProdotto);
      if (prodottoEsistente) {
        prodottoEsistente.name = nomeProdotto;
        prodottoEsistente.description = descrizioneProdotto;
        prodottoEsistente.brand = bandProdotto;
        prodottoEsistente.imageUrl = immagineProdotto;
        prodottoEsistente.price = prezzpProdotto;
        prodottoEsistente.id = idProdotto;

        await put(prodottoEsistente);
      }
    } else {
      let nuovoProdotto = {
        id: Date.now().toString(), //da come id la data di oggi in millisecondi (numero random)
        name: nomeProdotto,
        description: descrizioneProdotto,
        brand: bandProdotto,
        imageUrl: immagineProdotto,
        price: prezzpProdotto,
      };
      listaProdotti.push(nuovoProdotto);
    }

    renderizzaProdotti();
    document.getElementById("formProdotti").reset();
    document.getElementById("idProdotto").value = "";
  });

  document.getElementById("deleteButton").addEventListener("click", async function deleteProduct() {
    let idProdotto = document.getElementById("idProdotto").value;
    let indiceProdottoEsistente = listaProdotti.findIndex(prodotto => prodotto.id === idProdotto);
    if (indiceProdottoEsistente > -1) {
      await deleteById(idProdotto);
      listaProdotti.splice(indiceProdottoEsistente, 1);
      renderizzaProdotti();
      document.getElementById("formProdotti").reset();
      document.getElementById("idProdotto").value = "";
    }
  });
  