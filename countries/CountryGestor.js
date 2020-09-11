const Country = require('./Country');

function createCountries(countries) {
    return new Promise((resolve, reject) => {
        countries.forEach((country, index) => {
            Country.findOne({where: {country: country.country}}).then(result => {
                if (!(result instanceof Country)) {
                    Country.create({
                        country: country.country,
                        code: country.code,
                        flag: country.flag
                    }).then(registro => {
                        console.log("Pais criado com sucesso ID: " + registro.id);
                        if (index === countries.length - 1) resolve(registro);
                    }).catch(err => {
                        console.log("Erro ao criar o pais:" + country.country);
                        console.log(err);
                        if (index === countries.length - 1) reject(err);
                    });
                } else {
                    if (index === countries.length - 1) resolve("Nenhum novo item");
                }
            }).catch(err => {
                console.log(err);
                if (index === countries.length - 1) reject(err);
            })
        })
    });
}

function countryDestroy(country_id){
    return new Promise((resolve, reject) => {
        Country.destroy({
            where: {
                id: country_id
            }
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err)
        })
    })

}

module.exports = {createCountries, countryDestroy};