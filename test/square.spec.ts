import { expect } from 'chai';
import * as chai from 'chai';

import Square from '../src/models/square';

describe('Square', () => {

    let square: Square;

    before(() => {
        square = new Square(1, 1, 1, 1);
    });

    describe('Given a square has been created', () => {

        it('then it has a width', () => {
            expect(square.width).to.equal(1);
        });
        
    });


});