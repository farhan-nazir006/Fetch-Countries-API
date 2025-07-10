let search_btn = document.querySelector(".Search_btn");
let input = document.querySelector(".input");
let fName = document.querySelector(".FullName p");
let borderNames = document.querySelector(".Borders p");
let capitalName = document.querySelector(".Capital p");
let CurrencyName = document.querySelector(".Currency p");
let countryFlag = document.querySelector(".Flag img");
let recentContainer = document.getElementById("recentSearches");



let recentCountries = [];


function displayCountryData(response) {

  // Currency
  let key = Object.keys(response.currencies)[0];

  CurrencyName.innerHTML = key;

  // Flag
  countryFlag.src = response.flags.png;

  // Full Name
  response.altSpellings.forEach(item => {
    fName.innerHTML = item;
  })
    ;

  // Borders
  let borders = response.borders;

  // Country borders
  let borderString = '';
  for (let i = 0; i < borders.length; i++) {
    borderString += borders[i] + " ";
    borderNames.innerHTML = borderString;
  }

  // Capital
  capitalName.innerHTML = response.capital?.[0];
}

// Function to update recent search boxes
function updateRecentSearches(countryName, countryData) {


  recentCountries = recentCountries.filter(item => item.name !== countryName);

  recentCountries.unshift({ name: countryName, data: countryData });

  if (recentCountries.length > 4) recentCountries.pop();


  recentContainer.innerHTML = `<h3 class="text-black text-2xl font-bold mb-2">Recent Searches</h3>`;

  recentCountries.forEach((item) => {
    let box = document.createElement('div');
    box.innerHTML = `<p class="text-base text-gray-900 font-semibold">${item.name}</p>`;
    box.addEventListener("click", () => displayCountryData(item.data));
    recentContainer.appendChild(box);
    box.className = "w-full bg-white/70 p-4 rounded-lg shadow-md border border-gray-300 relative cursor-pointer hover:bg-white/90 transition";   // styling
  })
}

// Fetch country data from API
const fetchCountries = async (searchInput) => {
  let data = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
  let response = await data.json();

  let countryData = response[0];

  // Display and store
  displayCountryData(countryData);
  updateRecentSearches(countryData.name.common, countryData);
};

// On search button click
search_btn.addEventListener("click", () => {
  let searchInput = input.value.trim();

  if (!searchInput) {
    alert("Please enter a country name.");
    return;
  }

  fetchCountries(searchInput);
  input.value = ""; // clear input
});
