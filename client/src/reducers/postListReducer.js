import { POST_LIST_REQUEST, POST_LIST_RECEIVED, POST_DELETED, POST_LIST_SET_PAGE } from '../actions/types';

export default function(state = {
  posts: null,
  currentPage: 1,
  pageCount: null,
  isFetching: false
}, action) {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case POST_DELETED:
      state = {
        ...state,
        posts: state.posts.filter(post => post._id !== action.id)
      }
      return state;
    case POST_LIST_RECEIVED:
      return {
        ...state, // return the current state
        posts: action.data.posts,
        pageCount: action.data.pages,
        isFetching: false
    };
    case POST_LIST_SET_PAGE:
    return {
        ...state,
        currentPage: action.page
    };
    default:
    return state;
  }
}



// export default( state = {
//   posts: null,
//   isFetching: false,
//   currentPage: 1,
//   pageCount: null
// }, action) => {
//   switch(action.type) {
//       case BLOG_POST_LIST_REQUEST:
//           state = {
//               ...state, // return the current state
//               isFetching: true
//           }
//           return state;
//       case BLOG_POST_LIST_RECEIVED:
//           return {
//               ...state, // return the current state
//               posts: action.data['hydra:member'],
//               pageCount: hydraPageCount(action.data), 
//               isFetching: false
//           }
//       case BLOG_POST_LIST_ERROR:
//           return {
//               ...state, // return the current state
//               isFetching: false,
//               posts: null
//           }

//       case BLOG_POST_LIST_ADD:
//           return {
//               ...state,
//               posts: state.posts ? state.posts.concat(action.data) : state.posts
//           }
//       case BLOG_POST_LIST_SET_PAGE:
//           return {
//               ...state,
//               currentPage: action.page
//           }
//       default:
//           return state;    
//   }
// }