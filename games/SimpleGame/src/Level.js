var Level;
Level = cc.Class.extend({
    _levelNum:0,
    _secsPerSpawn:0,
    _color:null,
    ctor:function(levelNum, secsPerSpawn,color){
        //constructor
        this._levelNum = levelNum;
        this._secsPerSpawn = secsPerSpawn;
        this._color = color;
    }
});


var LevelManager;
LevelManager = cc.Class.extend({
    _levels : [],
    _curLevelIndex : 0,
    ctor:function(){
        var level1 = new Level(1,2,cc.c4b(255,255,255,255));
        var level2 = new Level(2,1,cc.c4b(100,150,20,255));
        this._levels.push(level1);
        this._levels.push(level2); 
        this._curLevelIndex = 0;
    },
    curLevel: function() {
        if(this._curLevelIndex > 1){
            return null;
        }
        return this._levels[this._curLevelIndex];
    },
    nextLevel: function(attribute) {
        this._curLevelIndex++;
    },
    resetLevel: function() {
        this._curLevelIndex = 0; 
    }
});

var g_sSharedLevelManager = null;
LevelManager.getInstance = function(){
    if (g_sSharedLevelManager === null){
        g_sSharedLevelManager = new LevelManager();
    }
    return g_sSharedLevelManager;
};
