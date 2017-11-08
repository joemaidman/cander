import Strategy from './Strategy';
import ShapeType from './ShapeType';

export default interface Actor {
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    rotation: number;
    width: number;
    height: number;
    red: number;
    green: number;
    blue: number;
    opacity: number;
    strategies: Array<Strategy>;
    rgba: string;
    shapeType: ShapeType;
    update(strategy: Strategy, maxX: number, maxY: number, delta: number): void;
    
}
