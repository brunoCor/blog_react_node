import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import postListReducer from './postListReducer';
import authReducer from './authReducer';
import blogpostReducer from './blogpostReducer';
import blogpostFormReducer from './blogpostFormReducer';
import blogpostListReducer from './blogpostListReducer';
import categoryListReducer from './categoryListReducer';
import categoryReducer from './categoryReducer';


export default combineReducers({
  postList: postListReducer,
  form: reduxForm,
  auth: authReducer,
  blogpost: blogpostReducer,
  blogpostForm: blogpostFormReducer,
  blogpostList: blogpostListReducer,
  categoryList: categoryListReducer,
  category: categoryReducer
});