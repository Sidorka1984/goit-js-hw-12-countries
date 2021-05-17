const DATA_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(name){
    
    let url = `${DATA_URL}${name}`
    return fetch(url).then(response => {
        if (response.ok) {
            return response.json();
    }
        throw new Error(response.statusText);
    })
  }
  
export default { fetchCountries };