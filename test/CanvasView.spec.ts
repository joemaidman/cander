import { expect } from 'chai';
import * as chai from 'chai';

import View from '../src/interfaces/View';
import CanvasView from '../src/views/CanvasView';

describe('CanvasView', () => {

    let canvasView: View;
    let canvasNoView: View;

    before(() => {
        canvasView = canvasView = new CanvasView(document.createElement('canvas'));
        canvasNoView = new CanvasView();
    });

    describe('GIVEN no viewPort is passed', () => {

        it('then it has the default viewPort', () => {
            expect(canvasNoView.viewPort).to.be.an.instanceOf(HTMLCanvasElement);
        });
        
    });


    describe('GIVEN a viewPort is passed', () => {
        
        it('then it has a viewPort', () => {
            expect(canvasView.viewPort).to.be.an.instanceOf(HTMLCanvasElement);
        });
                
    });

});