import Actor from './interfaces/Actor';
import View from './interfaces/View';
import Jelly from './models/Jelly';

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
    private timeStepLimit: number;
    private currentUpdateSteps: number;

    constructor(view: View, actors: Array<Actor>) {
        this.view = view;
        this.actors = actors;
        this.timeStep = 1000 / 60;
        this.delta = 0;
        this.targetFPS = 60;
        this.isStarted = false;
        this.isRunning = false;
        this.timeStepLimit = 240;
    }

    start(): void {
        if (!this.isStarted) {
            this.isStarted = true;
            this.currentFrameID = requestAnimationFrame((timestamp) => {
                this.draw();
                this.isRunning = true;
                this.updateLastFrameTime(timestamp);
                this.prepareLoop();
            });
        }
    }

    stop(): void {
        this.isRunning, this.isStarted = false;
        cancelAnimationFrame(this.currentFrameID);
    }

    private loop(timeStamp: number): void {
        if (this.checkMaxFps(timeStamp)) {
            this.prepareLoop();
            return;
        }
        else {
            this.increaseDelta(timeStamp - this.lastFrameTimeMs);
            this.updateLastFrameTime(timeStamp);
            this.simulateTime();
            this.draw();
            this.prepareLoop();
        }
    }

    private simulateTime(): void {

        while (this.delta >= this.timeStep) {
            this.update(this.timeStep);
            this.decreaseDelta(this.timeStep)
            if (++this.currentUpdateSteps >= this.timeStepLimit) {
                this.abort();
                break;
            }
        }
        this.currentUpdateSteps = 0;
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
        this.currentUpdateSteps = 0;
    }

    private checkMaxFps(timeStamp: number): Boolean {
        return timeStamp < this.lastFrameTimeMs + this.timeStep;
    }

    private prepareLoop(): void {
        this.currentFrameID = requestAnimationFrame(this.loop.bind(this));
    }

    private increaseDelta(amount: number): void {
        this.delta += amount;
    }

    private decreaseDelta(amount: number): void {
        this.delta -= amount;
    }

    private updateLastFrameTime(timeStamp: number): void {
        this.lastFrameTimeMs = timeStamp;
    }

}
