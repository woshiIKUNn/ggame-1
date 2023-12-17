import { Vec2 } from "cc";
import { StateDefine } from "../StateDefine";
import { ActorState } from "./ActorState";

export class Idle extends ActorState {    

    onEnter(): void {        
        this.actor.rigidbody.linearVelocity = Vec2.ZERO;
        let hasIdle = this.animation.getState(StateDefine.Idle);
        // 进入idle状态 把动画状态机切为idle
        if (hasIdle){
            this.animation.play(StateDefine.Idle);
        }            
    }

    update(deltaTime: number) {

    }

    onExit(): void {

    }

    onDestory(): void {

    }
    // 不能转移自己
    canTransit(to: StateDefine): boolean {
        if (to == StateDefine.Idle) {
            return false;
        }
        return true;
    }
} 