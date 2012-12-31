---
layout: post
title: !binary |-
  V29yZFByZXNzIFRpcHM=
wordpress_id: 323
wordpress_url: !binary |-
  aHR0cDovL3d3dy56aWxvbmdzaGFucmVuLmNvbS8/cD0zMjM=
categories:
- title: !binary |-
    d29yZHByZXNz
  slug: !binary |-
    d29yZHByZXNz
  autoslug: !binary |-
    d29yZHByZXNz
tags:
- title: !binary |-
    d29yZHByZXNz
  slug: !binary |-
    d29yZHByZXNz
  autoslug: !binary |-
    d29yZHByZXNz
---
<div style="float: right;">[![](http://www.zilongshanren.com/wp-content/uploads/2012/11/wordpress-logo-stacked-rgb-300x186.png "wordpress-logo-stacked-rgb")](http://www.zilongshanren.com/wp-content/uploads/2012/11/wordpress-logo-stacked-rgb.png)</div><br />I am a novice as to wordpress and php. I coded Asp.net before, so the ugly syntax doesn't scare me much.I write blog post in cnblogs.com before, it's very convenient, but lack of some custom feature.So I plan to host my own wordpress blog site. Now it is here, so exciting. :)
when the first time, I sit down and begin to write some,i find it's annoying. No excerpts,no thumb images next to ecerpts,no view counts, no popular articles etc. It's a little sad, isn't it?

But we are programmers, we are eager for challenge ourself and eager for customization, like struggling with vim editor before.Now it's time to repeat this process.

When I enter a new programming area, I deeply know a famous sentence.> _"Google is your friend"_After a few days blogging with wp, I think it's time for me to post something related to wp configurations.



1. [How to add excerpt to Twenty Ten](http://zeaks.org/tutorials/display-excerpts-in-twenty-ten/).

怎么在Twenty Ten主页显示摘要？[传送门](http://zeaks.org/tutorials/display-excerpts-in-twenty-ten/).

2. how to specify Chinese excerpts length?

Solutions:add the following code to then end of your function.php file(note:sometimes not work. :():

怎么指定摘要的中文文字长度？

解决方法：修改function.php，在最后添加下列代码。

[php]function chinese_excerpt($text, $lenth=600) {    $text = mb_substr($text,0, $lenth);    return $text;}add_filter('the_excerpt', 'chinese_excerpt');[/php]

3. How to insert plain HTML code into your post, forbid UI editor auto generate HTML tags for you?

Solutions: add the following code to the end of your function.php file:

如何在代码中全手工编写HTML，不让编辑器自动给你生成相应的HTML标签？

解决方法：修改function.php文件，在最后加入下列代码：

[php]remove_filter('the_content', 'wpautop');[/php]

4. How to display a thumb image next to excerpts contents?

Solutions: the easiest way: use Thumbs Excerpts plugin.

如何在摘要旁边显示一张小图片？

解决方法：最容易的方法就是使用Thumbs Excerpts插件。

5. [How To preserve HTML Tags in WordPress Excerpt Without a Plugin](http://bacsoftwareconsulting.com/blog/index.php/wordpress-cat/how-to-preserve-html-tags-in-wordpress-excerpt-without-a-plugin/).

如何让摘要看起来，段落格式没有变化，见上面的链接。（使用more标签的时候，还是有一点问题）

6. Collapse/expand syntax highlighted block?

This this the [link](http://www.nextpoint.se/?p=126) for you.

7. How to change Twenty Ten default font size &amp; font-family?

Solutions:checkout this [link](http://blog.crogram.org/68.html).(BTW:it's written in Chinese.)

8. How to display post views?

Solutions:install postView plugin.If you need some customize,you could edit loop.php file,about line 133,modify the code to the following:

[php]<div class="entry-meta ">    <?php twentyten_posted_on(); ?>   nbsp; nbsp;nbsp;nbsp;nbsp;nbsp;nbsp;阅读次数（<br />    <?php if(function_exists('the_views')) { the_views(); } ?>  ）</div><!-- .entry-meta -->[/php]

9. Forget all above, update your theme to twenty twelve like this site, everything is ok!

Including the excerpt and more tag!  Sorry for reading the above tips. :( 

And more tips will be added in the future.

Now let's rock! :)
