import { Actor } from './Actor';

export default class Square implements Actor {

    constructor(x: number, y: number, width: number, height: number,
        red: number, green: number, blue: number, opacity: number) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;

    }

    x: number;
    y: number;
    width: number;
    height: number;
    red: number;
    green: number;
    blue: number;
    opacity: number;
}
