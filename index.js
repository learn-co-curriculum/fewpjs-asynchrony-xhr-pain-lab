document.addEventListener( 'DOMContentLoaded', () => {
  getPosts()
} )
const getPosts = () => {
  let xhr = new XMLHttpRequest();
  xhr.open( 'GET', 'http://localhost:3000/posts' );
  xhr.addEventListener( 'load', e => {
    JSON.parse( xhr.response )
      .map( post => {
        createPost( post )
      } )
  } )
  xhr.send();
}
const getComment = commentId => {
  let xhr = new XMLHttpRequest();
  xhr.open( 'GET', `http://localhost:3000/comments/${commentId}` );
  xhr.addEventListener( 'load', e => {
    createComment( JSON.parse( xhr.response ) )
  } )
  xhr.send();
}
const getComments = () => {
  let xhr = new XMLHttpRequest();
  xhr.open( 'GET', `http://localhost:3000/comments` );
  xhr.addEventListener( 'load', e => {} )
  xhr.send();
}
const createPost = post => {
  let section = document.createElement( 'section' )
  document.querySelector( 'main' )
    .appendChild( section )
  section.id = post.id
  section.innerHTML = `<h2>${post.title}</h2><h3><img src=${post.user.image}>${post.user.name}</h3><p>${post.body}</p>`
  post.comments.forEach( comment => {
    getComment( comment )
  } )
}
const createComment = comment => {
  let aside = document.createElement( 'aside' )
  document.getElementById( `${comment.postId}` )
    .appendChild( aside )
  aside.id = comment.id
  aside.innerHTML = `<h3><img src=${comment.user.image}>${comment.user.name}</h3><p>${comment.body}</p>`
}
