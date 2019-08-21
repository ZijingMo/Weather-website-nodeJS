const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecase')
const app = express() 

// Define paths for Express cofig
// Navigate public files path
const publicDirectoryPath = path.join(__dirname, '../public') 
// Navigate handlebar 'view' path
const viewsPath = path.join(__dirname, '../templates/views') 
// Navigate handlebar 'partials' path
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // Handlerbar setup
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// 'index' page Handlebar
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zijing Mo'
    })
})

// 'about' page handlebar
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zijing Mo'
    })
})

// 'help' page handlebar
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        Helpmessage: 'Let us konw if you need any help',
        name: 'Zijing Mo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address..'
        })
    }
    //console.log(req.query.address)
    const inputLocation = req.query.address 
    console.log(inputLocation)
    if (!inputLocation) {
        console.log("Please input an address for our system >.<")
    } else {
        geocode(inputLocation, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }   
                //console.log(location)
                //console.log(forecastData)
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            })
        })
    }
})

// Products page
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }  
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

// 'help/404' handlebar
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        Errormessage: 'Help article not found.',
        name: 'Zijing Mo'
    })
})

// 'gerneral 404' handlebar
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        Errormessage: 'Page not found.',
        name: 'Zijing Mo'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
