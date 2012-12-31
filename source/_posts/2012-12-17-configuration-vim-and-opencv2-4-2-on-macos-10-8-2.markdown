---
layout: post
title: !binary |-
  Q29uZmlndXJlIHZpbSBhbmQgT3BlbkNWMi40LjIgb24gTWFjT1MgMTAuOC4y
wordpress_id: 441
wordpress_url: !binary |-
  aHR0cDovL3d3dy56aWxvbmdzaGFucmVuLmNvbS8/cD00NDE=
categories:
- title: !binary |-
    b3BlbmN2
  slug: !binary |-
    b3BlbmN2
  autoslug: !binary |-
    b3BlbmN2
- title: !binary |-
    dmlt
  slug: !binary |-
    dmlt
  autoslug: !binary |-
    dmlt
tags:
- title: !binary |-
    T3BlbkNW
  slug: !binary |-
    b3BlbmN2LTI=
  autoslug: !binary |-
    b3BlbmN2
- title: !binary |-
    dmlt
  slug: !binary |-
    dmlt
  autoslug: !binary |-
    dmlt
---
## Introduction
<div style="float:right;">[![](http://www.zilongshanren.com/wp-content/uploads/2012/12/vim-logo-en-300x300.png "vim-logo-en")](http://www.zilongshanren.com/wp-content/uploads/2012/12/vim-logo-en.png)</div>
Now vim has become the "killer" editor for me. I use it for coding c/c++,lua,javascript and I find it is very powerful for scripting languages.

Recently, I am studying the OpenCV library. So I want to make my vim suitable for developing opencv programs.

Here is the configuration process.
<!--more-->## Install OpenCV 2.4.2

You can follow these two links for the installation instructions.

[http://tech.enekochan.com/2012/05/21/use-opencv-in-xcode-4-for-a-mac-os-x-application/](http://tech.enekochan.com/2012/05/21/use-opencv-in-xcode-4-for-a-mac-os-x-application/) 

[http://tech.enekochan.com/2012/05/21/install-opencv-2-3-1a-in-mac-os-x-10-6/](http://tech.enekochan.com/2012/05/21/install-opencv-2-3-1a-in-mac-os-x-10-6/)
## Generate opencv ctags

In order to generate ctags for opencv,you should install stags first. But be careful that the default ctags program shipped with mac is outdated. You should use homebrew to install the newest version of ctags.
### Install Exuberant CTags

Open your terminal and write the following commands:
[php]brew install ctags-exuberant[/php]
If you wonder whether the installation is successfully or not. You can type the "ctags --version".If you get the following output, then congratulations, you did it. 
[php]uberant Ctags 5.8, Copyright (C) 1996-2009 Darren Hiebert  Compiled: Nov  7 2012, 16:32:27  Addresses: &lt;dhiebert@users.sourceforge.net&gt;, http://ctags.sourceforge.net  Optional compiled features: +wildcards, +regex[/php]
After installation, We can use ctags to generate tag list for opencv code auto completion.
### Generate ctags.

[php]cd /usr/local/includectags -R --c++-kinds=+p --fields=+iaS --extra=+q ./[/php]

Then you can use the generated tags for auto completion. For more information, you can refer to this [link](http://stackoverflow.com/questions/8155310/autocomplete-of-opencv-functions-with-vim).
## Configure your vimrc file

[php]"add command to complie opencv program"nnoremap <silent><leader>2 :call CompileRunOpencv() <cr>function! CompileRunOpencv()    let IncDir = "/usr/local/include"    let LibDir = "/usr/local/lib"    let Libs = "-lopencv_core -lopencv_highgui -lopencv_imgproc"    exec "w"    exec "lcd %:p:h"    exec "r !g++ -I" . IncDir . " -L" . LibDir . " % " . Libs . " -o %< "     echo "compile finished!"endfunc[/php]
</cr></leader></silent>
Now, you can use (leader 2) to compile your opencv file.

At last, I post my macvim screen here:
[![](http://www.zilongshanren.com/wp-content/uploads/2012/12/myvim-300x177.jpg "myvim")](http://www.zilongshanren.com/wp-content/uploads/2012/12/myvim.jpg)## Limitations

With the above method, you can only compile one file at a time. So if you have more than one file, you could change theresponding g++ compile instructions.
## References

[http://stackoverflow.com/questions/8155310/autocomplete-of-opencv-functions-with-vim](http://stackoverflow.com/questions/8155310/autocomplete-of-opencv-functions-with-vim)

[http://bsd-noobz.com/opencv-guide/32-4-set-up-opencv-in-vim](http://bsd-noobz.com/opencv-guide/32-4-set-up-opencv-in-vim)

[http://blog.damiles.com/2009/07/exuberant-ctags-and-opencv-with-vim-thanks-piponazo/](http://blog.damiles.com/2009/07/exuberant-ctags-and-opencv-with-vim-thanks-piponazo/)

[http://plagatux.es/2009/02/generar-etiquetas-con-ctags-y-usarlas-en-vim/comment-page-1/#comment-1716](http://plagatux.es/2009/02/generar-etiquetas-con-ctags-y-usarlas-en-vim/comment-page-1/#comment-1716)
