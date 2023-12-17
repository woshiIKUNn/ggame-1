import { Collider, DeferredPipeline, ccenum } from "cc";

/**
 * 由于 2D 没有区分 onTriggerXXX/onCollisionXXX 
 * 
 * 在处理 我和谁碰到时，可以通过 TAG 来区分
 */
export namespace colliderTag {
    // 角色之间发生不同的碰撞体 赋予不同的tag
    export enum Define {
        Scene = 0,
        Player = 101,
        Enemy = 102,
        AlertRange = 103,
        PlayerProjectile = 104,
        EnemyProjectile = 105,
    }
    ccenum(Define);

    export function isScene(tag: number) {
        return tag == Define.Scene;
    }
    // 声明一个方法 玩家可以攻击场景和敌人 敌人可以攻击玩家和场景
    export function isProjectileHitable(tag: number, other: number): boolean {
        if (tag == Define.PlayerProjectile) {
            return other == Define.Scene || other == Define.Enemy;
        }

        if (tag == Define.EnemyProjectile) {
            return other == Define.Scene || other == Define.Player;
        }
        return false;
    }
}