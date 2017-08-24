import Engine from '../src/Engine';
import Actor from '../src/interfaces/Actor'
import View from '../src/interfaces/View'
import Strategy from '../src/interfaces/Strategy'
import CanvasView from '../src/views/CanvasView'
import Square from '../src//models/Square'
import Jelly from '../src//models/Jelly'

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('game');
const viewPort: View =  new CanvasView(canvas);
const actors: Array<Actor> = new Array<Square>();
const strategies: Array<Strategy> = new Array<Jelly>();
for(let num: number = 0; num < 100; num++){
    actors.push(new Square(
        Math.floor(Math.random() * 500) + 0,
         Math.floor(Math.random() * 500) + 0,
         1,
         1,
         30,
         30,
         Math.floor(Math.random() * 255) + 0,
         Math.floor(Math.random() * 255) + 0,
         Math.floor(Math.random() * 255) + 0, 
         1,strategies));
}
const engine = new Engine(viewPort, actors);
engine.start();