import Phaser from 'phaser';

class SplashScene extends Phaser.Scene {
    constructor() {
        super('SplashScene');
    }

    create() {
        // Background
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        // City
        this.city = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'city');
        this.city.setOrigin(0, 1);
        this.city.x = 0;
        this.city.y = this.game.config.height;

        // // Logo
        this.logo = this.add.image(this.game.config.width / 2, this.game.config.height / 3, 'logo');

        // Press enter label
        this.pressEnterLabel = this.add.bitmapText(
            this.game.config.width / 2,
            this.game.config.height / 1.7,
            'pixelFont',
            'PRESS ENTER',
            30,
        );

        this.pressEnterLabel.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: this.pressEnterLabel,
            duration: 1000,
            alpha: { from: 1, to: 0 },
            repeat: -1,
            yoyo: true,
        });

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        this.city.tilePositionX += 0.2;

        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start('GameScene');
        }
    }
}

export default SplashScene;
