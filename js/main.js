/* All html tag dom id */
const searchBtn = document.getElementById('search-btn');
const searchFiled = document.getElementById('input-field');
const countriesContainer = document.getElementById('countries-container');
const countryDetails = document.getElementById('Country-details');
const searchError = document.getElementById('search-error');

/* Add event handler */
searchBtn.addEventListener('click', function(){
    const search = searchFiled.value;

    /* search value clear */
    searchFiled.value = '';
    /* Country Details clear */
    countryDetails.textContent = '';
    /* Empty Error handling */
    if(search === ''){
        searchError.innerHTML = `<h2 class= "fw-bold text-center text-danger">Search Flied Cann't be Empty</h2>`;
    }
    else{
        searchError.innerHTML = '';
    };

    /* Search Data fetch */
    const url = `https://restcountries.eu/rest/v2/name/${search}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearch(data))
});

/* Display Countries Show */
const displaySearch = countries => {

    /* Result Error Handling */
    if(countries.status === 404){
        searchError.innerHTML = `<h2 class= "fw-bold text-center text-danger">Not Result Found</h2>`;
    }
    else{
        searchError.innerHTML = '';
    };

    /* search container dom clear */
    countriesContainer.textContent = '';
    countries.forEach(country => {
        // console.log(country.name);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${country.flag}" class="card-img-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${country.name}</h5>
                        <p class="card-text fw-lighter">Capital: ${country.capital}</p>
                        <button onclick= "countriesDetails('${country.alpha3Code}')" type="button" class="btn btn-outline-info">See More</button>
                    </div>
            </div>
        `;
        countriesContainer.appendChild(div);
    })
};
const countriesDetails =alpha3Code =>{
    /* Countries Details */
    const url = `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displyCountriesDetails(data));
};

/* Display Countries Show */
const displyCountriesDetails = details =>{
    console.log(details.currencies[0].name);
    countryDetails.innerHTML = `
    <div class="card">
    <img src="${details.flag}" class="card-img-top img-fluid">
    <div class="card-body">
      <h6 class="card-title fw-bold">Currencies Name : ${details.currencies[0].name} </br> Currencies Symbol: ${details.currencies[0].symbol}</h6>
      <p class="card-text fw-lighter">Region: ${details.region}</p> 
    </div>
  </div>`;
}