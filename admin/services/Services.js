const urlBase = "https://api-football-v1.p.rapidapi.com/v2";
const axios = require("axios");
const League = require('../../leagues/League');
const header = {
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
    "x-rapidapi-key":"c962880776msh8bdf830ff0f9578p11b3fbjsnd73619def3fe",
    "useQueryString":true
};

function getLeaguesByCountry(country, year){
return new Promise((resolve, reject) => {
    var service = '/leagues/country/';
    var url = urlBase+service+country+'/'+year;
    axios({
        "method":"GET",
        "url":url,
        "headers":header
    })
        .then((response)=>{
            resolve(response.data.api.leagues)
        })
        .catch((error)=>{
            reject(error)
        })
})
}
function getTeamsByLeague(league){
    return new Promise((resolve, reject) => {
        var service = '/teams/league/';
        var url = urlBase+service+league.league_api_id;
        axios({
            "method":"GET",
            "url":url,
            "headers":header
        })
            .then((response)=>{
                resolve(response.data.api.teams)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}

module.exports = {getLeaguesByCountry, getTeamsByLeague};