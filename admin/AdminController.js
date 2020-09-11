const express = require('express');
const router = express.Router();
const Service = require('./services/Services');
router.get('/', (req, res) => {

});

router.get('/services/get-leagues/:country/:year?', (req, res) => {
    var year;
    if (req.params.year ===undefined) {
        year = 2020;
    } else {
        year = req.params.year;
    }
    getLeagues(req.params.country)

});

async function getLeagues(country, year){
    Service(country, year)
}
module.exports = router;