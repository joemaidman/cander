import Strategy from './Strategy'

export default interface Actor {
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    width: number;
    height: number;
    red: number;
    green: number;
    blue: number;
    opacity: number;
    strategies: Array<Strategy>;
    rgba: string;

    update(strategy: Strategy, maxX: number, maxY: number, delta: number): void;
    
}
