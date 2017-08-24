import Strategy from '../interfaces/Strategy'
import Actor from '../interfaces/Actor'

export default class Jelly implements Strategy{

    run(actor: Actor, maxX: number, maxY: number, delta: number): void{
        const xLeft = maxX - actor.x;
        const yLeft = maxY - actor.y;
    
        if(Math.random() >= 0.5){
            actor.x+= (Math.min(xLeft,1)*(delta/ 60));
        }
        else{
            actor.x-= (Math.min(xLeft,1)*(delta/ 60));
        }

        if(Math.random() >= 0.5){
            actor.y+= (Math.min(yLeft,1)*(delta/ 60));
        }
        else{
            actor.y-= (Math.min(yLeft,1)*(delta/ 60));
        }
    }

}