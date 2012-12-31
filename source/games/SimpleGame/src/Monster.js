var Monster;
Monster = cc.Sprite.extend({
    _hp: 0 ,
    _minDuration: 0,
    _maxDuration: 0,
    ctor : function(){
        //no need to initialize,leave it to it's subclass
    }
});

var WeakAndFastMonster;
WeakAndFastMonster = Monster.extend({
    ctor:function(){
        this._hp = 1;
        this._minDuration = 3;
        this._maxDuration = 5;

        this.initWithFile(s_Monster);
    }
});

var StrongAndSlowMonster;
StrongAndSlowMonster = Monster.extend({
    ctor:function(){
        this._hp = 3;
        this._minDuration = 6;
        this._maxDuration = 12;
        
        this.initWithFile(s_Monster2);
    }
});
