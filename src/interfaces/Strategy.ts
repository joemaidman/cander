import Actor from './Actor'

export default interface Strategy{
    run(actor: Actor,  maxX: number, maxY: number, delta: number): void;
}