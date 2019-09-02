//console.log('Clinet side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + address)
    .then((res) => {
            res.json()
            .then((data) => {      
                if (data.error) {
                    console.log('Something wrong for data fetch:' + data.error)
                    messageOne.textContent = data.error
                } else {
                    console.log(data.location)
                    console.log(data.forecast)
                    messageOne.textContent = `${data.location}`
                    messageTwo.textContent = `${data.forecast}`
                }
            }) 
        /* 
            //catch() method for error handler
            .catch(err => {
                console.log(err)
                messageOne.textContent = 'Opps! The address you inputed is incorrect. Please restart the application from the server side.'
                messageTwo.textContent = `${err}`
            }) 
        */
    //console.log(address)
    })
})

