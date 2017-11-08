import Actor from '../../interfaces/Actor';
import Strategy from '../../interfaces/Strategy';
import Jelly from '../../models/Jelly';
import ShapeType from '../../interfaces/ShapeType';

export default class Square implements Actor {

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

    constructor(x: number, y: number,
        xVelocity: number, yVelocity: number,
        rotation: number, width: number, height: number,
        red: number, green: number, blue: number, opacity: number,
        strategies: Array<Strategy>) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;
        this.strategies = strategies;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.rgba = 'rgba(' + red + ',' +
            green + ',' +
            blue + ',' +
            opacity + ')';
        this.shapeType = ShapeType.SQUARE;
        this.rotation = rotation;
    }

    update(strategy: Strategy, maxX: number, maxY: number, delta: number): void {
        strategy.run(this, maxX, maxY, delta);
    }
}
