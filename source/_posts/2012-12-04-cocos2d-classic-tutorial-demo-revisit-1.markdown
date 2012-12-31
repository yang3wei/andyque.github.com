---
layout: post
---
## Introduction
<div style="float:right">[![](http://www.zilongshanren.com/wp-content/uploads/2012/12/ScreenshotSmall1.jpg "ScreenshotSmall1")](http://www.zilongshanren.com/wp-content/uploads/2012/12/ScreenshotSmall1.jpg)</div>
These tutorials series are a attempt trying to reimplement classic coco2d tutorials with cocos2d-html5 and cocos2d-x(use lua & native language c++).

I do this job mainly for two reasons:
- cocos2d-x and cocos2d-html5 are extremly lack of game tutorials, most cocos2d tutorials are written with Objective-c. Some people may not be confortable with Objective-c's strange syntax and this'll be a obstacle for them to learn cocos2d-x and cocos2d-html5.
- learning javascript and lua,especially the function programming style. At the same time, if I post the porting experience with you, you guys can give me feedback. Then I'll learn a lot.

I will write these post series in the following step:
- Give a real, playable html5 game made with cocos2d-html5.(Have fun with the game, you can also tweak the gameplay to make it better.)
- Talk something related to the keypoint of making such a game.
- Compare the main difference of js, c++ ,lua and objc's implementation(Note:All of them are cocos2d style).

I think during the process, it'll make a difference. :)
<!--more-->## Game Showcase
<font color="red">**Note: Click to shoot bad enemies!**</font><iframe width="480" height="320" src="http://www.zilongshanren.com/SimpleGame/index.html"></iframe>## The Keypoint of Making such a game

This game is made by Raywenderlich.com, the best tutorials website in the world. The SimpleGame tutorial is composed of three part([part1](http://www.raywenderlich.com/25736/how-to-make-a-simple-iphone-game-with-cocos2d-2-x-tutorial),[part2](http://www.raywenderlich.com/25791/rotating-turrets-how-to-make-a-simple-iphone-game-with-cocos2d-2-x-part-2),[part3](http://www.raywenderlich.com/25806/harder-monsters-and-more-levels-how-to-make-a-simple-iphone-game-with-cocos2d-2-x-part-3)), I think it's the best introduction tutorials for cocos2d learners. And there are lots of cocos2d game tutorials in Ray's site, all of my following work will start from there too. So thank you Ray for making so many awesome tutorials for us. (Note:Now these awesome tutorials have been translated to many languages,I am a Chinese translator in Ray's translation team,I am the core member of Tyran tream. You can refer Ray's website for [more information](http://www.raywenderlich.com/about#teamtyran) about us.)

SimpleGame is a shooting game, I think the keypoint of making this kind of game is:
- Caculate shooting path and shooting angles
- Collison detection between bullets and enemies
- Spawn enemies and how to design different challange levels

In these tutorials, you will find it's easy for us to implement.Yes it is, because it's a introduction tutorial. Not yet, though it's a simple game, but it's a complete game. It's easy usablity mainly due to the desin of cocos2d. I think it's the most awesome 2d game framework. You can write games even though you don't know much about the low level graphic APIs. At the same time, you can also add your own graphic specific code to the framework. I highly recommend you to try cocos2d when you want to make you own games.

For the three keypoint, you should be familar with High School Triangle and some APIs providered by cocos2d. You can refer to the code for more details. In this simple game tutorial,the enemy type and level design is very simple, but it points you to the right direction. You can do more with this minimum game.
## Implementation Details Comparison

I think it's hard for me to compare all the details of these implementations. It's no need to do so, you can refer to the soucecode for more informations. What I am talking here is the "Biggest difference" when I am porting them.

When porting Objective-c code to c++, it's not very nonintuitive, you can refer to cocos2d-x.org for more infos. But the site don't talk much about how to port c++ to js and lua. If you are familar with all these languages, I think it's an easy job for you. But even you know these three languages well, maybe there are still some tricks you'll want to know in advance.
- cocos2d-html5 use js to mimic object oriented programming style. The class and inheritence idea are taken from  "[Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/)", it makes our life easier when we use js to write object oriented code. So if you are familar with cocos2d-x's cpp programming style, it'll not be very difficult for you to rewrite it with js. Cocos2d-html5 use "cc" global variable to mimic a namespace where all cocos2d stuff are stay in. If you want to get a sprite, you can use cc.Sprite.create to accomplish it. Most cocos2d-x functionlity are ported to cocos2d-html5. You'd better refer to the show case "Moon Warrior" when you don't know how to implement a specific feature.
- The future of cocos2d maybe is jsbinding, one promise that one codebase can run every platform(ios,android,browse,desktp etc). So we can learn it earlier for preparing.
- cocos2d-x's lua binding is made with tolua++, it makes lua API almostly the same as c++ API. Jsbinding does change some function and micro names, but lua doesn't. Sure you can do that if you like. You can also change tolua++ bindings or wrap a high level lua API based on the default lua bindings. 

When porting code to lua style, it really takes me some time. The reasons are so many.
- I am new to lua and tolua++. But more important thing is  that I try to programming lua code use cpp style. It's totally wrong! Lua comes with table and function programming, I should programming lua in another different sytle, yes, lua style. 
- Don't use CCArray in lua code, use table instead.
- Don't try to inherit C++ class from lua and it's not proper to inheretence tolua++ class from lua side. Treat tolua++ class as a table. You could add field and method to it directly. No class, no inheritance,it's all Tables!
- If you want to schedule a function in lua,you'll use CCDirector's Scheduler field to accomplish.
- If you want to add some code to CCNode(all of it's subclasses)'s onEnter and onExit method, you can use CCNode's registerScriptHandler function.

There are more details you'll want to know, go ahead, grab the code and dig into it.

Enjoy, happy coding! :)

Source code links:
- [cpp version](https://www.dropbox.com/s/ov5d1ltleb7pvmp/SimpleGame-cpp.zip)
- [javscript version](https://www.dropbox.com/s/zgwdqdhifbroqu3/SimpleGame-js.zip)
- [lua version](https://www.dropbox.com/s/t1nr3k31n26asm8/SimpleGame-lua.zip)
