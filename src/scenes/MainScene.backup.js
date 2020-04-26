import sky from '../images/sky.png';
import platform from '../images/platform.png';
import diamond from '../images/diamond.png';
import woof from '../images/woof.png';
import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('platform', platform);
        this.load.image('diamond', diamond);
        this.load.spritesheet('woof', woof, { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.skySprite = this.add.sprite(0, 0, 'sky');
        this.skySprite.setScale(2);

        this.platforms = this.add.group();

        this.ground = this.platforms.create(0, 600 - 64, 'platform');
        this.ground.setScale(4);
        console.log(this.ground);

        this.player = this.add.sprite(32, 32, 'woof');
    }

    update() {
        //
    }
}

export default MainScene;
