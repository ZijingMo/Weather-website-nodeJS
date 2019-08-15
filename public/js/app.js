//console.log('Clinet side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'
//messageTwo.textContent = 'Hi'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + address).then((res) => {
            res.json().then((data) => {
            if (data.error) {
                console.log('Something wrong for data fetch:' + data.error)
                messageTwo.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = `${data.location}`
                messageTwo.textContent = `${data.forecast}`
            }
        })
      })  
    //console.log(address)
})

