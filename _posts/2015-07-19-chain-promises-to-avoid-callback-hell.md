---
layout: post
title:  Chain Promises to avoid Callback Hell
date:   2015-07-24 00:07:10
excerpt: Promises
categories:
---

## Callback Hell

The other day I was working with three asynchronous functions _e.g. asyncF1, asyncF2, asyncF3_ where each one returns a Promise to the next one. I had a basic understanding of Promises so I started coding and got some code like this

{% highlight js %}
asyncF1()
  .then(function(responseF1) {
    // call asyncF2 with the result from asyncF1
    return asyncF2(responseF1)
      .then(function(responseF2) {
        // and asyncF3 accordingly
        return asyncF3(responseF2)
          .then(function(responseF3) {
            // finally we get to the end of nesting
            console.log(responseF3);
          })
          .catch(function(failedReasonF3) {
            // handle an error from asyncF3
            console.error(failedReasonF3);
          });
      })
      .catch(function(failedReasonF2) {
      // handle an error from asyncF2
        console.error(failedReasonF2);
      });
  })
  .catch(function(failedReasonF1) {
    // handle an error from asyncF1
    console.error(failedReasonF1);
  });
{% endhighlight %}

This code shows what they call a <a href="http://stackoverflow.com/a/25098230/1022726" target="_blank">"Callback Hell"</a>.
Fortunately Promises have techniques allow you to avoid long or, I would say, nesting at all.

## Chaining Promises

I think the main Promise magic happens when a result of the

    asyncF.then()

becomes a new Promise. This means you can call a chain of <code>.then()</code> methods and pass parameters between them.

<ul class="list-styled">
  <li>
    If you return a simple value, the next Promise is resolved with that value

{% highlight js %}
asyncF1()
  .then(function() {
    return 'Hello from asyncF1';
  })
  .then(function(response) {
    console.log(response); // 'Hello from asyncF1'
  });
{% endhighlight %}
  </li>

  <li>
    If you return a Promise, the next <code>.then()</code> waits for it to be resolved/rejected and is called with the corresponding result

{% highlight js %}
asyncF1()
  .then(asyncF2)
  .then(function(responseF2) {
    // we get the result from asyncF2
  });
{% endhighlight %}
  </li>
</ul>

## Handling Errors

There can be one or more <code>.then()</code> method calls that do not have an error handler, then the error is passed to the closest <code>.catch()</code>

{% highlight js %}
asyncF1()
  .then(asyncF2)
  .then(asyncF3);
  .catch(function(error) {
    // shared error handler for above Promises
  });
{% endhighlight %}

If there is a <code>.catch()</code> inside a chain of <code>.then()</code> calls, the returned value from <code>.catch()</code> is passed to the next <code>.then()</code> not <code>.catch()</code>. So this can be used to set a fallback or a default value

{% highlight js %}
asyncF()
  .catch(function() {
    return 'DEFAULT_VALUE'
  })
  .then(function(response) {
    console.log(response); // 'DEFAULT_VALUE'
  });
{% endhighlight %}

That is the basic info you should know while working with Promises chaining. I hope this helps you.

## Suggested Reading
+ <a href="http://www.html5rocks.com/en/tutorials/es6/promises/" target="_blank">JavaScript Promises. There and back again</a>
+ <a href="https://leanpub.com/exploring-es6/read#ch_promises" target="_blank">Exploring ES6. Promises for asynchronous programming</a>
