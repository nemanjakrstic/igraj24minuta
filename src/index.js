import LoaderScene from './scenes/LoaderScene';
import SplashScene from './scenes/SplashScene';
import GameScene from './scenes/GameScene';
import Phaser from 'phaser';

const game = new Phaser.Game({
    width: 800,
    height: 600,
    type: Phaser.CANVAS,
    parent: 'game',
    physics: { default: 'arcade', arcade: { debug: false } },
    pixelArt: true,
    scene: [LoaderScene, SplashScene, GameScene],
});

export default game;
