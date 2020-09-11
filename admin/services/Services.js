const urlBase = "https://api-football-v1.p.rapidapi.com/v2";
const axios = require("axios");

function getLeaguesByCountry(country, year){
return new Promise((resolve, reject) => {
    var service = '/leagues/country/';
    var url = urlBase+service+country+'/'+year;
    axios({
        "method":"GET",
        "url":url,
        "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
            "x-rapidapi-key":"c962880776msh8bdf830ff0f9578p11b3fbjsnd73619def3fe",
            "useQueryString":true
        }
    })
        .then((response)=>{
            console.log(response)
            resolve(response)
        })
        .catch((error)=>{
            reject(error)
        })
})
}

module.exports = getLeaguesByCountry;