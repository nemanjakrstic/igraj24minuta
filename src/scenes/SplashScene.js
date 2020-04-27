import Phaser from 'phaser';
import background from '../images/background.png';
import city from '../images/city.png';
import logo from '../images/logo.png';

class SplashScene extends Phaser.Scene {
    constructor() {
        super('SplashScene');
    }

    preload() {
        this.load.image('background', background);
        this.load.image('city', city);
        this.load.image('logo', logo);
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        this.city = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'city');
        this.city.setOrigin(0, 1);
        this.city.x = 0;
        this.city.y = this.game.config.height;

        this.logo = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'logo');
    }

    update() {
        this.city.tilePositionX += 0.25;
    }
}

export default SplashScene;
