import { Animation, AnimationState, Vec2, director } from "cc";
import { StateDefine } from "../StateDefine";
import { ActorState } from "./ActorState";
import { GameEvent } from "../../event/GameEvent";

export class Die extends ActorState {

    onEnter(): void {
        // 播放死亡动画
        this.actor.rigidbody.linearVelocity = Vec2.ZERO;
        this.animation.play(StateDefine.Die);           

        this.animation.once(Animation.EventType.FINISHED, this.onDieEnd, this)

        this.actor.dead = true;        
    }
        // 监听finished是否播放完 如果是就销毁
    onDieEnd(type: Animation.EventType, state: AnimationState) {
        if (type == Animation.EventType.FINISHED) {
            if (state.name == StateDefine.Die) {
                //TODO: remove from parent 
                this.actor.scheduleOnce(() => {         
                    // 删除角色           
                    this.actor.node.destroy();
                    director.emit(GameEvent.OnDie, this.actor.node);
                }, 0.1);                    
            }
        }
    }
    // 角色死亡 不能状态转移
    canTransit(to: StateDefine): boolean {
        return false;
    }
} 