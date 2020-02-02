import { CATEGORY_REQUEST, CATEGORY_RECEIVED, CATEGORY_SET_PAGE } from "../actions/types"; //, BLOG_POST_ERROR, BLOG_POST_UNLOAD

export default( state = {
    category: null,
    blogposts: null,
    isFetchingCategory: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch(action.type) {
        case CATEGORY_REQUEST:
            state = {
                ...state,
                isFetchingCategory: true
            }
            return state;
        case CATEGORY_RECEIVED:
            return {
                ...state,
                blogposts: action.data.blogposts,
                category: action.data.category,
                pageCount: action.data.pages,
                isFetchingCategory: false
            }
        case CATEGORY_SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        default:
            return state;    
    }
}