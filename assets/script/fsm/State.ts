// 状态接口
export interface IState<Tkey> {
    id: Tkey
    onEnter():void; //进入
    onExit():void;  // 退出
    update(deltaTime:number):void; // 更新
    onDestory():void;
    canTransit(to:Tkey):boolean
}

// 状态机接口
export interface IMachine<Tkey> {
    add(state:IState<Tkey>); // 添加状态
    remove(id:Tkey); //删除状态
    update(dt:number);
}
// 子状态接口（既要实现状态接口 又要实现状态机接口）
export interface ITransiable<Tkey>{
    transitTo(name:Tkey);
}

export class SubMachine<Tkey> implements IMachine<Tkey>, IState<Tkey>, ITransiable<Tkey>{
    
    id:Tkey;
    states:Map<Tkey, IState<Tkey>> = new Map(); // 表示状态机里面的状态
    currState: IState<Tkey>;
    defaultState:Tkey; // 进来时的默认状态

    add(state: IState<Tkey>) {
        this.states.set(state.id, state); // 往map里添加
    }
    remove(id: Tkey) {
        this.states.delete(id); // 从map里删除
    }
    update(dt: number) {
        this.currState?.update(dt) // 当前currState更新
    }
    onEnter(): void {
        // 进入子状态机时 如果有默认状态 就调用默认的defaultState
        if(this.defaultState){
          this.transitTo(this.defaultState);
        }
    }
    onExit(): void {
        this.currState?.onExit();
    }
    onDestory(): void { // 销毁
        this.currState = null;
        this.states.clear();
    }
    canTransit(to: Tkey): boolean {
        return this.currState?.canTransit(to); // 当前状态是否可以转移接口
    }
    transitTo(name: Tkey) { // 如果有当前状态但是不能转移当前状态 则return 
        if(this.currState && !this.currState.canTransit(name)){
            return
        }
        // 把当前状态转移出去
        this.currState?.onEnter();
        this.currState = this.states.get(name);
        this.currState?.onExit();
    }
}