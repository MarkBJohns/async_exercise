console.debug("Number Facts")
// ==============================================================
//      STEP ONE
// ==============================================================

function getNumberObj(num) {
    const url = `http://numbersapi.com/${num}/?json`;
    
    return axios.get(url)
        .then(result => {
            const factObj = {
                found: result.data.found,
                number: result.data.number,
                text: result.data.text,
                type: result.data.type
            }
            return factObj
        })
        .catch(err => console.error(err))
}

getNumberObj(77)
    .then(result => console.log(result.text));

// ==============================================================
//      STEP TWO
// ==============================================================

function getFactsForNumArr(arr) {
    const factsArr = [];
    
    arr.forEach(num => {
        factsArr.push(
            getNumberObj(num)
        )
    });
    
    return Promise.all(factsArr)
        .catch(err => console.error(err))
}

getFactsForNumArr([1, 2, 3])
    .then(results => {
        results.forEach(result => {
            console.log(result.text)
        })
    })


// ==============================================================
//      STEP THREE
// ==============================================================

function getMultipleFacts(num) {
    let factsArr = Array(4).fill(num);
    
    factsArr = factsArr.map(num => getNumberObj(num));
    
    return Promise.all(factsArr)
        .catch(err => console.error(err))
}

getMultipleFacts(100)
    .then(results => {
        results.forEach(result => {
            console.log(result.text);
        })
    })
    
// ==============================================================
//      EVENT LISTENERS
// ==============================================================

function liText(str) {
    return `<li>${str}</li>`
}

const factsList = document.querySelector('#number-facts')

const multiNumberForm = document.querySelector('#multi-number')

const multiFactsForm = document.querySelector('#multi-facts')

multiNumberForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const numbersInput = document.getElementById('numbers');
    const numbers = numbersInput.value.split(',').map(Number);
    
    getFactsForNumArr(numbers)
        .then(results => {
            factsList.innerHTML = '';
            results.forEach(result => {
                factsList.innerHTML += liText(result.text);
            })
        })
        .catch(error => console.error(error));
});

multiFactsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const numbersInput = document.getElementById('facts');
    const number = parseInt(numbersInput.value)
    
    getMultipleFacts(number)
        .then(results => {
            factsList.innerHTML = '';
            results.forEach(result => {
                factsList.innerHTML += liText(result.text);
            });
        })
        .catch(error => console.error(error))
});