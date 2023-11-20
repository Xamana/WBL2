import randomNumber from "./randomNumber.js";
import examNumber from "./examNumber.js";

function GameFindNumber() {
    const firstNumber = document.getElementById('first-number').value;
    const secondNumber = document.getElementById('second-number').value;
    const answerButton = document.getElementById('answer-button');
    let trays = 0;

    const hiddenNumber = randomNumber(firstNumber, secondNumber)
    
    answerButton.addEventListener('click', (event) => {
        trays++;
        examNumber(hiddenNumber, firstNumber, secondNumber, trays);

    })
}

const startButton = document.getElementById('start-button')

startButton.addEventListener('click', (event) => {GameFindNumber()})

GameFindNumber()
