import { Component, _decorator, director } from "cc";
const { ccclass, property, requireComponent } = _decorator;

@ccclass("UIWin")
export class UIWin extends Component {    
      // 点击之后做的事 重新加载 game
    onBtnRetryClicked() {        
        director.loadScene("game");
    }
}