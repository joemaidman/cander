import { expect } from 'chai';

import Engine from '../src/Engine';
import Actor from '../src/interfaces/Actor';
import Square from '../src/models/shapes/square';
import View from '../src/interfaces/View';
import Strategy from '../src/interfaces/Strategy';
import CanvasView from '../src/views/CanvasView';

describe('Engine', () => {
    console.log('entering the engine file');

    let engine: Engine;
    let view: View;
    let actors: Array<Actor>;
    let strategies: Array<Strategy>;

    before(() => {
        actors = Array<Actor>();
        strategies = new Array<Strategy>();
        actors.push(new Square(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, strategies));
        view = new CanvasView(document.createElement('canvas'));
        engine = new Engine(view, actors);
    });

    beforeEach(() => {
    });

    describe('GIVEN it has been created', () => {

        it('THEN it has a list of actors', () => {
            expect(engine.actors).to.equal(actors);
        });
        describe('inner D', () => {
            it('THEN it has a list of actors', () => {
                expect(engine.actors).to.equal(actors);
            });
        });

        it('THEN it has a view', () => {
            expect(engine.view).to.equal(view);
        });

    });

});