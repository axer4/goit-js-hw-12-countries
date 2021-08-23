export default fetchCountries;
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
const refs = {
    input: document.querySelector('.input-country'),
    countriesList: document.querySelector('.countries-list'),
    languages: document.querySelector('.languages'),
}
function fetchCountries(searchQuery) {
    searchQuery.preventDefault();
    const value = refs.input.value;
    fetch(`https://restcountries.eu/rest/v2/name/${value}`)
        .then(response => {
            if (response.ok === false) {
                 alert({
        text: 'You text invalid!Please, try again!'
    })
             }
            return response.json()
                .then(data => {
                    console.log(data);
                    if (data.length > 10) {
                        alertToMuchFound();
                    }
                    else if (data.length >= 2 && data.length < 10) {
                        renderCountriesList(data);
                    }
                    else {
                        countryFullInfo(data[0]);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
};
function alertToMuchFound() {
    alert({
        text: 'Too many mathces found.Please enter a more specific query!'
    })
}
function createItem({ name }) {
    // const listItem = `
    // <li>${name}</li>
    //  `
    refs.countriesList.innerHTML += `<li>${name}</li>`;
}
function renderCountriesList(arr) {
    arr.forEach(el => createItem(el));
}
function countryFullInfo(obj) {
    const listItem = `
    <h1>${obj.name}</h1>
    <ul class = "capital-list">
    <li>Capital: ${obj.capital}</li>
    <li>Population: ${obj.population}</li></ul>
    <ul class="languages_list"><h3 class = "languages__heading">Languages:</h3>
                ${obj.languages.map(value => `<li class="language">${value.name}</li>`).join(" ")}
              </ul>
        <img src='${obj.flag}', alt = '${obj.name}'>
     `
    refs.countriesList.innerHTML =  `${listItem}`;
}

