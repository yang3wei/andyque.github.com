var s_HelloWorld = "res/HelloWorld.png";
var s_CloseNormal = "res/CloseNormal.png";
var s_CloseSelected = "res/CloseSelected.png";
var s_Player = "res/player2.png";
var s_Projectile = "res/projectile2.png";
var s_Monster = "res/monster.png";
var s_Monster2 = "res/monster2.png";

//background musics
var s_backgroundMusic = "res/background-music-aac";

//convert caf files to mp3 files, two commands
//1.for background music : afconvert -f mp4f -d aac -b 128000   input.caf output2.mp3

//audio effects
var s_pewEffect = "res/pew-pew-lei";
var s_explosion = "res/explosion";

var g_ressources = [
    //image
    {type:"image", src:s_HelloWorld},
    {type:"image", src:s_CloseNormal},
    {type:"image", src:s_CloseSelected},
    {type:"image", src:s_Player},
    {type : "image" , src : s_Projectile},
    {type : "image", src : s_Monster2},
    {type:"image", src:s_Monster},


    //plist

    //fnt

    //tmx

    //bgm
    {type : "bgm", src:s_backgroundMusic},

    //effect
    {type:"effect", src:s_pewEffect},
    {type:"effect", src:s_explosion}
];
