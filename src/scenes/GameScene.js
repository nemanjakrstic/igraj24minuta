import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Background
        this.background = this.add.image(0, 0, 'studio');
        this.background.setOrigin(0, 0);

        // Ground
        this.ground = this.add.tileSprite(0, 0, this.game.config.width, 120, 'ground');
        this.physics.add.existing(this.ground);
        this.ground.setOrigin(0, 1);
        this.ground.x = 0;
        this.ground.y = this.game.config.height;
        this.ground.body.immovable = true;

        this.anims.create({
            key: 'player.walking',
            frames: this.anims.generateFrameNames('player'),
            frameRate: 10,
            repeat: -1,
        });

        this.player = this.physics.add.sprite(50, this.game.config.height - 200, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(0, 1);
        // this.player.play('player.walking');

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.player.setGravityY(500);
    }

    update() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-100);
            this.player.play('player.walking', true);
            this.player.flipX = true;
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(100);
            this.player.flipX = false;
            this.player.play('player.walking', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.stop();
        }

        if (this.physics.collide(this.player, this.ground) && Phaser.Input.Keyboard.JustDown(this.spaceBarKey)) {
            this.player.anims.stop();
            this.player.setVelocityY(-400);
        }
    }
}

export default GameScene;
