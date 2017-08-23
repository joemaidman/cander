import Actor from './Actor'

export default interface View {
    render(actors: Array<Actor>): void;
    viewPort: HTMLCanvasElement;
    width: number;
    height: number;
}