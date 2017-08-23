import Strategy from './Strategy'

export default interface Actor {
    x: number;
    y: number;
    width: number;
    height: number;
    red: number;
    green: number;
    blue: number;
    opacity: number;
    xVelocity: number;
    yVelocity: number;

    update(maxX: number, maxY: number): void;
    strategies: Array<Strategy>;
}
