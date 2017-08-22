import { Iactor } from './Iactor';

export default class Game {

    actors: Array<Iactor>;

    Game(actors: Array<Iactor>) {
        this.actors = actors || new Array<Iactor>();

    }

    function start(): void {

    }



}