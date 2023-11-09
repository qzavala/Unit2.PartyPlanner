const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events";

const mainEl = document.querySelector("main");
const formEl = document.querySelector("form");
const partyNam = document.querySelector("#partyName");
const date = document.querySelector("#date");
const description = document.querySelector("#description");
const eventLocation = document.querySelector("#location");

async function getPartyPlanner() {
  const respone = await fetch(BASE_URL);
  // console.log(respone);
  const data = await respone.json();
  console.log(data.data);
  return data.data;
}
function render(partyList) {
  const template = partyList
    .map((event) => {
        console.log("event in map; " , event)
        const eventDate = new Date(event.date).toLocaleString()
      return `<section>
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <p>${eventDate}</p>
        <p>${event.location}</p>
     <button data-id="${event.id}">Delete Party</button>
      </section>`;
    })
    .join("");
  mainEl.innerHTML = template;
}
async function partyApp() {
  const partyList = await getPartyPlanner();
  render(partyList);
}

partyApp();

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const eventDate = new Date(date.value).toISOString();
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: partyNam.value,
        date: eventDate,
        location: eventLocation.value,
        description: description.value,
      }),
    });
    partyNam.value = "";
    date.value = "";
    eventLocation.value = "";
    description.value = "";
    partyApp();
  } catch (err) {
    console.log(err);
  }
});

mainEl.addEventListener("click", async (event) => {
  console.log("whole main tag");
  if (event.target.matches("button")) {
    const id = event.target.dataset.id;
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    })
    console.log(id);
    partyApp();
  }
});
