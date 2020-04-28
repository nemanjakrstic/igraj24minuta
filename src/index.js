import LoaderScene from './scenes/LoaderScene';
import SplashScene from './scenes/SplashScene';
import Phaser from 'phaser';

const game = new Phaser.Game({
    width: 800,
    height: 600,
    type: Phaser.CANVAS,
    parent: 'game',
    physics: { default: 'arcade' },
    pixelArt: true,
    scene: [LoaderScene, SplashScene],
});

export default game;
