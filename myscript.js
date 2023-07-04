

const form = document.getElementById('form');
const namee = document.getElementById('name');
const number = document.getElementById('numero-telefono');
const submitBtn = document.getElementById('submit-button');
const removeBtn = document.getElementById('remove-button');
let contacts = [];

class contact {
    constructor(_name, _number){
        this.name = _name
        this.number = _number
    }
}

//funzione che prende da localstorage e inizializza contacts[] se c'è qualcosa di salvato
const getSavedContacts = function(){
    let savedContacts = JSON.parse(localStorage.getItem('contatti'));
    if (savedContacts){
        contacts = savedContacts;
    }
}

//funzione che, prima resetta l'html della lista, poi con un forEach crea elementi per ogni oggetto di contacts[]
const populateList = function(){
    let list = document.querySelector('.list-group')
    list.innerHTML = ``;
    contacts.forEach(contact =>{


    
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    listItem.innerText = `${contact.name}: ${contact.number}`
    list.appendChild(listItem);
    })
    
}

//funzione che AL SUBMIT salva i dati in contacts[] e che aggiorna/salva contacts[] in localstorage
const addToLocal = function(){
    

    if(namee.value && number.value){
    let nuovoContatto = new contact(namee.value, number.value);
    // console.log(nuovoContatto)
    contacts.push(nuovoContatto);
    console.log(contacts)
    localStorage.setItem('contatti', JSON.stringify(contacts));
    namee.value = '';
    number.value = '';
    populateList();
}

    // let list = document.querySelector('.list-group')
    // let listItem = document.createElement('li');
    // listItem.classList.add('list-group-item');

    // listItem.innerText = `${namee.value}: ${number.value}`
    // list.appendChild(listItem);

}

const removeLast = function(){
    if (contacts){
        contacts.pop();
        localStorage.setItem('contatti', JSON.stringify(contacts));
        populateList()
    }
}

getSavedContacts();

populateList();

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    addToLocal()
});
removeBtn.addEventListener('click', removeLast);

let timerDiv = document.getElementById('timer')
let memorizedCounter = parseInt(localStorage.getItem('timer'));
let counter = memorizedCounter ? memorizedCounter : 0;

const timer = setInterval(()=>{
    timerDiv.innerText = counter;
    counter ++;
    localStorage.setItem('timer', counter -1);
}, 1000)