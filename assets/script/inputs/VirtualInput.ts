import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
// static直接访问 而不需要访问实例
export class VirtualInput {
    static vertical: number = 0;
    static horizontal: number = 0;            
}