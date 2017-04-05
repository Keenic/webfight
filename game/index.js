import 'pixi';
import Phaser from 'phaser';
import config from './config/config';

// States
import InitState from './states/InitState';
import FightState from './states/FightState';

window.socket = io('/fight');

class Game extends Phaser.Game {
    constructor() {
        const docElement = document.documentElement;
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

        super(width, height, Phaser.CANVAS, config.gameId, null);

        this.state.add('Init', InitState, false);
        this.state.add('Fight', FightState, false);

        window.socket.emit('joinningFight', {clientId: window.clientId});
        window.socket.on('joinedFight', (data) => {
            this.state.start('Fight', true, false, data.playerNo);
        });
    }
}

window.socket.on('connected', (data) => {
    window.clientId = data.clientId;
    window.game = new Game();
});

