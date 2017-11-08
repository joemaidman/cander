import ShapeType from '../../interfaces/ShapeType';
import Actor from '../../interfaces/Actor';
import * as _ from 'lodash';

export abstract class DrawingStrategy {
    shapeType: ShapeType;

    constructor(shapeType: ShapeType) {
        this.shapeType = shapeType;
    }

    abstract draw(actor: Actor, context: CanvasRenderingContext2D): void;

    handles(shapeType: ShapeType): boolean {
        return this.shapeType === shapeType;
    }
}

export const loadDrawingStrategies = (): Array<DrawingStrategy> => {
    return [
        new SquareDrawingStrategy()
    ];
};

export const throwShapeNotFound = (shapeType: ShapeType): never => {
    throw new Error('No shape drawing strategy available for ' + shapeType);
};

export const getDrawingStrategy = (shapeType: ShapeType): DrawingStrategy => {
    return _.find(loadDrawingStrategies(),
        (strategy: DrawingStrategy) => {
            return strategy.handles(shapeType);
        })
        || throwShapeNotFound(shapeType);
};

export class SquareDrawingStrategy extends DrawingStrategy {

    constructor() {
        super(ShapeType.SQUARE);
    }

    draw(actor: Actor, context: CanvasRenderingContext2D): void {
        context.fillStyle = actor.rgba;
        context.rotate(actor.rotation * Math.PI / 180);
        context.fillRect(actor.x, actor.y, actor.width, actor.height);
    }

}

export class EllipseDrawingStrategy extends DrawingStrategy {

    constructor() {
        super(ShapeType.ELLIPSE);
    }

    draw(actor: Actor, context: CanvasRenderingContext2D): void {
        context.fillStyle = actor.rgba;
        context.rotate(actor.rotation * Math.PI / 180);
        context.ellipse(actor.x, actor.y, actor.width, actor.height, actor.rotation, 0, 0);
    }

}