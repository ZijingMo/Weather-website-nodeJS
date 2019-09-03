const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b31169fd1b7a681ffd7eea95a94def01/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find the location..', undefined)
        } else {
            callback(undefined, `Current weather conditions: ${body.currently.summary}, ${body.currently.temperature} degrees out, ${(body.currently.precipProbability).toFixed(2) * 100}% chance of rain, ${(body.currently.humidity).toFixed(2) * 100}% outdoor humidity, ${(body.currently.visibility).toFixed(2)} miles visibility. Tomorrow weather conditions: ${body.daily.data[1].summary} ${body.daily.data[1].temperatureHigh} degrees high, ${body.daily.data[1].temperatureLow} degrees low, ${body.daily.data[1].uvIndex} UV Index.`)
        }
    })
}

module.exports = forecast