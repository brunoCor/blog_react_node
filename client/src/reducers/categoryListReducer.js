import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_BLOGPOST_LIST_RECEIVED,
  CATEGORY_LIST_RECEIVED,
  } from "../actions/types";


  export default(state = {
      categories: null,
      postsLoaded: false,
      isFetchingCategoryList: false,
    }, action) => {
      switch (action.type) {
        case CATEGORY_LIST_REQUEST:
          state = {
            ...state,
            postsLoaded: false,
            isFetchingCategoryList: true,
          };
          return state;
        case CATEGORY_BLOGPOST_LIST_RECEIVED: 
          state = {
            ...state,
            categories: action.data,
            postsLoaded: true,
            isFetchingCategoryList: false,
          };
          return state
        case CATEGORY_LIST_RECEIVED:
          state = {
            ...state,
            categories: action.data,
            postsLoaded: false,
            isFetchingCategoryList: false
          };
          return state;
        default:
          return state;
      }
    }