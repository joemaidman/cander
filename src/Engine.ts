import Actor from './interfaces/Actor'
import View from './interfaces/View'
import Jelly from './models/Jelly'

export default class Engine {

    view: View;
    actors: Array<Actor>;
    private delta: number;
    private isRunning: boolean;
    private isStarted: boolean;
    private currentFrameID: number;
    private lastFrameTimeMs: number;
    private targetFPS: number;
    private timeStep: number;

    constructor(view: View, actors: Array<Actor>) {
        this.view = view;
        this.actors = actors;
        this.timeStep = 1000 / 60;
        this.delta = 0;
        this.targetFPS = 60;
        this.isStarted = false;
        this.isRunning = false;
    }

    start(): void {
        if (!this.isStarted) {
            this.isStarted = true;
            this.currentFrameID = requestAnimationFrame( (timestamp) => {
                this.draw();
                this.isRunning = true;
                this.lastFrameTimeMs = timestamp;
                this.currentFrameID = requestAnimationFrame(this.loop.bind(this));
            });
        }
    }

    stop(): void {
        this.isRunning = false;
        this.isStarted = false;
        cancelAnimationFrame(this.currentFrameID);
    }

    private loop(timeStamp: number): void {  
        if (timeStamp < this.lastFrameTimeMs + this.timeStep) {
            this.currentFrameID = requestAnimationFrame(this.loop.bind(this));
            return;
        }

        this.delta += timeStamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timeStamp;

        let numUpdateSteps = 0;
       
        while (this.delta >= this.timeStep) {
            this.update(this.timeStep);
            this.delta -= this.timeStep;
            if (++numUpdateSteps >= 240) {
                this.abort();
                break;
            }
        }
        this.draw();
        this.currentFrameID = requestAnimationFrame(this.loop.bind(this));
    }

    private update(delta: number): void {
        this.actors.forEach(actor => {
            actor.update(new Jelly(), this.view.width, this.view.height, delta);
        });
    }

    private draw(): void {
        this.view.render(this.actors);

    }

    private abort(): void {
        this.delta = 0;
    }
}
