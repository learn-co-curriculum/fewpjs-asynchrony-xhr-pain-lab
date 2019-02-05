# XHR Complications

## Learning Goals

- Implement multiple XHR requests
- Use data received from requests to populate DOM Content
- Access an API using multiple endpoints

## Introduction

For a long part of internet history, XMLHttpRequest was the main way for
websites using JavaScript to access remote data. It was a great tool, but was
not without some pain. Namely, because of the structure of a XMLHttpRequest,
attempting to send multiple requests for data can become very complicated.

Depending on the structure of the data you're retrieving, you may end up nesting
multiple XMLHttpRequests within each other.

In this lab, we're going to practice thinking in XMLHttpRequests by creating
a few and using them in collaboration.

## Puppy Writing Forum

We've been tasked with redesigning a forum for dogs who are practicing their
writing skills. We've already got the data, but need to write a front-end that,
when the page loads, retrieves and displays a series of posts, complete with
comments and user information.

The difficulty here is that the data we need is divided over multiple endpoints.
We can get a list of forum posts, including some info on the user who created
the post. We can also get comments, containing comment and user content. Post
data includes associate comments, and data for each comment includes the corresponding post id.

Starting with getting all of the posts, your task render all posts, their user
names and images, any comments and the name and image of the user who commented.

To see an example of a finished product, open up `example.html`.

## JSON Server

This lab comes with a handy tool for practicing asynchronous data requests:
[json-server][]. JSON Server allows us to spin up a fake RESTful API. After
running `npm install` or `learn` for the first time, to start up JSON Server,
run `json-server --watch db.json` in your console. Once the server is running,
you'll see a list of available resource paths:

```bash
Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
```

These endpoints each provide a different set of data. Visit the addresses in your browser to confirm they are working. Since it is mimicking a RESTful API,
sending a request to 'http://localhost:3000/posts' will return all forum posts,
while 'http://localhost:3000/posts/1' will return the forum post with the id of 1.

The tests do not need JSON Server to be running, but if you would like to run
tests while also running the server, open a second tab in your terminal.

## Instructions

The main goal of this lab is to handle retrieving and display a complex set of data. The tests are not focused on which particular DOM elements you choose to
build out the page's content. If you'd like your solution to be styled, mirror the DOM element structure seen in `example.html`.

To help you get started, some starter code is provided for you. You'll need to
display all the posts available from the JSON server, so start by writing an
XMLHttpRequest to 'http://localhost:3000/posts' to get the first test to pass.

Once you've got your posts, you'll need to get their corresponding comments. How
you choose to structure your code is up to you as long as all the appropriate
content makes it to the page.

## Conclusion

There are a number of ways to do this, but each have their complications. Sometimes we will be tasked with building websites that pull from multiple
sources, aggregating them together. In this case, we don't actually know what
comments we need until we've got posts, requiring at least two XMLHttpRequests.

Sometimes we don't have control of the structure of data we are using for a
project, and we have to shape our code and data requests around whatever
structure we're given. This can sometimes result in asynchronous calls that
are dependent on each other. While XMLHttpRequest will work, in the next lab
we're going to get a clearer picture into how the newer Fetch API cleans up our
code and makes it easier to read and write.

## Resources

[json-server]: https://github.com/typicode/json-server
