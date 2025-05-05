const container = document.getElementsByClassName('scroll')[0];
const div2 = document.querySelector('.check-container');
const registrationForm = document.getElementById('registration-form');
const idInput = document.getElementById('input-field');
const idButton = document.getElementById('id-button');
const alertMsg = document.querySelector('.alert');

let idArray = JSON.parse(localStorage.getItem('idn')) || [];
const id=document.getElementById("input-field").value;

function scrollDiv() {
  div2.style.display = 'flex';
  container.style.transition = 'transform 0.5s ease-in-out';
  container.style.transform = 'translateX(-100vw)';
}

// function formnew() {
//   const id=document.getElementById("input-field").value;
//   localStorage.setItem(id,JSON.stringify(id));
//   const lsnum = localStorage.getItem(id);
//   const finalid = JSON.parse(lsnum);
//   console.log(id);
//   console.log(finalid);
// }

function formnew() {
  idArray.push(id);
  updateLs();
  checkId();
}

function updateLs() {
  let idString = JSON.stringify(idArray);
  localStorage.setItem('idn',idString);
  const temp = localStorage.getItem('idn');
  finalId = JSON.parse(temp);
  console.log(finalId);
}

function checkIfRegistered(id) {
  alertMsg.classList.remove("hide"); // 👈 This line makes the alert visible

  let alreadyExists = false;

  for (let i = 0; i < idArray.length; i++) {
    if (idArray[i] === id) {
      alreadyExists = true;
      break;
    
    }
  }

  if (alreadyExists) {
    alertMsg.textContent = "You have already registered";
    alertMsg.style.color = "red";
  } else {
    idArray.push(id);  
    updateLs();    
    alertMsg.classList.add("hide");     

    scrollDiv(); 
    
    setTimeout(() => {
      window.location.href = 'form.html';
    }, 1000); 
  }
}

idButton.addEventListener('click', () => {
  const idValue = idInput.value.trim();
  if (!idValue) return;

  checkIfRegistered(idValue);
});


window.addEventListener("DOMContentLoaded", () => {
  const idInput = document.getElementById("idnum");
  const savedId = localStorage.getItem("idNumber");

  if (savedId && idInput) {
      idInput.value = savedId;
  }
});
