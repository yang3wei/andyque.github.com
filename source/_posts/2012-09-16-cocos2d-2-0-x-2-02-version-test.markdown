---
layout: post
title: cocos2d-x 2.02 版本初体验
date: 2012-09-16 17:49
comments: true
categories: OpenCV
tags: OpenCV
---

{% img right /images/posts/2dxlogo.png 300 300 %}

Cocos2d-2.0-x-2.02发布也有一段时间了,这个版本应该算是cocos2d-x 2.0的第一个正式版本.该版本实现了最新的js-binding,添加了最新的CocosBuilder支持,同时添加了多分辨率支持,添加了CCEditBox, CCHttpClient扩展,在WIN32平台上面开始使用OPENGL等. 好久没有在WINDOWS平台上面玩cocos2d-x了,今天趁着有时间,重头来过一遍吧.


开发环境: Win7 64bit +  eclipse juno + ndk r8b + android 10 安装配置方面网上已经有很多教程了,
<!--more-->

如下:<br />
[http://blog.csdn.net/nicholasvan/article/details/7772158](http://blog.csdn.net/nicholasvan/article/details/7772158)
[http://www.multigesture.net/articles/how-to-setup-cocos2d-x-windows-and-android/](http://www.multigesture.net/articles/how-to-setup-cocos2d-x-windows-and-android/)

下面给出配置并运行自带的sample过程中遇到的问题及解决方法:

1.安装c/C++语言插件,并去除错误和警告,具体可以参考我翻译的文章: [http://www.cnblogs.com/zilongshanren/archive/2012/04/28/2473282.html](http://www.cnblogs.com/zilongshanren/archive/2012/04/28/2473282.html)

2.** [Program “make” not found in PATH](http://stackoverflow.com/questions/11579135/program-make-not-found-in-path)** 解决办法:设置PATH环境变量,加入cygwin/bin目录进去.再把项目删除,再重新添加进可以了.注意添加项目的时候,要选中copy project to workspace,这样在删除的时候就不会影响cocos2d-x原来的项目.

3.** ****[@override报注解annotation错误 ](http://blog.csdn.net/spy19881201/article/details/6017889)****** 点击项目,右键属性 然后把java –> compiler ->设置成1.6就可以了.具体可以参考下面链接: [http://stackoverflow.com/questions/1678122/must-override-a-superclass-method-errors-after-importing-a-project-into-eclips](http://stackoverflow.com/questions/1678122/must-override-a-superclass-method-errors-after-importing-a-project-into-eclips)

4.导入android项目以后,报target-8错误: 解决办法:打开project.properties ,把target=android-8改成 target=android-10。搞定。 

5.如果找不到cocos2dx/lib下面的java库,也可以在project.properties中添加库的引用: android.library.reference.1=../../../cocos2dx/platform/android/java 添加完之后,移除项目再重新添加就可以了.

6.使用cygwin运行build_native.sh的时候,报make程序找不到.这个只需要重新运行setup.exe,然后在search里面输入make,再鼠标左键把default点成install,再下一步安装就OK了.安装cygwin可以参考这个链接: [http://ekendraonline.com/edu/install-cygwin-windows7-64bit-2418.html](http://ekendraonline.com/edu/install-cygwin-windows7-64bit-2418.html)

7.如果[Android NDK library: findLibrary returned null](http://stackoverflow.com/questions/8821926/android-ndk-library-findlibrary-returned-null)的错误: 请确保你的项目中的libs目录和assets目录引用是否正确,是否包含了项目所需的动态库和资源文件,如果没有,请手动导入.

8.如果在cygwin里面运行build_native.sh文件时报下面的错误:
{% img left /images/posts/builde_native_error.jpg 750 300 %}


则需要转换文件格式为UNIX格式,下载NotePad++,然后打开build_native.sh,再选择"编辑"->"档案格式转换"->"转换为UNIX格式".再保存运行就可以了.

 上面的这些问题是我今天遇到的,欢迎大家把自己遇到的问题及解决办法也分享一下,这样也可以省去大家google的时间嘛,而且google有时候还访问不了,呵呵.
