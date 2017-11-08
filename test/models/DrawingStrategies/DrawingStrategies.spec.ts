import { expect } from 'chai';

import {
    DrawingStrategy,
    loadDrawingStrategies,
    getDrawingStrategy,
    SquareDrawingStrategy
} from '../../../src/models/DrawingStrategies/DrawingStrategies';
import ShapeType from '../../../src/interfaces/ShapeType';

describe('DrawingStrategies', () => {

    describe('loadDrawingStrategies', () => {

        it('should return an array of all message strategies', () => {
            expect(loadDrawingStrategies()).to.have.length(1);
            expect(loadDrawingStrategies()[0].constructor.name).to.equal('SquareDrawingStrategy');

        });

    });

    describe('getDrawingStrategy', () => {

        it('should return a message strategy of the correct type', () => {
            expect(getDrawingStrategy(ShapeType.SQUARE).shapeType).to.equal(ShapeType.SQUARE);

        });

        it('should throw if no strategy can handle the shape', () => {
            expect(getDrawingStrategy(ShapeType.TRIANGLE)).to.throw('Not found');

        });

    });

});
