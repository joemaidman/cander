import Actor from './Actor'

export default interface Strategy{
    run(actor: Actor): Actor;
}