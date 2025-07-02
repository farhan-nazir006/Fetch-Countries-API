let search_btn = document.querySelector(".Search_btn")
let input = document.querySelector(".input")
let fName = document.querySelector(".FullName p")
let borderNames = document.querySelector(".Borders p")
let capitalName = document.querySelector(".Capital p")
let CurrencyName = document.querySelector(".Currency p")
let countryFlag = document.querySelector(".Flag img")


const fetchCountries = async (searchInput) => {
  let data = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
  let response = await data.json();

  let key = Object.keys(response[0].currencies)[0]; // Geting value from currencies object
  CurrencyName.innerHTML = key;

  let FlagImgsrc = response[0].flags.png;     // Flag
  countryFlag.src = FlagImgsrc;


  let fullName = response[0].altSpellings;   // Country Full Name
  fullName.forEach(name => {
    fName.innerHTML = name;
  });

  let borders = response[0].borders;       // Country borders
  let borderString = '';
  for (let i = 0; i < borders.length; i++) {
    borderString += borders[i] + " ";
    borderNames.innerHTML = borderString;
  }

  response[0].capital.forEach(item => {      // Capital Name
    capitalName.innerHTML = item;
  });



}


search_btn.addEventListener("click", () => {
  let searchInput = input.value;

  if (!searchInput) {
    alert("Please ENter the country");
    return;
  }
  fetchCountries(searchInput);
})






