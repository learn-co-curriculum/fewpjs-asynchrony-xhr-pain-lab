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
        post.comments.forEach( commentId => {

          createEmptyComment( commentId, post.id )
        } )
      } )

    getComments()
  } )
  xhr.send();
}

const createPost = post => {
  let section = document.createElement( 'section' )
  document.querySelector( 'main' )
    .appendChild( section )
  section.id = post.id
  section.innerHTML = `<h2>${post.title}</h2><h3><img src=${post.user.image}>${post.user.name}</h3><p>${post.body}</p>`
}

const createEmptyComment = ( commentId, postId ) => {
  let aside = document.createElement( 'aside' )
  aside.id = commentId
  document.getElementById( `${postId}` )
    .appendChild( aside )
}

const getComments = () => {
  let xhr = new XMLHttpRequest();
  xhr.open( 'GET', `http://localhost:3000/comments` );
  xhr.addEventListener( 'load', e => {
    JSON.parse( xhr.response )
      .map( comment => {
        updateCommentContent( comment )
      } )
  } )
  xhr.send();
}

const updateCommentContent = comment => {
  let aside = document.getElementById( `${comment.id}` )
  aside.innerHTML = `<h3><img src=${comment.user.image}>${comment.user.name}</h3><p>${comment.body}</p>`
}
