import Strategy from '../interfaces/Strategy'
import Actor from '../interfaces/Actor'

export default class Jelly implements Strategy{

    constructor(){

    }

    run(actor: Actor): Actor{
        return { ...actor, x: 2 }
    }

}