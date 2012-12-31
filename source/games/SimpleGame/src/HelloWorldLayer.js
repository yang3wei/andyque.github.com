var HelloWorldLayer;

HelloWorldLayer = cc.LayerColor.extend({
    _monsters:[], //
    _projectiles:[],
    _monsterDestroyed:0,
    _scoreLabel :null,
    _playerSprite:null,
    _nextProjectile:null,
    ctor:function () {
        //this line does nothing in cocos2d-html5, but for some compatible reasons with jsbings
        cc.associateWithNative(this,cc.LayerColor);

        this._super();
        
        //////////////////////////////
        // 1. super init first
        var curLevel = LevelManager.getInstance().curLevel();
        this.initWithColor(curLevel._color);

        //2. add player sprites
        var size = cc.Director.getInstance().getWinSize();
        this._playerSprite = cc.Sprite.create(s_Player);
        this._playerSprite.setPosition(cc.p(this._playerSprite.getContentSize().width / 2.0, size.height / 2.0));
        this.addChild(this._playerSprite);
        

        //3.enable touches
        this.setTouchEnabled(true);

        //4.init arrays? no need
        this._monsters = [];
        this._projectiles = [];

        //5.add a score label
        this._scoreLabel = cc.LabelTTF.create("0","Arial",20);
		this._scoreLabel.setColor(cc.c3b(255,0,0));
        this._scoreLabel.setPosition(cc.p(size.width/2,size.height * 0.9));
        this.addChild(this._scoreLabel,100);

        this.schedule(this.gameLogic, curLevel._secsPerSpawn);
        this.scheduleUpdate();
        //5.player background music
        cc.AudioEngine.getInstance().playBackgroundMusic(s_backgroundMusic, true);
    },


    update:function (delta) {
        var projectile;
        var monster;

        var s = cc.Director.getInstance().getWinSize();
        //in order to prevent crash , you should delete element from the bottome of the array
        for (var i = this._projectiles.length - 1; i >= 0; --i) {

            projectile = this._projectiles[i];
            for (var j = this._monsters.length - 1; j >= 0; --j) {
                monster = this._monsters[j];
                if (cc.rectIntersectsRect(monster.getBoundingBox(), projectile.getBoundingBox())
                    && monster.getPosition().x <= s.width + monster.getContentSize().width/2) {

                    monster._hp = monster._hp - 1;
                    cc.AudioEngine.getInstance().playEffect(s_explosion);
                    cc.ArrayRemoveObject(this._projectiles, projectile);
                    this.removeChild(projectile, true);
                    if(monster._hp <= 0){
                        cc.ArrayRemoveObject(this._monsters, monster);
                        this.removeChild(monster, true);
                        this._monsterDestroyed++;
                        if (this._monsterDestroyed > 3) {
                            var scene = gameOverLayer.sceneWithWin(true);
                            cc.Director.getInstance().replaceScene(scene);
                        }
                    }
                }
            }
        }

        //update scoreLabel
        this._scoreLabel.setString(this._monsterDestroyed);
    },

    onTouchesEnded:function (touches, evnet) {
        if (touches.length <= 0) {
            return;
        }

        if(this._nextProjectile !== null){
            return;
        }
        cc.AudioEngine.getInstance().playEffect(s_pewEffect);


        var touch = touches[0];
        var location = touch.getLocation();

        var s = cc.Director.getInstance().getWinSize();
        var originPt = cc.p(20, s.height / 2);


        //caculate the end point of projetile
        var offset = cc.pSub(location, originPt);


        if (offset.x <= 0) {
            return;
        }


        //add the projectile, no need to call retain
        this._nextProjectile = cc.Sprite.create(s_Projectile);
        var projectileSize = this._nextProjectile.getContentSize();
        this._nextProjectile.setPosition(originPt);

        //caculate ths rotate angle first
        var angle = Math.atan2(offset.y, offset.x);
        var realAngle = angle * 180 / 3.1415926 * -1;
        // cc.log("angle=" + realAngle);
        var angleDiff = this._playerSprite.getRotation() - realAngle;
        var speed = 180 / 0.5;
        var rotateDuration = Math.abs(angleDiff / speed);
        this._playerSprite.runAction(cc.Sequence.create(
                    cc.RotateTo.create(rotateDuration,realAngle),
                    cc.CallFunc.create(this,function (pSender){

                        this.addChild(this._nextProjectile);
                        this._nextProjectile.setTag(SimpleGame.Tag_Projectile);
                        this._projectiles.push(this._nextProjectile);

                        //no need to call release any more
                        this._nextProjectile = null;
                    })));
        // this._playerSprite.setRotation(realAngle);

        // cc.log("x =" + offset.x + ",y=" + offset.y);
        var ratio = offset.y / offset.x;
        var endX = s.width + projectileSize.width / 2;
        var endY = originPt.y + endX * ratio;

        // cc.log("ratio = " + ratio);

        var offsetX = endX - originPt.x;
        var offsetY = endY - originPt.y;
        var length = cc.pLength(cc.p(offsetX, offsetY));
        speed = 480;
        var time = length / speed;

        this._nextProjectile.runAction(cc.Sequence.create(
            cc.MoveTo.create(time, cc.p(endX, endY)),
            cc.CallFunc.create(this, function (pSender) {
                pSender.removeFromParentAndCleanup(true);
                cc.ArrayRemoveObject(this._projectiles, pSender);
            }),
            null)
        );


        // cc.log("touch.x = " + location.x + ",y=" + location.y);
    },

    addTarget:function () {
        var targetSprite = null;
        if(Math.random() * 2 > 1){
            targetSprite = new WeakAndFastMonster();
        }else{
            targetSprite = new StrongAndSlowMonster();
        }
        // var targetSprite = cc.Sprite.create(s_Monster2);

        //add target to screen
        var s = cc.Director.getInstance().getWinSize();
        var targetSize = targetSprite.getContentSize();

        var maxY = s.height - targetSize.height / 2.0;
        var minY = targetSize.height / 2.0;
        var actualY = Math.random() * (maxY - minY) + minY;

        //cc.log("actualY = " + actualY);

        targetSprite.setPosition(cc.p(s.width + targetSize.width / 2, actualY));
        this.addChild(targetSprite);
        targetSprite.setTag(SimpleGame.Tag_Target);
        this._monsters.push(targetSprite);

        //construct a action,first determine the speed
        var maxTime = targetSprite._minDuration;
        var minTime = targetSprite._maxDuration;
        var actualTime = Math.random() * (maxTime - minTime) + minTime;

        var moveAction = cc.MoveTo.create(actualTime, cc.p(-targetSize.width / 2, actualY));
        var removeWhenFinish = cc.CallFunc.create(this, function (pSender) {
            pSender.removeFromParentAndCleanup(true);
            cc.ArrayRemoveObject(this._monsters, pSender);
            var scene = gameOverLayer.sceneWithWin(false);
            cc.Director.getInstance().replaceScene(scene);
        });
        var ac = cc.Sequence.create(moveAction, removeWhenFinish, null);
        targetSprite.runAction(ac);

        //cc.AudioEngine.getInstance().playBackgroundMusic(s_backgroundMusic,true);
            
    },
    gameLogic:function () {
        this.addTarget();
    }


});


HelloWorldLayer.create = function(){
    var layer = new HelloWorldLayer();
    if(layer){
        return layer;
    }
    return null;
};

HelloWorldLayer.scene = function(){
    var scene = cc.Scene.create();
    var layer = this.create();
    scene.addChild(layer);
    return scene;
};

