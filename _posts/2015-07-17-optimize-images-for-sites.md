---
layout: post
title:  Optimize images to reduce file sizes on the site
date:   2015-07-17 00:07:10
excerpt: Optimize images to reduce file sizes in order to faster serve the site
categories:
---

There is a great tool <a href="https://developers.google.com/speed/pagespeed/insights/" target="_blank">PageSpeed Insights</a> that shows what problems you have with your site and how you can improve user experience. I decided to check some of the sites, which I use on a regular basis, to see if they have image optimized. <a href="https://www.upwork.com/" target="_blank">Upwork</a> is one of them and here are the results

![PageSpeed Insights on Upwork](/images/posts/upwork-page-speed-insight.png){: .img-responsive .center-block }

Test shows there is an image that can be optimized. Apart from the results, you can actually download optimized images on the same page! That's pretty nice and crazy fast way to improve your site but I want to show you some other ways to optimize images.

## Setup Gulp to automatically optimize images in your project

I think building tools like <a href="http://gulpjs.com/" target="_blank">Gulp</a> or <a href="http://gruntjs.com/" target="_blank">Grunt</a> are perfect solutions for the image optimization. All you need to do is to setup a simple task and then serve optimized images for users. Here is what you need to do.

Install required modules for a gulp

    npm install --save-dev gulp-imagemin imagemin-pngquant

Create a task in your gulpfile.js

{% highlight js %}
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('images', function () {
  return gulp.src('images/**/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('images'));
});
{% endhighlight %}

and then run the task

    $ gulp images
    [02:14:35] Using gulpfile ~/workspace/iurii.ninja/gulpfile.js
    [02:14:35] Starting 'images'...
    [02:14:37] gulp-imagemin: Minified 11 images (saved 105.28 kB - 5.2%)
    [02:14:37] Finished 'images' after 1.57 s

Now whenever you add new images to your 'images' directory, just rerun the command.

## Use desktop software to process images

If you do not want to setup Gulp, no problem, there is a desktop tool that you can use
<a href="https://imageoptim.com/" target="_blank">ImageOptim</a> and optimize your images in few clicks.

Okay, now I think it's time you check your site images and optimize them!
