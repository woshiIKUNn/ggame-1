import { Vec2, math, v2 } from "cc";
import { StateDefine } from "../StateDefine";
import { ActorState } from "./ActorState";

export class Run extends ActorState {
    // 临时速度
    velocity: Vec2 = v2();

    onExit() {

    }

    onDestory() {

    }

    onEnter(): void {
        this.animation.crossFade(StateDefine.Run);
    }

    update(deltaTime: number): void {
        // 角色输入时取出他的input 存到临时速度里 然后把临时速度放大 返回给定义的线性速度 最终得到刚体的线性速度
        this.velocity.set(this.actor.input.x, this.actor.input.y);
        this.velocity.multiplyScalar(this.actor.linearSpeed);
        this.actor.rigidbody.linearVelocity = this.velocity;

        // 当角色输入长度为0则变回idle状态
        if (this.actor.input.length() <= math.EPSILON) {
            this.actor.stateMgr.transit(StateDefine.Idle);
        }
    }

    canTransit(to: StateDefine): boolean {
        if (to == this.id) {
            return false;
        }
        return true;
    }
}