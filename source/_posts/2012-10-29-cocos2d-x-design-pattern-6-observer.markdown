---
layout: post
title: !binary |-
  Q29jb3MyZC146K6+6K6h5qih5byP5Y+R5o6Y5LmL5YWt77ya6KeC5a+f6ICF
  5qih5byP
wordpress_id: 175
wordpress_url: !binary |-
  aHR0cDovL3d3dy56aWxvbmdzaGFucmVuLmNvbS8/cD0xNzU=
categories:
- title: !binary |-
    Y29jb3MyZC146K6+6K6h5qih5byP
  slug: !binary |-
    Y29jb3MyZC14JWU4JWFlJWJlJWU4JWFlJWExJWU2JWE4JWExJWU1JWJjJThm
  autoslug: !binary |-
    Y29jb3MyZC146K6+6K6h5qih5byP
tags:
- title: !binary |-
    Y29jb3MyZC146K6+6K6h5qih5byP
  slug: !binary |-
    Y29jb3MyZC14JWU4JWFlJWJlJWU4JWFlJWExJWU2JWE4JWExJWU1JWJjJThm
  autoslug: !binary |-
    Y29jb3MyZC146K6+6K6h5qih5byP
---
## 1、应用场景
<div style="float: right;">[![](http://www.zilongshanren.com/wp-content/uploads/2012/09/2dx_icon_512_-rightangle1-300x300.png "2dx_icon_512_-rightangle")](http://www.zilongshanren.com/wp-content/uploads/2012/09/2dx_icon_512_-rightangle1.png)</div>    
前面在介绍单例模式的时候，提到了一个类CCNotificationCenter，它除了应用单例模式以外，还应用了观察者模式。CCNotificationCenter类是观察者模式中的目标对象，而CCNotificationObserver则是观察者。
    
一个目标对象可以注册多个观察者，当目标对象的状态改变的时候，可以通知观察者对象作出相应的响应。这是标准的观察者模式的实现，但是CCNotificationCenter稍微有些许差别。
<!--more-->
首先，CCNotificationCenter不是通过自身状态改变来通知观察者，而是通过显式地发送观察者感兴趣的消息（postNotification）来通知它们。每一种消息类型可以对应多个观察者，同时，每一个观察者也可以“观察”多个消息类型。其次，观察者定义相应的响应事件同消息类型关联，当某个地方触发postNotification来广播一个消息的时候，CCNotificationCenter会遍历所有的观察者，判断它们注册的消息类型是否匹配，如果匹配，则触发相应的注册响应事件。最后，该观察者模式采用的是推模型，即由目标对象去通知所有的观察者。

    其实CCNotificationCenter和CCNotificationObserver更准确的叫法是：[订阅发布模式](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)。
## 2、使用此模式的优缺点

优点：

1）实现了目标对象和观察者之间的抽象耦合，在本例中，则是实现了消息与观察者的抽象耦合。可以定义一种消息与消息处理对象的一对多的关系，而不用担心彼此的实现细节。

2）观察者模式可以定义某种意义上的广播通信机制。

3）实现订阅者与发布者的松散耦合，同时保障了良好的扩展性。

缺点：

1）注册成为CCNotificationCenter的观察者后，如果忘记调用removeObserver，则会引起内存泄漏。因为addObserver会把观察者的引用计算加1.
## 3、此模式的定义及一般实现

定义：
    
定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

UML图：
    
[![](http://www.zilongshanren.com/wp-content/uploads/2012/10/500px-Observer.svg_-300x124.png "500px-Observer.svg")](http://www.zilongshanren.com/wp-content/uploads/2012/10/500px-Observer.svg_.png)

一般实现：参考CCNotificationCenter.h和CCNotification.cpp文件的实现
## 4、游戏开发中如何运用此模式

我们考虑cocos2d-x中一个非常典型的应用场景，你的GameScene里面有两个layer，一个gameLayer，它包含了游戏中的对象，比如玩家、敌人等。另一个层是HudLayer，它包含了游戏中显示分数、生命值等信息。如何让这两个层相互通信。

第一种办法，你可以让gameLayer包含一个hudLayer的引用，同时也可以让hudLayer包含一个gameLayer的引用。注意！这里问题出现了，如果两个类都包含彼此的强引用（所谓强引用就是retain），就会引起循环引用的情况，如果其中一个类包含的是弱引用，问题就不会出现。循环引用是使用引用计数管理内存的一个致命弱点，会导致资源永远得不到释放，而且查错起来非常麻烦。

第二种办法，把gameScene做成一个单例，同时让gameScene包含gameLayer和hudLayer的弱引用，这样就可以直接通过[GameScene sharedInstance].gameLayer或者[GameScene sharedInstance].hudLayer来访问了。

第三种办法，使用gameLayer->getParent()获得gameScene，再使用gameScene来获得hudLayer。

第四种办法，使用CCNotificationCenter。当hudLayer注册它感兴趣的消息，当gameLayer需要通知hudLayer的时候，只需通过CCNotificationCenter发送一个对应的消息即可。
## 5、此模式与其它模式的关系

观察者模式是实现MVC模式的重要组成部分，一个model可以对应多个views，model就是目标对象，而view则是观察者，当model改变的时候，要通知所有的view也相应的改变。

欢迎读者批评指正，如果有兴趣跟我一起挖掘cocos2d-x中所涉及到的设计模式的朋友，可以给我发邮件：guanghui8827@126.com或者直接留言。
