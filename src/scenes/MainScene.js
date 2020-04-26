import Phaser from 'phaser';
import config from '../config';
import Beam from '../sprites/Beam';

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
        this.background.setOrigin(0, 0);

        this.ship = this.add.sprite(config.width / 2 - 50, config.height / 2, 'ship');
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, 'ship3');

        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');

        this.beams = this.add.group();

        this.player.play('thrust');
        this.player.setCollideWorldBounds(true);

        this.powerUps = this.physics.add.group();

        const maxObjects = 4;

        for (let i = 0; i <= maxObjects; i++) {
            const powerUp = this.physics.add.sprite(16, 16, 'powerUp');
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, config.width, config.height);

            if (Math.random() > 0.5) {
                powerUp.play('red');
            } else {
                powerUp.play('gray');
            }

            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        this.ship.play('shipAnimation');
        this.ship2.play('ship2Animation');
        this.ship3.play('ship3Animation');

        this.ship.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);

        this.add.text(20, 20, 'Playing...');

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.add.collider(this.beams, this.powerUps, (beam, powerUp) => {
            beam.destroy();
        });

        this.enemies = this.add.group();
        this.enemies.add(this.ship);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.beams, this.enemies, this.hitEnemy, null, this);
    }

    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true);
    }

    hitEnemy(beam, ship) {
        console.log('wtf2');
        beam.destroy();
        this.resetShip(ship);
    }

    hurtPlayer(player, ship) {
        console.log('wtf');
        this.resetShip(ship);
        player.x = this.game.config.width / 2 - 8;
        player.y = this.game.config.height - 64;
    }

    update() {
        this.moveShip(this.ship, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.shootBeam();
        }

        for (let i = 0; i < this.beams.getChildren().length; i++) {
            this.beams.getChildren()[i].update();
        }
    }

    shootBeam() {
        const beam = new Beam(this);
    }

    moveShip(ship, speed) {
        ship.y += speed;

        if (ship.y > config.height) {
            this.resetShip(ship);
        }
    }

    resetShip(ship) {
        ship.y = 0;
        ship.x = Phaser.Math.Between(0, config.width);
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture('explosion');
        gameObject.play('explode');
    }

    movePlayerManager() {
        if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(200);
        } else if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-200);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(200);
        } else if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-200);
        } else {
            this.player.setVelocityY(0);
        }
    }
}

export default MainScene;
