import { expect } from 'chai';

import Square from '../src/models/Square';
import Strategy from '../src/interfaces/Strategy'

describe('Square', () => {

    let square: Square;
    let strategies: Array<Strategy>;

    before(() => {
        strategies = new Array<Strategy>();
        square = new Square(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, strategies);
    });

    describe('Given a square has been created', () => {

        it('THEN is has a list of strategies', () => {
            expect(square.strategies).to.equal(strategies);
        })
        
    });

});