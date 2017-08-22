import { Actor } from './models/Actor';
import Engine from './models/engine';

export default class Game {

  public actors: Array<Actor>;
  private engine: Engine;

  Game(actors: Array<Actor>) {
    this.actors = actors || new Array<Actor>();

  }

}
