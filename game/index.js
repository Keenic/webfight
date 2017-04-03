import 'pixi';
import Phaser from 'phaser';
import config from './config/config';

// States
import InitState from './states/InitState';

class Game extends Phaser.Game {
    constructor() {
        const docElement = document.documentElement;
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

        super(width, height, Phaser.CANVAS, config.gameId, null);

        this.state.add('Init', InitState, false);

        this.state.start('Init');
    }
}

window.game = new Game();
