import { Iactor } from './Iactor';

export default class Square implements Iactor {

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    x: number;
    y: number;
    width: number;
    height: number;
}