
var gameOverLayer;
gameOverLayer = cc.LayerColor.extend({

    ctor:function (isWin) {
        cc.associateWithNative(this,cc.LayerColor);

        this._super();  //don't forget to call super method

        var bRet = false;
        if (this.initWithColor(cc.c4b(255, 255, 255, 255))) {
            var message = "";

            if (isWin) {
                LevelManager.getInstance().nextLevel();
                var level = LevelManager.getInstance().curLevel();
                if(level !== null){
                    message = "Ready for level:" + level._levelNum;
                }else{
                    message = "You Win!";
                    LevelManager.getInstance().resetLevel();
                }
            } else {
                message = "You Lose!";
            }

            //add a label to the center of screen
            var s = cc.Director.getInstance().getWinSize();
            var label = cc.LabelTTF.create(message, "Arial", 32);
            label.setPosition(cc.p(s.width / 2, s.height / 2));
            label.setColor(cc.c3b(0, 0, 0));
            this.addChild(label);

            this.runAction(cc.Sequence.create(
                cc.DelayTime.create(1),
                cc.CallFunc.create(this, function () {
                    cc.Director.getInstance().replaceScene(HelloWorldLayer.scene());
                }),
                null
            ));

            bRet = true;
        }
        return bRet;
    }
});

gameOverLayer.create = function (isWin) {
    var layer = new gameOverLayer(isWin);
    if (layer ) {
        return layer;
    }
    return null;
};

gameOverLayer.sceneWithWin = function (isWin) {
    var scene = cc.Scene.create();
    var layer = gameOverLayer.create(isWin);
    scene.addChild(layer, 1);
    return scene;
};
