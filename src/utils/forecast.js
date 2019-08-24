const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/597097be46087f1907954a53c594e1d3/' + latitude + ',' + longitude + '?units=si&lang=nl'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            const graden = body.currently.temperature
            const kansOpRegen = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            const laagsteTemp = body.daily.data[0].temperatureLow
            const hoogsteTemp = body.daily.data[0].temperatureHigh
            callback(undefined, summary + " Het is momenteel " + graden + " graden met als hoogst gemeten tempratuur "+ hoogsteTemp +" graden en met als laagst gemeten tempratuur " + laagsteTemp + " graden. Er is " + kansOpRegen + "% kans op regen.")
        }
    })
}

module.exports = forecast