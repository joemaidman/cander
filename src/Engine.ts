import Actor from './interfaces/Actor'
import View from './interfaces/View'

export default class Engine{

    view: View;
    actors: Array<Actor>;

    constructor(view: View, actors: Array<Actor>){
        this.view = view;
        this.actors = actors;
    }

    start(){
        requestAnimationFrame(() => {
            this.loop();
        });
    }

    loop(): void{
        this.update();
        this.draw();
        requestAnimationFrame(() => {
            this.loop();
        });
    }

    update(){
        this.actors.forEach(actor => {
            actor.update(this.view.width, this.view.height);
        });
    }

    draw(){
        this.view.render(this.actors);
    }

}