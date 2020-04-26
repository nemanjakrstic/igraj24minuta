import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import SplashScene from './scenes/SplashScene';
import config from './config';

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    physics: { default: 'arcade' },
    scene: [SplashScene, MainScene],
    pixelArt: true,
    ...config,
});

export default game;
