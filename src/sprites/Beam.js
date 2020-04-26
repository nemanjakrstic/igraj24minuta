import Phaser from 'phaser';

class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, scene.player.x, scene.player.y - 16, 'beam');
        scene.add.existing(this);
        scene.beams.add(this);
        this.play('beam');
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250;
    }

    update() {
        if (this.y < 32) {
            this.destroy();
        }
    }
}

export default Beam;
