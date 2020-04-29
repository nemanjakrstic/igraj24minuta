import Phaser from 'phaser';

const GRAVITY = 1000;
const PLAYER_MOVE_VELOCITY = 100;
const PLAYER_JUMP_VELOCITY = 500;

class EnemyScene extends Phaser.Scene {
    constructor() {
        super('EnemyScene');
        this.score = 0;
        this.playerIsJumping = false;
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

        // Script
        this.script = this.physics.add.image(675, 360, 'script');
        this.script.setVisible(false);

        this.tweens.add({
            targets: this.script,
            duration: 1000,
            y: { from: 360, to: 370 },
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

        // Enemy
        this.anims.create({
            key: 'enemy.standing',
            frames: this.anims.generateFrameNames('enemy'),
            frameRate: 5,
            repeat: -1,
        });

        this.enemy = this.physics.add.sprite(400, this.game.config.height - 120, 'enemy');
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setOrigin(1, 1);
        this.enemy.setGravityY(GRAVITY);
        this.enemy.play('enemy.standing', true);

        // Table
        this.table = this.add.image(0, 0, 'table');
        this.table.setOrigin(1, 1);
        this.table.x = this.game.config.width - 20;
        this.table.y = this.game.config.height - 120;
        this.table.setZ(1);

        // Table Step
        this.step = this.physics.add.image(0, 0, 'step');
        this.step.setOrigin(1, 1);
        this.step.x = this.game.config.width - 20;
        this.step.y = this.game.config.height - 120;
        this.step.body.immovable = true;

        // Input
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Collisions
        this.physics.add.overlap(this.player, this.script, this.handlePickUpScript, null, this);
        this.physics.add.overlap(this.player, this.ground, this.handlePlayerOnGround, null, this);
        this.physics.add.overlap(this.player, this.step, this.handlePlayerOnGround, null, this);
        this.enemyOverlap = this.physics.add.overlap(this.player, this.enemy, this.handleJumpOnEnemy, null, this);
    }

    handlePickUpScript(player, script) {
        script.destroy();
        this.sound.stopAll();
        this.sound.play('outro');
        console.log('Game Over!');
    }

    handlePlayerOnGround() {
        this.playerIsJumping = false;
    }

    handleJumpOnEnemy() {
        this.sound.play('pickup');
        this.script.setVisible(true);
        this.enemyOverlap.destroy();
        this.enemy.setCollideWorldBounds(false);

        this.tweens.add({
            targets: this.enemy,
            duration: 1000,
            y: { from: this.enemy.y, to: this.game.config.height + this.enemy.height },
            ease: 'sine.inout',
            repeat: 0,
            onComplete: () => this.enemy.destroy(),
        });
    }

    setPlayerTexture(key) {
        if (this.player.texture.key !== key) {
            this.player.setTexture(key);
        }
    }

    update() {
        this.physics.collide(this.player, this.ground);
        this.physics.collide(this.player, this.step);
        this.physics.collide(this.enemy, this.ground);

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

export default EnemyScene;
