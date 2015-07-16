---
layout:  post
title:   Creating a sticky footer
date:    2015-05-29 00:19:10
excerpt: Creating sticky footer with CSS, HTML and JavaScript
categories:
---

# Fixed height footer

If the footer has a fixed height, the solution is simple.

We apply "position: relative" to the html tag and then "position: absolute" to the footer element, so we get the control of it. Some great explanations on this position technique you can find <a href="https://css-tricks.com/absolute-positioning-inside-relative-positioning/" target="_blank">here</a>

{% highlight css %}
html {
  position: relative;
  min-height: 100%;
}

.footer-container {
  position: absolute;
  bottom: 0;
  left: 0;
}
{% endhighlight %}

To prevent the content overlapping the footer, we are adding "margin-bottom", which is equal to the footer height, to the body tag.

{% highlight css %}
body {
  margin-bottom: 28px; // equal to the footer height
}
{% endhighlight %}

# Dynamic footer

While creating responsive sites, sometimes we face the problem that the footer height changes for different devices. In this case we should use media queries to apply different "margin-bottom" for various devices

{% highlight css %}
@media (max-width: 767px) {
  body {
    margin-bottom: 50px;
  }
}

@media (min-width: 768px) {
  body {
    margin-bottom: 28px;
  }
}
{% endhighlight %}

or write some JavaScript code that will automatically update "margin-bottom" on the body tag. Please note that I'm using jQuery in my example

{% highlight javascript %}
function setBodyMarginBottom() {
  // get the footer height including padding and border
  var footerHeight = $('.footer-container').outerHeight();

  $('body').css('margin-bottom', footerHeight + 'px');
}

$(function () {
  // set margin-bottom on document load
  setBodyMarginBottom();

  // every time the window is resized
  // recalculate the footer height
  $(window).resize(setBodyMarginBottom);
});
{% endhighlight %}

The example and full code

<iframe width="100%" height="300" src="//jsfiddle.net/yuyokk/qch24j7z/4/embedded/result,html,css,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

If you have any thoughts, just let me know.

Thank you for your time!
