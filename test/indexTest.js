const sinon = require( 'sinon' );
describe( 'index.js', () => {
  describe( 'getPosts()', () => {
    let results;
    before( () => {
      xhr = sinon.useFakeXMLHttpRequest();
      window.XMLHttpRequest = xhr;

      xhr.onCreate = function ( req ) {
        requests.push( req );
      };
    } );
    beforeEach( () => {
      window.document.body.innerHTML = "<main></main>"
      requests = [];
    } );
    after( () => {
      requests = [];
      xhr.restore();
    } );
    it( "sends an XHR GET request to 'http://localhost:3000/posts'",
      () => {
        getPosts();
        expect( requests.length )
          .to.eql( 1 );
        expect( requests[ 0 ][ 'url' ] )
          .to.eql( 'http://localhost:3000/posts' );
        expect( requests[ 0 ][ 'method' ] )
          .to.eql( 'GET' );
        requests[ 0 ].respond( 200, {
          "Content-Type": "application/json"
        }, JSON.stringify(
          [ {
            "id": 1,
            "title": "Finding My Way Home",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "user": {
              "id": 103,
              "name": "luca",
              "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog4.jpeg"
            },
            "comments": [ 11, 10 ],
            "created": 1549034662570
          } ] ) )
        expect( requests[ 0 ].status )
          .to.eql( 200 );
        expect( requests[ 0 ].statusText )
          .to.eql( 'OK' );
      } )
  } )
  describe( 'Posts', () => {
    let results;
    before( () => {
      xhr = sinon.useFakeXMLHttpRequest();

      window.XMLHttpRequest = xhr;
      xhr.onCreate = function ( req ) {
        requests.push( req );
      };
    } );
    beforeEach( () => {
      window.document.body.innerHTML = "<main></main>"
      requests = [];
    } );
    after( () => {
      requests = [];
      xhr.restore();
    } );
    describe( "once DOM content has loaded and XHR data is received", () => {
      it( "each post's body content is added to the DOM",
        () => {
          let event = document.createEvent( 'Event' );
          event.initEvent( 'DOMContentLoaded', true, true );
          window.document.dispatchEvent( event );
          requests[ 0 ].respond( 200, {
            "Content-Type": "application/json"
          }, JSON.stringify( [ ...testData[ 'posts' ] ] ) )
          for ( let i = 0; i < testData[ 'posts' ].length; i++ ) {
            expect( document.body.innerHTML )
              .to.include( testData[ 'posts' ][ i ]
                [ 'body' ] )
          }
        } )
      it( "each post's username is added to the DOM",
        () => {
          let event = document.createEvent( 'Event' );
          event.initEvent( 'DOMContentLoaded', true, true );
          window.document.dispatchEvent( event );
          requests[ 0 ].respond( 200, {
            "Content-Type": "application/json"
          }, JSON.stringify( [ ...testData[ 'posts' ] ] ) )
          for ( let i = 0; i < testData[ 'posts' ].length; i++ ) {
            expect( document.body.innerHTML )
              .to.include( testData[ 'posts' ][ i ]
                [ 'user' ][ 'name' ] )
          }
        } )
      it( "each post's user image is displayed",
        () => {
          let event = document.createEvent( 'Event' );
          event.initEvent( 'DOMContentLoaded', true, true );
          window.document.dispatchEvent( event );
          requests[ 0 ].respond( 200, {
            "Content-Type": "application/json"
          }, JSON.stringify( [ ...testData[ 'posts' ] ] ) )
          let imageSources = Array.from( document.getElementsByTagName( 'img' ) )
            .map( img => img.src )
          for ( let i = 0; i < testData[ 'posts' ].length; i++ ) {
            expect( imageSources )
              .to.include( testData[ 'posts' ][ i ]
                [ 'user' ][ 'image' ] )
          }
        } )
    } )
  } )
  describe( 'Comments', () => {
    let results;
    before( () => {
      xhr = sinon.useFakeXMLHttpRequest();
      window.XMLHttpRequest = xhr;

      xhr.onCreate = function ( req ) {
        requests.push( req );
      };
    } );
    beforeEach( () => {
      window.document.body.innerHTML = "<main></main>"
      requests = [];
    } );
    after( () => {
      requests = [];
      xhr.restore();
    } );
    describe( "once DOM content has loaded and XHR data is received", () => {
      it( "each comments's body content is added to the DOM",
        () => {
          let event = document.createEvent( 'Event' );
          event.initEvent( 'DOMContentLoaded', true, true );
          window.document.dispatchEvent( event );
          requests[ 0 ].respond( 200, {
            "Content-Type": "application/json"
          }, JSON.stringify( [ ...testData[ 'posts' ] ] ) )
          if ( requests[ 1 ].url === "http://localhost:3000/comments" ) {
            requests[ 1 ].respond( 200, {
              "Content-Type": "application/json"
            }, JSON.stringify( [ ...testData[ 'comments' ] ] ) )
          } else {
            for ( let n = 1; n < requests.length; n++ ) {
              let commentId = parseInt( requests[ n ].url.slice( 31, requests[ n ].url.length ) )
              requests[ n ].respond( 200, {
                "Content-Type": "application/json"
              }, JSON.stringify( testData[ 'comments' ].find( comment => comment[ 'id' ] == commentId ) ) )
            }
          }
          for ( let i = 0; i < testData[ 'comments' ].length; i++ ) {
            expect( document.body.innerHTML )
              .to.include( testData[ 'comments' ][ i ]
                [ 'body' ] )
          }
        } )
      it( "each comment's username is added to the DOM",
        () => {
          let event = document.createEvent( 'Event' );
          event.initEvent( 'DOMContentLoaded', true, true );
          window.document.dispatchEvent( event );
          requests[ 0 ].respond( 200, {
            "Content-Type": "application/json"
          }, JSON.stringify( [ ...testData[ 'posts' ] ] ) )
          if ( requests[ 1 ].url === "http://localhost:3000/comments" ) {
            requests[ 1 ].respond( 200, {
              "Content-Type": "application/json"
            }, JSON.stringify( [ ...testData[ 'comments' ] ] ) )
          } else {
            for ( let n = 1; n < requests.length; n++ ) {
              let commentId = parseInt( requests[ n ].url.slice( 31, requests[ n ].url.length ) )
              requests[ n ].respond( 200, {
                "Content-Type": "application/json"
              }, JSON.stringify( testData[ 'comments' ].find( comment => comment[ 'id' ] == commentId ) ) )
            }
          }
          for ( let i = 0; i < testData[ 'comments' ].length; i++ ) {
            expect( document.body.innerHTML )
              .to.include( testData[ 'comments' ][ i ]
                [ 'user' ][ 'name' ] )
          }
        } )
      it( "each comment's user image is added to the DOM",
        () => {
          console.log( document.body.innerHTML );
          let event = document.createEvent( 'Event' );
          event.initEvent( 'DOMContentLoaded', true, true );
          window.document.dispatchEvent( event );
          requests[ 0 ].respond( 200, {
            "Content-Type": "application/json"
          }, JSON.stringify( [ ...testData[ 'posts' ] ] ) )
          if ( requests[ 1 ].url === "http://localhost:3000/comments" ) {
            requests[ 1 ].respond( 200, {
              "Content-Type": "application/json"
            }, JSON.stringify( [ ...testData[ 'comments' ] ] ) )
          } else {
            for ( let n = 1; n < requests.length; n++ ) {
              let commentId = parseInt( requests[ n ].url.slice( 31, requests[ n ].url.length ) )
              requests[ n ].respond( 200, {
                "Content-Type": "application/json"
              }, JSON.stringify( testData[ 'comments' ].find( comment => comment[ 'id' ] == commentId ) ) )
            }
          }

          let imageSources = Array.from( document.getElementsByTagName( 'img' ) )
            .map( img => img.src )

          for ( let i = 0; i < testData[ 'comments' ].length; i++ ) {
            expect( imageSources )
              .to.include( testData[ 'comments' ][ i ]
                [ 'user' ][ 'image' ] )
          }
        } )
    } )
  } )
} )
var testData = {
  "posts": [ {
    "id": 1,
    "title": "Finding My Way Home",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "user": {
      "id": 103,
      "name": "luca",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog4.jpeg"
    },
    "comments": [ 11, 10 ],
    "created": 1549034662570
  }, {
    "id": 2,
    "title": "Driving to the Store",
    "body": "Risus viverra adipiscing at in tellus integer. Egestas integer eget aliquet nibh. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Nibh cras pulvinar mattis nunc sed. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit. Feugiat nisl pretium fusce id velit ut tortor pretium. Posuere ac ut consequat semper viverra nam libero justo. Nisi est sit amet facilisis magna etiam tempor orci. Turpis massa tincidunt dui ut. Justo eget magna fermentum iaculis.",
    "user": {
      "id": 101,
      "name": "peach",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog2.jpeg"
    },
    "comments": [ 12 ],
    "created": 1549034662571
  }, {
    "id": 3,
    "title": "I Saw a Family of Bears",
    "body": "Sapien et ligula ullamcorper malesuada proin. Diam quis enim lobortis scelerisque fermentum. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Sit amet commodo nulla facilisi nullam vehicula ipsum a. Sapien eget mi proin sed. Proin sed libero enim sed faucibus turpis in eu. Risus quis varius quam quisque id diam vel quam elementum. Duis at tellus at urna condimentum mattis pellentesque id. Quisque id diam vel quam. Rutrum quisque non tellus orci ac. Dui accumsan sit amet nulla facilisi morbi.",
    "user": {
      "id": 102,
      "name": "emma",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog3.jpeg"
    },
    "comments": [ 13 ],
    "created": 1549034662572
  }, {
    "id": 4,
    "title": "Luca Americana",
    "body": "Ante in nibh mauris cursus mattis molestie. Malesuada bibendum arcu vitae elementum curabitur. Mollis aliquam ut porttitor leo a diam. Non sodales neque sodales ut. Bibendum ut tristique et egestas quis. Amet aliquam id diam maecenas. Nunc sed velit dignissim sodales ut. Egestas diam in arcu cursus euismod quis viverra.",
    "user": {
      "id": 103,
      "name": "luca",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog4.jpeg"
    },
    "comments": [ 14, 15, 16 ],
    "created": 1549034662573
  } ],
  "comments": [ {
    "id": 10,
    "body": "great post!",
    "user": {
      "id": 100,
      "name": "harpo",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog1.jpeg"
    },
    "postId": 1,
    "created": 1549035662574
  }, {
    "id": 11,
    "body": "wonderful",
    "user": {
      "id": 101,
      "name": "peach",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog2.jpeg"
    },
    "postId": 1,
    "created": 1549035662575
  }, {
    "id": 12,
    "body": "I totally agree",
    "user": {
      "id": 103,
      "name": "luca",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog4.jpeg"
    },
    "postId": 2,
    "created": 1549035662576
  }, {
    "id": 13,
    "body": "superb",
    "user": {
      "id": 100,
      "name": "harpo",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog1.jpeg"
    },
    "postId": 3,
    "created": 1549035662577
  }, {
    "id": 14,
    "body": "good work so far",
    "user": {
      "id": 102,
      "name": "emma",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog3.jpeg"
    },
    "postId": 4,
    "created": 1549035662578
  }, {
    "id": 15,
    "body": "definitely",
    "user": {
      "id": 100,
      "name": "harpo",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog1.jpeg"
    },
    "postId": 4,
    "created": 1549035662579
  }, {
    "id": 16,
    "body": "well done",
    "user": {
      "id": 101,
      "name": "peach",
      "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog2.jpeg"
    },
    "postId": 4,
    "created": 1549035662580
  } ],
  "users": [ {
    "id": 100,
    "name": "harpo",
    "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog1.jpeg"
  }, {
    "id": 101,
    "name": "peach",
    "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog2.jpeg"
  }, {
    "id": 102,
    "name": "emma",
    "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog3.jpeg"
  }, {
    "id": 103,
    "name": "luca",
    "image": "https://curriculum-content.s3.amazonaws.com/fewpjs/fewpjs-asynchrony/dog4.jpeg"
  } ]
}
