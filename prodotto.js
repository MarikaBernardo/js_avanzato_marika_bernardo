const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIwNDVjOTZiYmQ5YTAwMTg3NGI5NmYiLCJpYXQiOjE2OTY2NjY5NjQsImV4cCI6MTY5Nzg3NjU2NH0.L8SB_DuACjxMzEq6W10_YnoyFGSwd1FZQza4WcTD68o'; // Sostituisci con il tuo token effettivo

function getById(idProdotto){
  fetch(`${apiUrl}/${idProdotto}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      document.getElementById("nomeProdotto").textContent = data.name
      document.getElementById("prezzpProdotto").textContent = data.price
    })
}

const currentUrl = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
getById(id)