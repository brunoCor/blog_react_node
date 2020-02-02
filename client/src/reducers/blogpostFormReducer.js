import {
  BLOG_POST_FORM_UNLOAD, 
  BLOG_POST_FORM_LOAD,
  IMAGE_DELETE_REQUEST, 
  IMAGE_DELETED,
//   IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOADED
} from "../actions/types";

export default (state = {
  imageReqInProgress: false,
  image: null
}, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
    case IMAGE_DELETE_REQUEST:
      return {
        ...state,
        imageReqInProgress: true
      };
    case IMAGE_UPLOADED:
    case BLOG_POST_FORM_LOAD:
      return {
        ...state,
        imageReqInProgress: false,
        image : action.image // only one image by blogpost
        // images: state.images.concat(action.image)
      };
  //   case IMAGE_UPLOAD_ERROR:
  //     return {
  //       ...state,
  //       imageReqInProgress: false
  //     };
    case BLOG_POST_FORM_UNLOAD:
      return {
        ...state,
        imageReqInProgress: false,
        image: null
      };
    case IMAGE_DELETED:
      return {
        ...state,
        image: null,
        imageReqInProgress: false
      };
    default:
      return state;
  }
}
