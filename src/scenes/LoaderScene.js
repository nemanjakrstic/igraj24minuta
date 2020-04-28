import Phaser from 'phaser';
import background from '../images/background.png';
import city from '../images/city.png';
import logo from '../images/logo.png';
import fontSprite from '../fonts/font.png';
import fontData from '../fonts/font.xml';

class LoaderScene extends Phaser.Scene {
    constructor() {
        super('LoaderScene');
    }

    preload() {
        // SplashScene assets
        this.load.image('background', background);
        this.load.image('city', city);
        this.load.image('logo', logo);
        this.load.bitmapFont('pixelFont', fontSprite, fontData);
    }

    init() {
        this.loaderText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, '0 %');

        this.load.on('progress', progress => {
            this.loaderText.text = Math.round(progress * 100) + ' %';
        });

        this.load.once('complete', () => {
            setTimeout(() => this.scene.start('SplashScene'), 1000);
        });
    }
}

export default LoaderScene;
