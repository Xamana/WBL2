export default function randomNumber(fristNum, secondNum) {
    return Math.floor(Math.random() * (+secondNum - +fristNum + 1)) + +fristNum;
}