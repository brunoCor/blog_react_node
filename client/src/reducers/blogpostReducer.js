import { BLOG_POST_REQUEST, BLOG_POST_RECEIVED } from "../actions/types";

export default( state = {
    post: null,
    isFetchingBlogPost: false
}, action) => {
    switch(action.type) {
        case BLOG_POST_REQUEST:
            state = {
                ...state,
                isFetchingBlogPost: true
            }
            return state;
        case BLOG_POST_RECEIVED:
            return {
                ...state,
                post: action.data,
                isFetchingBlogPost: false
            }
        default:
            return state;    
    }
}