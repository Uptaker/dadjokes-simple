const jokeButton = document.querySelector('#newJoke');
const jokes = document.querySelector('#jokes');
const curJoke = document.querySelector('#curJoke');
const save = document.querySelector('#save');
const showHistory = document.querySelector('#history');
let logJoke = false;

async function getDadJoke() {
    try {
        const config = {headers: {Accept: 'application/json'}}; // configures the header (2nd argument)
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    } catch(e) {
        console.log('Failed to fetch:', e);
        logJoke = false;
        return "Failed to fetch joke.. :(";
    }
}

async function addNewJoke() {
    jokeButton.style.border = '1px solid black';
    jokeButton.disabled = true;
    if (logJoke) {  //save old joke
        let oldText = curJoke.innerText;
        const oldJoke = document.createElement('li')
        oldJoke.append(oldText);
        jokes.prepend(oldJoke);
        showHistory.classList.remove('hidden');
    } // set current joke
    curJoke.innerText = "Fetching... Please wait";
    const jokeText = await getDadJoke();
    curJoke.innerText = jokeText;
    logJoke = true;
    jokeButton.disabled = false;
    jokeButton.style.border = '1px solid lightgray'
}

function copyToClipboard() {
    window.prompt("Copy to clipboard: Ctrl + C, Enter", curJoke.innerText);
}

jokeButton.addEventListener('click', addNewJoke);
save.addEventListener('click', copyToClipboard);
// let btcEur = document.querySelector('#btcPrice');
// AJAX WITH FETCH
// async function getBitcoinPrice() {
//     try {
//     const res = await fetch('https://api.cryptonator.com/api/ticker/btc-eur');
//     console.log('RESPONSE, WAITING TO PARSE...', res);
//     const data = await res.json();
//     console.log(data.ticker.price);
//     } catch (e) {
//         console.log('ERROR:', e)
//     }
// }

// AJAX WITH .then's
//     .then (data => {
//         console.log('DATA PARSED...', data);
//         let price = data.ticker.price;
//         price = parseFloat(price).toFixed(4);
//         btcEur.innerText = `1 BitCoin = ${(price)} EUR`; 
//     })
//     .catch(e => {
//         console.log('ERROR', e);
//     })
// }

//AJAX WITH AXIOM
// axios.get('https://api.cryptonator.com/api/ticker/btc-eur')
//     .then(res => {
//         console.log(res.data.ticker.price);
//     })
//     .catch(err => {
//         console.log("ERROR!", err);
//     })

// async function getBitcoinPrice() {
//     try {
//         const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-eur')
//         console.log(res.data.ticker.price)
//     } catch(e) {
//         console.log("ERROR ERROR ERROR", e)
//     }
// }