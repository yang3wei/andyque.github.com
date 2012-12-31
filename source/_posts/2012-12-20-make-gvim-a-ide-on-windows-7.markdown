---
layout: post
title: make your gvim a IDE on Windows 7
categories: vim
tags: vim
date: 2012-12-20 17:49
---
{% img right /images/posts/vim-logo-en.png 300 300 %}

## Introduction

According to the online survey, Vim become the second favourite IDE in the world. Really surprising, don't you?

I have successfully configured Vim on my Mac, using git and pathogen to manage my Vim plugins. Here is my Github[Repository](https://github.com/andyque/dotvim).

Because I am a big fan of cocos2d, so I set up another two Github Repository,named [Cocos2DTags](https://github.com/andyque/Cocos2DTags) and [snippetsForCocos2d](https://github.com/andyque/snippetsForCocos2d). I use Exuberant Ctags 5.8 to generate ctags for code and tag navigations. Due to the lack of good understanding of modern javascript programming, I use DoctorJs(Jsctags) for generating js tags.

I have made my Vim very suitable for c/c++, lua and javascript development, especially for cocos2d-x and cocos2d-html5 game development. The above three repo is still young, but I will make them better with more practice and efforts.

I'm a little compulsive, so I want to make my Vim running on every platform. Recently mainly for windows, mac and ubuntu. The configuration process for mac and ubuntu is intuitive. But it's not the same with windows. So this blog post is mainly for recoding the configure process of gvim on windows 7 64-bit platform.
<!--more-->

## Installation

Install gvim on windows is very easy. You can download the green version of [gvim](http://code.google.com/p/vim-win3264/downloads/detail?name=vim73-x64.zip&can=2&q=). This is a 64-bit version of gvim. So make sure your windows system is 64-bit. After download it, you can extract it into  your login user account. Like c:/User/xxx(the "xxx" is your account name). Then open the vim73 directory, and double click the install.exe to install gvim. After installation, you can find three gvim shortcuts on your desktop.

## Configure your existing Vim Repo

- Use git to clone my repo to ``vimfles`` directory. This fold lies in the same level with vim73 directory . The vimfiles directory looks like the following:

{% img left /images/posts/win7vimfiles.jpg 750 300 %}


- Configure your _vimrc file in your $HOME directory. (Note: $HOME is the c:/User/xxx). Add the following scripts to your _vimrc file.

``` c++ 
source $VIMRUNTIME..\vimfiles\vimrc
```


Now the gvim can work with your existing Vim configurations.

## Configure your plugins

- Configure TagBar and Cppomnicomplete plugin. You should install Exuberant Ctags 5.8, and put catgs.exe to your"PATH"(Like System32 directory).

- Install Python2.7.1 64-bit versioin.

- Install splint for c++ syntax checking, jslint for javascript and luac for lua syntax checking.

- Configure snipMate plugin. Open vimfile/bundle/snipMat/plugin/snipMat.vim,add the following code to replace the 24th line .

``` c++ 
let snippets_dir = substitute(substitute(globpath(&rtp, 'snippets/'), "\n", ',', 'g'), 'snippets\\,', 'snippets,', 'g')

```


## Last revise

We can add the following scripts at the end of _vimrc files:

``` c++ 
set guioptions-=m
set guioptions-=T
```


These two lines can hidden your gvim Toolbar and Menubar.

If you don't like win32 command line commands, you can install [this package](http://dl.vmall.com/c0l2p58pa6) for convenience.
