import { Iactor } from './models/Iactor';
import Engine from './models/engine'

export default class Game {

    public actors: Array<Iactor>;
    private engine: Engine;

    Game(actors: Array<Iactor>) {
        this.actors = actors || new Array<Iactor>();

    }

    start() {
        this.engine.start();
    }

    reset() {
        this.engine.reset();
    }

    pause() {
        this.engine.pause();
    }

    stop() {
        this.engine.stop();
    }

    add_actor(actor: Iactor) {
        this.actors.push(actor);
    }

}