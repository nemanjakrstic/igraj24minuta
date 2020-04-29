import Phaser from 'phaser';
import background from '../images/background.png';
import city from '../images/city.png';
import logo from '../images/logo.png';
import ground from '../images/ground.png';
import studio from '../images/studio.png';
import table from '../images/table.png';
import step from '../images/step.png';
import player from '../images/player.png';
import script from '../images/script.png';
import fontSprite from '../fonts/font.png';
import pickup from '../sounds/pickup.mp3';
import theme from '../sounds/theme.mp3';
import jump from '../sounds/jump.mp3';
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

        // GameScene assets
        this.load.image('ground', ground);
        this.load.image('studio', studio);
        this.load.image('table', table);
        this.load.image('step', step);
        this.load.spritesheet('player', player, { frameWidth: 54, frameHeight: 100 });
        this.load.image('script', script);
        this.load.audio('pickup', pickup);
        this.load.audio('jump', jump);
        this.load.audio('theme', theme);
    }

    init() {
        this.loaderText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, '0 %');

        this.load.on('progress', progress => {
            this.loaderText.text = Math.round(progress * 100) + ' %';
        });

        this.load.once('complete', () => {
            // setTimeout(() => this.scene.start('SplashScene'), 1000);
            // this.scene.start('GameScene');
            this.scene.start('EnemyScene');
        });
    }
}

export default LoaderScene;
