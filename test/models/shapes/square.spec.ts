import { expect } from 'chai';

import Square from '../../../src/models/shapes/Square';
import Strategy from '../../../src/interfaces/Strategy';
import ShapeType from '../../../src/interfaces/ShapeType';

describe('Square', () => {

    let square: Square;
    let strategies: Array<Strategy>;

    before(() => {
        strategies = new Array<Strategy>();
        square = new Square(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, strategies);
    });

    describe('Given a square has been created', () => {

        it('THEN is has an X position', () => {
            expect(square.x).to.equal(1);
        });

        it('THEN is has an Y position', () => {
            expect(square.y).to.equal(1);
        });

        it('THEN is has an X velocity', () => {
            expect(square.xVelocity).to.equal(1);
        });

        it('THEN is has an Y velocity', () => {
            expect(square.yVelocity).to.equal(1);
        });

        it('THEN is has a rotation', () => {
            expect(square.rotation).to.equal(1);
        });

        it('THEN is has a width', () => {
            expect(square.width).to.equal(1);
        });

        it('THEN is has a height', () => {
            expect(square.height).to.equal(1);
        });

        it('THEN is has a red colour', () => {
            expect(square.red).to.equal(1);
        });

        it('THEN is has a green colour', () => {
            expect(square.green).to.equal(1);
        });

        it('THEN is has a blue colour', () => {
            expect(square.red).to.equal(1);
        });

        it('THEN is has an opacity', () => {
            expect(square.opacity).to.equal(1);
        });

        it('THEN is has a rgba value', () => {
            expect(square.rgba).to.equal('rgba(1,1,1,1)');
        });

        it('THEN is has a list of strategies', () => {
            expect(square.strategies).to.equal(strategies);
        });

        it('THEN is has a shapeType', () => {
            expect(square.shapeType).to.equal(ShapeType.SQUARE);
        });
        
    });

});