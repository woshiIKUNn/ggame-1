
import { Animation } from "cc";
import { Actor } from "../Actor";
import { IState } from "../../fsm/State";
import { StateDefine } from "../StateDefine";
// 角色状态机的类 为了获得角色actor animation
export abstract class ActorState implements IState<StateDefine> {

    actor: Actor
    animation: Animation
    id: StateDefine;

    constructor(name: StateDefine, actor: Actor) {
        this.actor = actor;
        this.animation = actor.animation;
        this.id = name;
    }

    onEnter() { }
    onExit() { }
    update(deltaTime: number) { }
    onDestory() { }

    canTransit(to: StateDefine): boolean {
        return true;
    }
}