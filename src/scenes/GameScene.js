import Phaser from 'phaser';

const GRAVITY = 1000;
const PLAYER_MOVE_VELOCITY = 100;
const PLAYER_JUMP_VELOCITY = 500;

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.playerIsJumping = false;
        this.score = 0;
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

        // Arrow
        this.arrow = this.physics.add.image(770, 420, 'arrow');
        this.arrow.setScale(3);
        this.arrow.setVisible(false);

        this.tweens.add({
            targets: this.arrow,
            duration: 1000,
            y: { from: 420, to: 430 },
            ease: 'sine.inout',
            repeat: -1,
            yoyo: true,
        });

        // Scripts
        this.scripts = this.physics.add.group();

        for (let i = 0; i < 3; i++) {
            const script = this.physics.add.image(200 + i * 200, 300, 'script');
            this.scripts.add(script);
        }

        this.tweens.add({
            targets: this.scripts.getChildren(),
            duration: 1000,
            y: { from: 300, to: 310 },
            ease: 'sine.inout',
            repeat: -1,
            yoyo: true,
        });

        // Player
        this.anims.create({
            key: 'player.walking',
            frames: this.anims.generateFrameNames('player', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'player.standing',
            frames: this.anims.generateFrameNames('player', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1,
        });

        this.player = this.physics.add.sprite(50, this.game.config.height - 120, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(1, 1);
        this.player.setGravityY(GRAVITY);
        this.player.play('player.standing', true);

        // Input
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Collisions
        this.physics.add.overlap(this.player, this.arrow, this.handleNextLevel, null, this);
        this.physics.add.overlap(this.player, this.scripts, this.handlePickUpScript, null, this);
        this.physics.add.overlap(this.player, this.ground, this.handlePlayerOnGround, null, this);
    }

    handleNextLevel() {
        if (this.arrow.visible) {
            this.scene.start('EnemyScene');
        }
    }

    setPlayerTexture(key) {
        if (this.player.texture.key !== key) {
            this.player.setTexture(key);
        }
    }

    handlePlayerOnGround() {
        this.playerIsJumping = false;
    }

    handlePickUpScript(player, script) {
        this.score++;
        this.sound.play('pickup');
        script.destroy();

        if (this.scripts.getLength() === 0) {
            this.arrow.setVisible(true);
        }
    }

    update() {
        this.physics.collide(this.player, this.ground);
        this.physics.collide(this.player, this.arrow);

        if (this.playerIsJumping) {
            this.setPlayerTexture('playerJump');
        } else {
            this.setPlayerTexture('player');
        }

        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-PLAYER_MOVE_VELOCITY);
            if (!this.playerIsJumping) this.player.play('player.walking', true);
            this.player.flipX = true;
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(PLAYER_MOVE_VELOCITY);
            this.player.flipX = false;
            if (!this.playerIsJumping) this.player.play('player.walking', true);
        } else {
            this.player.setVelocityX(0);
            if (!this.playerIsJumping) this.player.play('player.standing', true);
        }

        if (!this.playerIsJumping && Phaser.Input.Keyboard.JustDown(this.spaceBarKey)) {
            this.playerIsJumping = true;
            this.sound.play('jump');
            this.player.anims.stop();
            this.player.setVelocityY(-PLAYER_JUMP_VELOCITY);
        }
    }
}

export default GameScene;
