const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events'

const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const partyNam = document.querySelector('#partyName');
const daTe = document.querySelector('#daTe');
const tiMe = document.querySelector('#tiMe');
const locaTion = document.querySelector('#locaTion');

async function getPartyPlanner(){
    const respone = await fetch(BASE_URL);
    // console.log(respone);
    const data = await respone.json();
    // console.log(data);
    return data.data;
}
function render(partyList) {
const template = partyList.map(events => {
    return (
       `<section>
        <h2>${events.name}</h2>
        <img
          src="${events.imageUrl}"
        
        />
        <p>${events.description}</p>
      </section>`
    )
}).json('');
mainEl.innerHTML = template;
}
async function partyApp() {
const partyList = await getPartyPlanner();
render(partyList);
}


partyApp();

formEl.addEventListener('submit', async (event) => {
   event.preventDefault(); 

   const respone = await fetch(BASE_URL, {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({
    name: partyNam.value,
    date: daTe.value,
    time: tiMe.value,
    location: locaTion.value,
})
   });
   partyNam.value = '';
   daTe.value = '';
   tiMe.value = '';
   locaTion.value = '';

   partyApp();
});