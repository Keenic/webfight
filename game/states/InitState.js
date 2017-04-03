import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#000'
    }

    preload() {

        let text = this.add.text(this.world.centerX, this.world.centerY, 'WebFight', { font: '16px Arial', fill: '#fff', align: 'center' })
        text.anchor.setTo(0.5, 0.5)
    }

    render() {
    }
}
