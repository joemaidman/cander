import View from '../interfaces/View'
import Actor from '../interfaces/Actor'

export default class CanvasView implements View {

    viewPort: HTMLCanvasElement;
    width: number;
    height: number;
    private context: CanvasRenderingContext2D;

    constructor(viewPort: HTMLCanvasElement = document.createElement('canvas')){
        this.viewPort = viewPort;
        this.context = <CanvasRenderingContext2D> this.viewPort.getContext('2d');
        this.width = viewPort.width;
        this.height = viewPort.height;
    }

    render(actors: Array<Actor>): void{
        this.clearViewPort();
        actors.forEach((actor) => {
            this.setContextFillStyle(actor.red, actor.green, actor.blue, actor.opacity);
            this.fillRect(actor.x, actor.y, actor.width, actor.height);
        }, this);
    }

    private clearViewPort(): void {
        this.setContextFillStyle(255, 255, 255, 1);
        this.context.clearRect(0,0,this.width, this.height);
    }

    private setContextFillStyle(r: number, g: number, b: number, a: number): void {
        this.context.fillStyle = 'rgba('+ r + ',' + 
        g + ',' + 
        b + "," + 
        a + ')';
    }

    private fillRect(x: number, y: number, w: number, h: number): void{
        this.context.fillRect(x, y, w, h);
    }
}