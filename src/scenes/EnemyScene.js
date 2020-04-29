import Phaser from 'phaser';

const GRAVITY = 1000;
const PLAYER_MOVE_VELOCITY = 100;
const PLAYER_JUMP_VELOCITY = 500;

class EnemyScene extends Phaser.Scene {
    constructor() {
        super('EnemyScene');
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

        // Scripts
        this.scripts = this.physics.add.group();

        for (let i = 0; i < 2; i++) {
            const script = this.physics.add.image(200 + i * 200, 300, 'script');
            this.scripts.add(script);

            this.tweens.add({
                targets: script,
                duration: 1000,
                y: { from: 300, to: 310 },
                ease: 'sine.inout',
                repeat: -1,
                yoyo: true,
            });
        }

        this.lastScript = this.physics.add.image(675, 360, 'script');
        this.scripts.add(this.lastScript);

        this.tweens.add({
            targets: this.lastScript,
            duration: 1000,
            y: { from: 360, to: 370 },
            ease: 'sine.inout',
            repeat: -1,
            yoyo: true,
        });

        // Player
        this.anims.create({
            key: 'player.walking',
            frames: this.anims.generateFrameNames('player'),
            frameRate: 10,
            repeat: -1,
        });

        this.player = this.physics.add.sprite(50, this.game.config.height - 120, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(1, 1);
        this.player.setGravityY(GRAVITY);

        // Table
        this.table = this.add.image(0, 0, 'table');
        this.table.setOrigin(1, 1);
        this.table.x = this.game.config.width - 20;
        this.table.y = this.game.config.height - 120;
        this.table.setZ(1);

        // Input
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Collisions
        this.physics.add.overlap(this.player, this.scripts, this.handlePickUpScript, null, this);
    }

    handlePickUpScript(player, script) {
        this.sound.play('pickup');
        script.destroy();
    }

    update() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-PLAYER_MOVE_VELOCITY);
            this.player.play('player.walking', true);
            this.player.flipX = true;
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(PLAYER_MOVE_VELOCITY);
            this.player.flipX = false;
            this.player.play('player.walking', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.stop();
        }

        if (this.physics.collide(this.player, this.ground) && Phaser.Input.Keyboard.JustDown(this.spaceBarKey)) {
            this.sound.play('jump');
            this.player.anims.stop();
            this.player.setVelocityY(-PLAYER_JUMP_VELOCITY);
        }

        if (this.player.x === this.game.config.width) {
            //this.scene.start('EnemyScene');
        }
    }
}

export default EnemyScene;
