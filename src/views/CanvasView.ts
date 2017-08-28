import View from '../interfaces/View'
import Actor from '../interfaces/Actor'

export default class CanvasView implements View {

    viewPort: HTMLCanvasElement;
    private offScreenViewPort: HTMLCanvasElement;
    width: number;
    height: number;
    private context: CanvasRenderingContext2D;
    private offScreenContext: CanvasRenderingContext2D;

    constructor(viewPort: HTMLCanvasElement = document.createElement('canvas')){
        this.viewPort = viewPort;
        this.offScreenViewPort = document.createElement('canvas');
        this.offScreenViewPort.width = viewPort.width;
        this.offScreenViewPort.height = viewPort.height;
        this.context = <CanvasRenderingContext2D> this.viewPort.getContext('2d');
        this.offScreenContext = <CanvasRenderingContext2D> this.offScreenViewPort.getContext('2d');
        this.width = viewPort.width;
        this.height = viewPort.height;
    }

    render(actors: Array<Actor>): void{
        this.clearViewPort();
        actors.forEach((actor) => {
            actor.draw(this.offScreenContext);
        }, this);
        this.context.clearRect(0,0,this.width, this.height);
        this.context.drawImage(this.offScreenViewPort, 0, 0);
    }

    private clearViewPort(): void {
        this.offScreenContext.clearRect(0,0,this.width, this.height);
    }

}