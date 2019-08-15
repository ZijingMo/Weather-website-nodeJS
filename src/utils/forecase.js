const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b31169fd1b7a681ffd7eea95a94def01/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find the location..', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${(body.currently.precipIntensity).toFixed(2) * 100}% chance of rain.`
            )
        }
    })
}

module.exports = forecast