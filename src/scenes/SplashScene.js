import Phaser from 'phaser';
import background from '../images/background.png';
import ship from '../images/spritesheets/ship.png';
import ship2 from '../images/spritesheets/ship2.png';
import ship3 from '../images/spritesheets/ship3.png';
import explosion from '../images/spritesheets/explosion.png';
import powerUp from '../images/spritesheets/power-up.png';
import player from '../images/spritesheets/player.png';
import beam from '../images/spritesheets/beam.png';

class SplashScene extends Phaser.Scene {
    constructor() {
        super('SplashScene');
    }

    preload() {
        this.load.image('background', background);
        this.load.spritesheet('ship', ship, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('ship2', ship2, { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet('ship3', ship3, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('explosion', explosion, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('powerUp', powerUp, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player', player, { frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('beam', beam, { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        this.add.text(20, 20, 'Welcome...');
        this.scene.start('MainScene');

        this.anims.create({
            key: 'shipAnimation',
            frames: this.anims.generateFrameNames('ship'),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'ship2Animation',
            frames: this.anims.generateFrameNames('ship2'),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'ship3Animation',
            frames: this.anims.generateFrameNames('ship3'),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNames('explosion'),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        });

        this.anims.create({
            key: 'red',
            frames: this.anims.generateFrameNames('powerUp', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'gray',
            frames: this.anims.generateFrameNames('powerUp', { start: 2, end: 3 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'thrust',
            frames: this.anims.generateFrameNames('player'),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'beam',
            frames: this.anims.generateFrameNames('beam'),
            frameRate: 20,
            repeat: -1,
        });
    }
}

export default SplashScene;
