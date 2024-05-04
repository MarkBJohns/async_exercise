console.debug('Async / Await Numbers')
// ==============================================================
//      STEP ONE
// ==============================================================

async function getNumberObj(num){
    const url = `http://numbersapi.com/${num}/?json`
    
    const dataObj = await axios.get(url)
    return dataObj.data
}

console.log(`getNumberObj(10):`)
console.log(getNumberObj(10));

// ==============================================================
//      STEP TWO
// ==============================================================

async function getFactsForNumArr(arr) {
    const factsArr = [];
    
    arr.forEach(num => {
        factsArr.push(getNumberObj(num))
    });
    
    return await Promise.all(factsArr)
}

console.log(`getFactsforNumArr([1, 2, 3]):`);
console.log(getFactsForNumArr([1, 2, 3]));

// ==============================================================
//      STEP THREE
// ==============================================================

async function getMultipleFacts(num) {
    let factsArr = Array(4).fill(num);
    
    factsArr = factsArr.map(num => getNumberObj(num));
    
    return await Promise.all(factsArr)
}

console.log(`getMultipleFacts(100):`);
console.log(getMultipleFacts(100));

// ==============================================================
//      EVENT LISTENERS
// ==============================================================

function liText(str) {
    return `<li>${str}</li>`
}

const factsList = document.querySelector('#number-facts');
const multiNumberForm = document.querySelector('#multi-numbers');
const multiFactsForm = document.querySelector('#multi-facts');

multiNumberForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const numbersInput = document.querySelector('#numbers');
    const numbers = numbersInput.value.split(',').map(Number);
    
    factsList.innerHTML = '';
    
    const results = await getFactsForNumArr(numbers);
    
    results.forEach(result => {
        factsList.innerHTML += liText(result.text);
    });
    
    numbersInput.value = '';
})

multiFactsForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const factsInput = document.querySelector('#facts');
    const number = parseInt(factsInput.value);
    
    results = await getMultipleFacts(number);
    
    results.forEach(result => {
        factsList.innerHTML += liText(result.text)
    });
    
    factsInput.value = '';
})