---
layout: post
title: !binary |-
  TWFjT1MgMTAuOC4x5a6J6KOFb3BlbmN2IDIuNC4y
wordpress_id: 41
wordpress_url: !binary |-
  aHR0cDovL2d1YW5naHVpODgyNy5nb3RvaXA0LmNvbS8/cD00MQ==
categories:
- title: !binary |-
    b3BlbmN2
  slug: !binary |-
    b3BlbmN2
  autoslug: !binary |-
    b3BlbmN2
tags:
- title: !binary |-
    T3BlbkNW
  slug: !binary |-
    b3BlbmN2LTI=
  autoslug: !binary |-
    b3BlbmN2
---

前言：由于学习研究需要，又因为有一年多时间没在windows下面做开发了，所以想在mac上面配置一下OpenCV的开发环境。

首先，准备工作，安装好xcode 4.4.1，同时安装command line tool。接下来，安装cmake 2.8.8，这个可以到官网去下载DMG安装包，不过有时候这个网站访问不了。

安装过程：

到opencv官网上下载2.4.2版本，然后解压缩，接下来，运行以下命令来安装opencv:
<!--more-->[php]cd OpenCV-2.4.2mkdir buildcd buildcmake -G &quot;Unix Makefiles&quot; -D CMAKE_OSX_ARCHITECTURES=i386 -D CMAKE_C_FLAGS=-m32 -D CMAKE_CXX_FLAGS=-m32 ..makesudo make install[/php]
接下来，打开xcode，新建一个command line tool程序，如下所示：
[![](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/1-300x200.jpg "new-project")](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/1.jpg)
把type设置为foundation,并命名为HelloOpenCV，如下图所示：
[![](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/chooseType-300x202.jpg "chooseType")](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/chooseType.jpg)
接下来，打开工程的build settings，做以下设置：
[php]Inside “Search Paths”:Header Search Paths: /usr/local/includeLibrary Search Paths: /usr/local/libInside “Linking”:Other Linker Flags: -lopencv_core -lopencv_highgui -lopencv_imgproc[/php]
最后，往main.m文件中加入以下代码：
[code language="js"]//// main.m// OpenCVTest//// Created by __MyName__ on 16/09/11.// Copyright 2011 __MyCompanyName__. All rights reserved.//#import &lt;Foundation/Foundation.h&gt;#import &quot;opencv/cv.h&quot;#import &quot;opencv/highgui.h&quot;int main (int argc, const char * argv[]){    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];        IplImage* img = cvCreateImage( cvSize( 640, 480 ), IPL_DEPTH_8U, 3 );        cvCircle( img, cvPoint( 320, 240 ), 100, cvScalar( 255, 0, 0 , 255 ), 5, 8, 0 );        cvNamedWindow( &quot;OpenCV Window&quot;, CV_WINDOW_NORMAL );    cvShowImage( &quot;OpenCV Window&quot;, img );        cvWaitKey(0);        cvDestroyWindow( &quot;OpenCV Window&quot; );    cvReleaseImage( &amp;img );        [pool drain];    return 0;}[/code]
此时，编译并运行。如果你编译出错的话，你需要修改build settings，把构建方式改成32位的，如下图所示：
[![](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/changeArchitecture-300x97.jpg "changeArchitecture")](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/changeArchitecture.jpg)
此时，编译并运行，你将得到如下所示输出：
[![](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/helloOpenCVResult-300x210.jpg "helloOpenCVResult")](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/helloOpenCVResult.jpg)
注意：如果要使用ffmpeg，那么可以参考这个帖子：http://tech.enekochan.com/2012/07/27/install-opencv-2-4-2-with-ffmpeg-support-in-mac-os-x-10-8/。不过，需要注意的地方就是，需要重新configure opencv，并且把build目录删除，重新运行下列命令：
[php]cd buildcmake ..(注意这里没有加-i386和32的位标志)make sudo make install[/php]
这样，如果想要运行上面的例子，需要修改build settings，去掉i386,同时使用64位的方式来运行程序，如下图所示：
[![](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/changeBuildSettings-300x82.jpg "changeBuildSettings")](http://guanghui8827.gotoip4.com/wp-content/uploads/2012/09/changeBuildSettings.jpg)
最后，如果想要使用C++，必须把编译器改成LLVM GCC4.2，同时main.m改成main.mm，并在.pch文件的最开始处添加下列代码：
[php]#ifdef __cplusplus#import &quot;opencv2/opencv.hpp&quot;#endif[/php]**References:**
[http://tech.enekochan.com/2012/05/21/use-opencv-in-xcode-4-for-a-mac-os-x-application/](http://tech.enekochan.com/2012/05/21/use-opencv-in-xcode-4-for-a-mac-os-x-application/ "http://tech.enekochan.com/2012/05/21/use-opencv-in-xcode-4-for-a-mac-os-x-application/")

[http://tech.enekochan.com/2012/05/21/install-opencv-2-3-1a-in-mac-os-x-10-6/](http://tech.enekochan.com/2012/05/21/install-opencv-2-3-1a-in-mac-os-x-10-6/ "http://tech.enekochan.com/2012/05/21/install-opencv-2-3-1a-in-mac-os-x-10-6/")
