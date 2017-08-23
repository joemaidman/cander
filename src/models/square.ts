import Actor from '../interfaces/Actor'
import Strategy from '../interfaces/Strategy'

export default class Square implements Actor {

    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    width: number;
    height: number;
    red: number;
    green: number;
    blue: number;
    opacity: number;
    strategies: Array<Strategy>;

    constructor(x: number, y: number, 
        xVelocity: number, yVelocity: number, 
        width: number, height: number,
        red: number, green: number, blue: number, opacity: number, 
        strategies: Array<Strategy>) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;
        this.strategies = strategies;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    update(maxX: number, maxY: number): void{
        //Refactor this to a strategy (Jelly first)
        const xLeft = maxX - this.x;
        const yLeft = maxY - this.y;
       
        if(Math.random() >= 0.5){
            this.x+= Math.min(xLeft,1);
        }
        else{
            this.x-= Math.min(xLeft,1);
        }

        if(Math.random() >= 0.5){
            this.y+= Math.min(yLeft,1);
        }
        else{
            this.y-= Math.min(yLeft,1);
        }
    }

}
