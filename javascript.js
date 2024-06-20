let upInput = document.querySelector('#upInput');
let upDetail = document.querySelector('#upDetail');
let downInput = document.querySelector('#downInput');
let downDetail = document.querySelector('#downDetail');
let link = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_DLZkxcWsHFSYbop4qgIiM1HCyjkmK077ecrGf9iE'
let responseData;
let currShort;
let rates;

// function for creating child
let newChild = function(attribute, text) {
    let option = document.createElement("option");
    option.setAttribute('value', attribute)
    option.textContent = text
    return option
}

// Extracting currency from api
let myFunction = function () {
    fetch(link)
        .then(res => res.json())
        .then(data => {
            responseData = data.data
            console.log(responseData);
            for (const currency in responseData) {
                    rates = responseData[currency].toFixed(3);
                    currShort = currency
                    let final = newChild(currency , currency)
                    upDetail.appendChild(final);
                    downDetail.appendChild(newChild(currency , currency));
            }
        })
}
myFunction()

//  Function for calculation
upInput.addEventListener('keyup', () => {
    let pickedUpCurrency = upDetail.options[upDetail.selectedIndex].value;
    let pickedDownCurrency = downDetail.options[downDetail.selectedIndex].value;
    downInput.value = (upInput.value / responseData[pickedUpCurrency] * responseData[pickedDownCurrency]).toFixed(5)
})

downInput.addEventListener('keyup', () => {
    let pickedUpCurrency = upDetail.options[upDetail.selectedIndex].value;
    let pickedDownCurrency = downDetail.options[downDetail.selectedIndex].value;
    upInput.value = (downInput.value / responseData[pickedDownCurrency] * responseData[pickedUpCurrency]).toFixed(5)
})