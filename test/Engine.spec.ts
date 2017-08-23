import { expect } from 'chai';

import Engine from '../src/Engine';
import Actor from '../src/interfaces/Actor'
import Square from '../src/models/square'
import View from '../src/interfaces/View'
import CanvasView from '../src/views/CanvasView'

describe('Engine', () => {

    let engine: Engine;
    let view: View;
    let actors: Array<Actor>;

    before(() => {       
        actors = Array<Actor>();
        actors.push(new Square(1,1,1,1,1,1,1,1));
        view = new CanvasView(document.createElement('canvas'));
        engine = new Engine(view, actors);
    });

    describe('GIVEN it has been created', () => {

        it('THEN it has a list of actors', () => {
            expect(engine.actors).to.equal(actors);
        });

        it('THEN it has a view', () => {
            expect(engine.view).to.equal(view);
        });

    });


});