import Game from './game/game.js';
import View from './game/view.js';
import Controller from './game/controller.js';

const element = document.querySelector('#game');

const game = new Game();
const view = new View(element, 480, 640, 20, 10);
const controller = new Controller(game, view);




