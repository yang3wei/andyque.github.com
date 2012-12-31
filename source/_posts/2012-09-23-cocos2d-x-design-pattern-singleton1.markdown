---
layout: post
title: cocos2d-x设计模式发掘之一：单例模式
categories: cocos2d-x design pattern
date: 2012-09-23 17:49
tags: design pattern
---

本系列文章我将和大家一起来发掘cocos2d-x中所使用到的设计模式，同样的，这些模式在cocos2d-iphone中也可以找到其身影。
<div style="float: right;">[![](http://www.zilongshanren.com/wp-content/uploads/2012/09/2dx_icon_512_-rightangle1-300x300.png "2dx_icon_512_-rightangle")](http://www.zilongshanren.com/wp-content/uploads/2012/09/2dx_icon_512_-rightangle1.png)</div>
**声明**：这里发掘模式只是我的个人爱好，通过这个过程，我希望能加深自己对于设计模式运用的理解。关于模式的学习，市面上已经有许多非常好的书籍了。比如《Head First设计模式》、GoF的设计模式，还有《研磨设计模式》等。如果读者对于设计模式完全不了解的话，建议先阅读上面至少一本书籍，了解设计模式之后再阅读本系列文章。这样大家才会有相互交流的共同语言。

为什么要发掘设计模式呢？因为设计模式本身就是人们在一些面向对象的软件系统里面发掘出来的，在一定的场景之下可以重用的解决方案。通过对模式的挖掘，我可以借此机会学习一下这些优秀的设计思想。因为我觉得，一个好的开源游戏框架除了能给我们开发者带来开发效率的提升以外，还应该被我们吸收其设计思想，这样它的价值才能完整。
<!--more-->
本系列文章将按照如下思路进行模式挖掘：
- 找出某个设计模式的应用场景（类、类结构、对象结构，必要时结合UML类图）
- 分析为什么要使用此模式（即设计决策）
- 使用此模式的优缺点是什么（任何事务都有两面性，设计模式也不例外）
- 此模式的定义及一般实现（这个在GoF的经典书籍里面有，这里借用一下）
- 在游戏开发中如何运用此模式（自己对于模式运用场景的理解）
- 此模式经常与哪些模式配合使用（这个也基本是从GoF的书籍里面借用了）
&nbsp;## 1、应用场景

Cocos2D-x中的单例如下：CCDirector,CCTextureCache,CCSpriteFrameCache,CCAnimationCache,CCUserDefault,CCNotificationCenter，CCShaderCache，CCScriptEngineManager，CCPoolManager，CCFileUtils，CCProfiler，SimleAudioEngie，CCConfiguration，CCApplication，CCDirectorCaller（ios平台），CCEGLView。

为什么会存在这样一些单例呢？

首先是CCDirector单例，它负责管理初始化OpenGL渲染窗口以及游戏场景的流程控制，它是cocos2dx游戏开发中必不可少的类之一。为什么要把此类设计成单例对象呢？因为，一个游戏只需要有一个游戏窗口就够了，所以，只需要初始化一次OpenGL渲染窗口。而且场景的流程控制功能，也只需要存在一个这样的场景控制对象即可。为了保证CCDirector类只存在一个实例对象，就必须使用单例模式。

接下来是CCTextureCache单例。此类主要负责加载游戏当中所需要的纹理图片资源，这些资源加载好以后，就可以一直保留在内存里面，当下次再需要使用此纹理的时候，直接返回相应的纹理对象引用就可以了，无需再重复加载。当然，这样做可能会很浪费内存，所以cocos2dx采用了一种引用计数的方式来管理对象内存，当纹理刚被加载进来的时候，引用计数为1。如果使用此纹理对象创建一个精灵，那么此纹理对象引用会加1.如果精灵被释放，则相应的引用计数减1.当纹理的引用计数变为0的时候，纹理所占用的内存自然就会被释放掉。这也是为什么在收到内存警告的时候，会调用CCTextureCache的removeUnusedTextures方法。此方法会将所有引用计数为1的纹理对象全部释放掉。单从字面上看，Cache，即缓存的意思。它以牺牲一定的内存压力为代价，带来的是游戏性能的提升。这种cache技术，在游戏开发中比比皆是。注：IO操作对游戏性能影响非常大，要极力避免！！！

类似的CCSpriteFrameCache、CCAnimationCache和CCShaderCache，它们也都是缓存类，分别负责缓存SpriteFrame、Animation和Shader。这样做的原因无非就是为了性能，以空间换时间。

接下来，看看CCUserDefault。此类主要是用来保存游戏中的数据用的，它会创建一个xml文件，并把用户自定义的数据以key-value的形式存储到此xml文件中。此类为什么会变成单例类呢？原因也很简单，因为类似这种操作数据文件，或者配置文件的类，通常只需要在程序运行过程中存在一个实例即可。

接着是CCNotificationCenter，这是一个通知中心，它其实还运用了一个观察者模式，这里暂时不讨论。该通知中心理论上也是只需要一个就够了。但是，cocos2d-x在实现此单例的时候，并没有将此类的构造函数私有么，我在猜想，是不是开发人员有意为之呢？或者多个通知中心也有其存在的价值。这个大家可以讨论一下。

CCScriptEngineManager，此类包含一个实现了CCScriptEngineProtocl接口的对象引用，它可以帮助我们方便地找到LuaEngine对象。这里单例的作用纯粹变成了LuaEngine的一个全局访问点了。为什么不直接把LuaEngine作为单例对象呢？是否在某些情况之下，可能需要创建多个LuaEngine对象？如果考虑到cocos2d-x还可以同时支持其它的脚本引擎，那也可以相应的把另外的脚本引擎设计成单例类。当然，这样做无疑会使引擎里面的单例过多。考虑到单例模式近年来被广大开发者所诟病，已将其列入“反模式”。这里引用CCScriptEngineManager单例类，给其它引擎对象提供访问的惟一全局点，这也不失为一个办法。不知我的推测是否正确？

CCPoolManager，此类是用来管理AutoReleasePool对象栈的。因为cocos2d-x采用的是基于引用计数的方式来管理动态内存，所以采用引用计数的被托管对象都被放入一个当前的autoReleasePool里面去了。当CCDirector的mainLoop每次更新的时候，都会调用CCPoolManager的pop方法，把当前autoReleasePool里面的所有autoRelease对象的托管状态设置为false，同时把该autoReleasePool清空，而清空的时候则会调用autoReleasePool里面所有对象的release方法来释放内存。此类为什么要设计与单例呢？因为多个地方需要引用此类，为了方便引用，所以设计成单例。

然后是CCFileUtils类。该类是一个工具类。工具类和配置文件类，它们绝大多数情况也都是设计成单例的。因为它们没有存在多个实例的必要。同时，它们也可以实现为一组类方法，这样无需创建对象也能够使用。

然后是CCProfiler类，该类负责cocos2d的性能其运行情况分析，也是一个工具类。所以它设计成单例类的理由与CCFileUtils类差不多。

CCConfiguration类也被设计成了单例对象，此类主要负责管理cocos2d-x的一些OpenGL变量信息。这些信息本可以通过定义一些宏，或者通过一些全局变量来解决的。这里设计成单例类也是更加“面向对象”的体现。因为这些配置信息根本不需存在多个对象。

CCApplication类的设计初衷是获得平台相关的一些信息，最重要的是运行游戏的主循环（main loop）。一个游戏只需要一个应用程序实例，所以设计与单例。

CCEGLView是Cocos2d-x对于EGLView的抽象，不同的平台会有不同的实现，使之可以适用不同的平台。在ios平台上面它是对EAGLView的一个简单的封装。该类表示的是对OpenGL渲染上下文窗口的一种抽象，这是一种虚拟资源，而且只有存在一份实例的可能，所以被设计成单例类。

CCDirectorCaller类是ios平台相关的类，就是对ios平台CCDirector对象的一个封装，使用的是CADisplayLink来运行游戏主循环。该类和CCDirector类差不多，也可以设计成单例。为什么会在CCApplication类里面调用CCDirectorCaller类，是基于分离平台相关代码的考虑。CCApplication是的，CCDirectorCaller也是的。

最后一个是SimpleAudioEngine类，它也被设计成了一个单例类。因为它提供给了开发人员最简单的声音操作接口，可以方便地处理游戏中的背景音乐和音效。此类同时还应用了外观模式，把CocoDenshion子系统中的复杂功能给屏蔽起来了，简化了客户端程序员的调用。该类为什么要设计成单例，是因为到处都要访问它。设计成单例会很方便，而且它与其它对象没有什么联系，不好使用对象组合。
## 2.使用单例模式的优缺点
优点：<br />
1）简单易用，限制一个类只有一个实例，可以降低创建多个对象可能会引起的内存问题的风险，包括内存泄漏、内存占用问题。
缺点：<br />
    单例模式因为提供了一个全局的访问点，你可以在程序的任何地方轻而易取地访问到，这本身就是一种高耦合的设计。一旦单例改变以后，其它模块都需要修改。另外，单例模式使得对象变成了全局的了。学过面对对象编程的人都知道，全局变量是非常邪恶的，要尽量不要使用。而且单例模式会使得对象的内存在程序结束之前一直存在，在一些使用GC的语言里面，这其实就是一种内存泄漏，因为它们永远都不到释放。当然，也可以通过提供一些特殊的方法来释放单例对象所占用的内存，比如前面提到的XXXCache对象，都有相应的Purge方法。最后，cocos2dx里面实现的单例，99%都不是线程安全的。

在讨论优缺点的时候，读者想必也看出来了，缺点比优点多多了。这是给大家提个醒，以后使用单例模式的时候要谨慎，不要滥用。因为此模式最容易被滥用。只有真正符合单例模式应用场景的时候，才能考虑。不要为了访问方便，就把任何类都弄成单例，这样，到最后，你会发现你的程序里面就只剩下一堆单例和工厂了。

此外，单例模式正在消减，比如CCActionManager和CCTouchDispatcher在cocos2d1.0之前也是单例，现在变成了CCDirector类的属性了。而且Riq（cocos2d-iphone的作者）也有在邮件中提到，以后CCDirector对象也会变成非单例，并且允许一个游戏中创建多个游戏窗口。

3.单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局的访问点。
UML图：<br />
[![](http://www.zilongshanren.com/wp-content/uploads/2012/09/Singleton.png "Singleton")](http://www.zilongshanren.com/wp-content/uploads/2012/09/Singleton.png)

它的一般实现如下所示：

[php]public class Singleton{   public:   //全局访问点   static Singleton* SharedSingleton()   {       if(NULL == m_spSingleton)       {           m_spSingleton = new Singleton();       }       return m_spSingleton;   }  private:  static Singleton* m_spSingleton;  Singleton();  Singleton(const Singleton& other);  Singleton& operator=(const Singleton& other);};Singleton* Singleton::m_spSingleton = NULL;[/php]

注意，这里只是最基本的实现，它没有考虑到线程安全，也没有考虑内存释放。但是，这个实现有两个最基本的要素。一：定义一个静态变量，并把构造函数等设置为私有的。二：提供一个全局的访问点给外部访问。

4.游戏开发中如何运用此模式呢？众所周知，游戏开发中离不开游戏数据保存和加载。这些数据包括关卡数据、游戏进行中的状态数据等。这样一些信息很多游戏模块中都需要访问，所以可以为之设置一个单例对象。我武断地认为，客户端游戏开发中，至少需要一个单例对象。因为一个全局的访问点可以方便很多对象之间的交互。根据之前的讨论，也可以把一些时觉需要用到的类引用保存在此单例对象中，不过只需要保存弱引用即可。使用单例，最严重的就是怕内存泄漏，所以，大家尽量不要把单例类设计地太复杂，也不要让它包含过多的动态内存管理工作。

5.单例模式一般与工厂模式配合使用，因为一般会将工厂类设计成单例对象。比如前面提到的各种cache类，它们也可以看作是某种意义上的工厂对象。由于工厂就是负责生产对象的，而cache类都可以根据用户的需要生产出相应的对象。

最后，看看cocos2d-x创始人王哲对于什么是单例的看法：“这么说吧， 我设计成单例基本就一种抽象情况：独占性资源。比如某个硬件IO （如CCTouchDispatcher, CCAccelerometer），比如公用的缓存区（CCTextureCache, CCUserDefault）。后来有人抱怨单例类太多，想销毁整个cocos2d instance再重建很麻烦，所以小明和riq就把大量单例类放到CCDirector里面管理。”

欢迎读者批评指正，如果有兴趣跟我一起挖掘cocos2d-x中所涉及到的设计模式的朋友，可以给我发邮件：guanghui8827@126.com或者直接留言。
