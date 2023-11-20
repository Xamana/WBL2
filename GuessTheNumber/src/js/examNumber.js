export default function examNumber(randomNumber, first, second, tray) {
    const answerNumber = +document.getElementById('answer__input').value;
    const output = document.querySelector('.output__response');
    let help = '';

    console.log(randomNumber)

    if (!answerNumber) {
        return;
    }

    if (answerNumber < first || answerNumber > second) {
        output.innerText = `Введите число в диапазоне между ${first} и ${second}`
        return;
    }

    if (tray >= 3) {
        help = randomNumber % 2 === 0 ? 'Подсказка число четное' : 'Подсказка число не четное'
    }

    if(answerNumber === +randomNumber) {
        output.innerText = `Поздравляю, вы угадали число. Попыток: ${tray}`;
    } else if (answerNumber < +randomNumber) {
        output.innerText = `Вы не угадали, загаданное число больше. ${help}`;
    } else if (answerNumber > +randomNumber) {
        output.innerText = `Вы не угадали, загаданное число меньше. ${help}`;
    }
}