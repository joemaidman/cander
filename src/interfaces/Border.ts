import Strategy from './Strategy';
import ShapeType from './ShapeType';
import Actor from './Actor';

export default interface Border {
    width: number;
    red: number;
    green: number;
    blue: number;
    opacity: number;
    rgba: string;
    owner: Actor;
}
