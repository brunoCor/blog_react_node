import {
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_LIST_RECEIVED
    } from "../actions/types";


    export default(state = {
        posts: null,
        isFetchingBlogPostList: false,
      }, action) => {
        switch (action.type) {
          case BLOG_POST_LIST_REQUEST:
            state = {
              ...state,
              isFetchingBlogPostList: true,
            };
            return state;
          case BLOG_POST_LIST_RECEIVED:
            state = {
              ...state,
              posts: action.data,
              isFetchingBlogPostList: false
            };
            return state;
        //   case BLOG_POST_LIST_ERROR:
        //     return {
        //       ...state,
        //       isFetching: false,
        //       posts: null
        //     };
        //   case BLOG_POST_LIST_ADD:
        //     state = {
        //       ...state,
        //       posts: state.posts ? state.posts.concat(action.data) : state.posts
        //     };
        //     return state;
        //   case BLOG_POST_LIST_SET_PAGE:
        //     return {
        //       ...state,
        //       currentPage: action.page
        //     };
          default:
            return state;
        }
      }