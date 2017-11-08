import Actor from './Actor';

export default interface View {

    viewPort: HTMLCanvasElement;
    width: number;
    height: number;

    render(actors: Array<Actor>): void;
}