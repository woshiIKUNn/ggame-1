import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, RigidBody2D, Tween } from 'cc';
import { colliderTag } from '../ColliderTags';
import { Actor } from '../Actor';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('Projectile')
@requireComponent(Collider2D)
@requireComponent(RigidBody2D)
export class Projectile extends Component {

    collider: Collider2D; // 监听碰撞结果

    rigidbody: RigidBody2D; // 速度 转向组件

    spinTween: Tween<Node> | null = null;

    @property({ type: colliderTag.Define })
    hitTag: colliderTag.Define = colliderTag.Define.PlayerProjectile;

    host: Actor | null = null;

    start() {
        // getComponent获取属性
        this.collider = this.node.getComponent(Collider2D);
        this.rigidbody = this.node.getComponent(RigidBody2D);
        // Contact2DType监听碰撞
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionBegin, this);
    }
    // 取消碰撞
    onDisable() {
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onCollisionBegin, this);
    }
    // 子弹碰撞 self我自己 other谁撞我
    onCollisionBegin(self: Collider2D, other: Collider2D, contact: IPhysics2DContact) {
        // 确定可以互相伤害后 子弹消失
        if (colliderTag.isScene(other.tag) || colliderTag.isProjectileHitable(self.tag, other.tag)) {
            self.enabled = false;            
            // 删除 直接删会报错
            this.schedule(()=>{
                this.node.destroy();
            }, 0.1);
        }
    }
}

