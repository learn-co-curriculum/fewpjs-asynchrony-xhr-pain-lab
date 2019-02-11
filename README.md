# XHR Complications

## Learning Goals

- Implement multiple XHR requests
- Use data received from requests to populate DOM Content
- Access an API using multiple endpoints

## Introduction

For a long part of internet history, `XMLHttpRequest` was the main way for
websites using JavaScript to access remote data. It was a great tool, but was
not without some pain. Namely, because of the event- and callback-based
structure of a `XMLHttpRequest`, attempting to write code that uses 
multiple requests for data tended to become very complicated.

For example, what if the data of one request were used as input in _another_ request?
Or what if you needed two _different_ requests to finish successfully before
you use their data to update the DOM? How would you wait until both were "back?"
And what if one of the requests were successful and the other were not, would
you add `undefined`s all over? Whew. What a mess.

In this lab, we're going to practice thinking in `XMLHttpRequest`s by creating
a few and using them in collaboration. We're going to work in a world where
we'll filter out some of the errors that make working with XHR a challenge. Nevertheless,
with an appreciation of these problems, you'll be ready to think critically and evaluate
the merits of `fetch()` and other asynchronous code implementations.

## Puppy Writing Forum

We've been tasked with redesigning a forum for dogs who are practicing their
writing skills. We've already got the data, but need to write a front-end that,
when the page loads, retrieves and displays a series of posts, complete with
comments and user information.

The difficulty here is that the data we need is divided over multiple endpoints.
We can get a list of forum posts, including some info on the user who created
the post. We can also get comments, containing comment and user content. Post
data includes associate comments, and data for each comment includes the
corresponding post id.

Starting with getting all of the posts, your task render all posts, their user
names and images, any comments, and the name and image of the user who
commented.

To see an example of a finished product, open up `example.html`.

## JSON Server

This lab comes with a handy tool for practicing asynchronous data requests:
[json-server][]. JSON Server allows us to create a fake RESTful API without
having to do heavy lifting like building a database.

After running `npm install` or `learn` for the first time, start up JSON Server
with `json-server --watch db.json` in your console. Once the server is running,
you'll see a list of available resource paths:

```bash
Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
```

These endpoints each provide a different set of data. Visit the addresses in
your browser to confirm they are working. Since it is mimicking a RESTful API,
sending a request to 'http://localhost:3000/posts' will return all forum posts,
while 'http://localhost:3000/posts/1' will return the forum post with the id of 1.

The tests do not need JSON Server to be running, but if you would like to run
tests while also running the server, open a second tab in your terminal.

## Instructions

The main goal of this lab is to handle retrieving and displaying a complex set
of data. The tests are not focused on which particular DOM elements you choose
to build out the page's content. If you'd like your solution to be styled,
follow the DOM element structure seen in `example.html`.

To help you get started, some starter code is provided for you. You'll need to
display all the posts available from the JSON server, so start by writing an
`XMLHttpRequest` to 'http://localhost:3000/posts' to get the first test to pass.

Once you've got your posts, you'll need to get their corresponding comments. How
you choose to structure your code is up to you as long as all the appropriate
content makes it to the page.

## Conclusion

There are a number of ways to write the solution, but each have their
complications.

Sometimes we will be tasked with building websites that pull from multiple
sources and will need to aggregate them together. In this case, we don't
actually know what comments we need until we've got posts, requiring at least
two `XMLHttpRequest`s.

Sometimes you might want to work with two **different** APIs fo example one to
retrieve planned shows for your favorite band and then another to retrieve
weather predictions for each of those dates.

While `XMLHttpRequest` was the _first_ tool that JavaScript developers got for
retrieving data asynchronously, it wasn't the _last_. In order to address these
complications, the `then()`-based API of `fetch()` was created.

In the next lab we're going to get a clearer picture into how the newer Fetch
API cleans up our code and makes it easier to read and write.

[json-server]: https://github.com/typicode/json-server
