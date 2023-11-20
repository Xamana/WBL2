const newGameButton = document.querySelector('.newGame__button');

function game() {

    const area = document.querySelector('.area');
    const blocWinner = document.querySelector('.winner');
    const spanWinner = document.querySelector('.span__winner');
    const whoMove = document.querySelector('.spanWhoMove');

    area.innerHTML = ''

    let step = ''
    let winner = ''
    let count = 0;
    
    for (let i = 0; i < 9; i++) {
        area.innerHTML += `<div class='blockItem'></div>`
    }

    const blockItem = document.querySelectorAll('.blockItem');

    const who = () => {
        if (step === 'circle') {
            whoMove.innerText = step;
            step = 'cross'
        } else {
            whoMove.innerText = step;
            step = 'circle'
        }
    }

    who();

    blockItem.forEach((item) => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('circle') && !item.classList.contains('cross')) {
                item.classList.add(step)
                if (step === 'circle') {
                    item.innerText = 'X';
                } else if (step === 'cross') {
                    item.innerText = 'O';
                }
                count++;
                circleWin();
                corssWin();
                draw()
            }
            who();
        })
    });

    const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [3,6,9],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    const circleWin = () => {
        for (let i = 0; i < win.length; i++) {
            if (
                blockItem[win[i][0]].classList.contains('circle') &&
                blockItem[win[i][1]].classList.contains('circle') &&
                blockItem[win[i][2]].classList.contains('circle')
            ) {
                blockItem[win[i][0]].classList.add('winCollor')
                blockItem[win[i][1]].classList.add('winCollor')
                blockItem[win[i][2]].classList.add('winCollor')
                winner = 'Крестики';
                endGame(winner);
                return 1;
            }
        }
    }

    const corssWin = () => {
        for (let i = 0; i < win.length; i++) {
            if (
                blockItem[win[i][0]].classList.contains('cross') &&
                blockItem[win[i][1]].classList.contains('cross') &&
                blockItem[win[i][2]].classList.contains('cross')
            ) {
                blockItem[win[i][0]].classList.add('winCollor')
                blockItem[win[i][1]].classList.add('winCollor')
                blockItem[win[i][2]].classList.add('winCollor')
                winner = 'Нулики';
                endGame(winner);
                return 1;
            }
        }
    }

    const draw = () => {
        if (!corssWin && !circleWin && count >= 9) {
            winner = 'Ничья';
            endGame(winner);
        }
    }

    const endGame = (winner) => {
        area.style.pointerEvents = 'none';
        blocWinner.style.display = 'flex';
        spanWinner.innerText = winner;
    }

}


newGameButton.addEventListener('click', ()=> {
    document.location.reload();
})
game();
