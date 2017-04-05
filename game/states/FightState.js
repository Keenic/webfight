import Phaser from 'phaser'
import config from '../config/config';

export default class FightState extends Phaser.State {
    init(playerNo) {
        this.stage.backgroundColor = '#000'

        const player1Position = {
            x: config.gameWidth / 3.75,
            y: config.gameHeight / 1.5
        };
        const player2Position = {
            x: config.gameWidth / 1.25,
            y: config.gameHeight / 1.5
        }


        this.playerPosition = playerNo === 1 ? player1Position : player2Position;
        this.enemyPlayerPosition = playerNo === 2 ? player1Position : player2Position;

    }

    preload() {
        this.load.image('player1', require('../characters/player1/player1.png'));
    }

    create() {
        this.player = this.add.sprite(this.playerPosition.x, this.playerPosition.y, 'player1');
        this.player.anchor.setTo(0.5,0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE)

        this.enemyPlayer = this.add.sprite(this.enemyPlayerPosition.x, this.enemyPlayerPosition.y, 'player1');
        this.enemyPlayer.anchor.setTo(0.5,0.5);
        this.physics.enable(this.enemyPlayer, Phaser.Physics.ARCADE)

        this.cursors = this.input.keyboard.createCursorKeys();

        window.socket.on('enemyPlayerMove', (data) => {
            this.enemyPlayer.x = data.x;
            this.enemyPlayer.y = data.y;
        });
    }

    move(direction) {
        switch(direction) {
            case 'up':
                this.player.y -= 5;
                break;
            case 'down':
                this.player.y += 5;
                break;
            case 'left':
                this.player.x -= 5;
                break;
            case 'right':
                this.player.x += 5;
                break;
        };
        const playerData = {
            clientId: window.clientId,
            position: {
                x: this.player.position.x,
                y: this.player.position.y,
            }
        };

        window.socket.emit('playerPosition', playerData);
    }

    update() {
        if (this.cursors.up.isDown) {
            this.move('up');
        }
        if (this.cursors.down.isDown) {
            this.move('down');
        }
        if (this.cursors.left.isDown) {
            this.move('left');
        }
        if (this.cursors.right.isDown) {
            this.move('right');
        }
    }
}
