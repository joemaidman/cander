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
            this.setContextFillStyle(actor.rgba);
            this.fillRect(actor.x, actor.y, actor.width, actor.height);
        }, this);
        this.context.clearRect(0,0,this.width, this.height);
        this.context.drawImage(this.offScreenViewPort, 0, 0);
    }

    private clearViewPort(): void {
        this.setContextFillStyle('white');
        this.offScreenContext.clearRect(0,0,this.width, this.height);
    }

    private setContextFillStyle(rgba: string): void {
        this.offScreenContext.fillStyle = rgba;
    }

    private fillRect(x: number, y: number, w: number, h: number): void{
        this.offScreenContext.fillRect(x, y, w, h);
        // this.offScreenContext.beginPath();
        // this.offScreenContext.arc(x,y,10,0,2*Math.PI)
        // this.offScreenContext.stroke();
    }
}