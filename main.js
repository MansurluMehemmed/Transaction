const modal = document.getElementById("myModal");
const btn = document.getElementById("openModalBtn");
const span = document.getElementsByClassName("close")[0];
const addButton = document.getElementById("addButton");
const divList = document.querySelector(".divList");

const buttonEdit = document.getElementById("buttonEdit");

btn.addEventListener("click", (e) => {
  modal.style.display = "flex";
});
span.onclick = function () {
  modal.style.display = "none";
};

addButton.onclick = function () {
    modal.style.display = 'none'
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

fetch("https://acb-api.algoritmika.org/api/transaction")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      const divListasd = document.createElement("div");
      divListasd.classList.add("divListasd");
      divListasd.innerHTML = `
        <ul>
            <li>${data[i].from}</li>
            <li>${data[i].to}</li>
            <li>${data[i].amount}</li>
            <li class="idvisible">${data[i].amount}</li>
        </ul>`;
      let divButtons = document.createElement("div");
      divButtons.classList.add("divButtons");
      let buttonEditCreate = document.createElement("button");
      buttonEditCreate.setAttribute("id", "buttonEdit");

      let buttonDeleteCreate = document.createElement("button");
      buttonDeleteCreate.addEventListener("click", () => {
        console.log(data[i].id);
        fetch(`https://acb-api.algoritmika.org/api/transaction/${data[i].id}`, {
          method: "DELETE",
        });
        divListasd.style.display = "none";
      });





      buttonEditCreate.addEventListener("click", () => {
        // console.log(data[i].id);
        modal.style.display = "flex";

        console.log(data[i].from);
        modal.querySelectorAll("input")[0].value = data[i].from;
        modal.querySelectorAll("input")[1].value = data[i].to;
        modal.querySelectorAll("input")[2].value = data[i].amount;
        addButton.addEventListener('click',()=>{
          const info = {
            from: modal.querySelectorAll("input")[0].value,
            to: modal.querySelectorAll("input")[1].value,
            amount: modal.querySelectorAll("input")[2].value,
          }
          fetch(`https://acb-api.algoritmika.org/api/transaction/${data[i].id}`, {
              method: 'PUT',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(info)
            }).then(data=>{
              console.log(data)
              window.location.reload()
            }); 
        })   
      });





      buttonDeleteCreate.setAttribute("id", "buttonDelete");
      buttonDeleteCreate.innerHTML = `
        <i class="fa-solid fa-xmark"></i>
        `;
      buttonEditCreate.innerHTML = `
        <i class="fa-solid fa-pen"></i>
        `;
      divButtons.append(buttonEditCreate);
      divButtons.append(buttonDeleteCreate);
      divListasd.append(divButtons);
      divList.append(divListasd);
    }
  });

addButton.addEventListener("click", () => {

  const info = {};
  const input = document.querySelectorAll("input");
  input.forEach((item) => {
    info[item.name] = item.value;
  });
  fetch("https://acb-api.algoritmika.org/api/transaction", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(info),
  });
});





