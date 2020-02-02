import axios from "axios";
import {
  POST_DELETED,
  IMAGE_DELETED,
  IMAGE_DELETE_REQUEST,
  BLOG_POST_FORM_UNLOAD,
  CATEGORY_BLOGPOST_LIST_RECEIVED,
  POST_LIST_RECEIVED,
  POST_LIST_REQUEST,
  POST_LIST_SET_PAGE,
  FETCH_USER,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOADED,
  BLOG_POST_LIST_REQUEST,
  BLOG_POST_LIST_RECEIVED,
  BLOG_POST_REQUEST,
  BLOG_POST_RECEIVED,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_RECEIVED,
  CATEGORY_REQUEST,
  CATEGORY_RECEIVED,
  CATEGORY_SET_PAGE,
  BLOG_POST_FORM_LOAD
} from "./types";
import { SubmissionError } from "redux-form";

export const postAdd = values => async () => {
  await axios.post("/api/posts", values);
  // dispatch({ type: FETCH_USER, payload: res.data });
};

export const postDelete = id => async dispatch => {
  await axios.delete(`/api/posts/${id}`);
  dispatch({ type: POST_DELETED, id: id });
};

export const postListFetch = (page = 1, search = '') => async dispatch => {
  dispatch({type: POST_LIST_REQUEST});
  const res = await axios.get(`/api/posts?_page=${page}&_size=5&_search=${search}`);
  dispatch({ type: POST_LIST_RECEIVED, data: res.data });
};

export const postListSetPage = (page) => ({
  type: POST_LIST_SET_PAGE,
  page
});

export const userLoginAttempt = (values, history) => async dispatch => {
  try {
    const res = await axios.post("/api/login", values);
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push("/");
  } catch (error) {
    throw new SubmissionError({
      _error: "Username or password is invalid"
    });
  }
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const blogpostAdd = (values, image) => async dispatch => {
  const blogpost = {
    ...values,
    _image: image ? image._id : null
  };
  await axios.post("/api/blogposts", blogpost);
  dispatch({ type: BLOG_POST_FORM_UNLOAD });
};

export const blogpostUpdate = (values, image, id) => async dispatch => {
  const blogpost = {
    ...values,
    _image: image ? image._id : null
  };
  await axios.put(`/api/blogposts/${id}`, blogpost);
  dispatch({ type: BLOG_POST_FORM_UNLOAD });
};

export const blogpostDelete = id => async () => {
  await axios.delete(`/api/blogposts/${id}`);
  // dispatch({type: BLOG_POST_DELETED});
};

export const imageUpload = file => async dispatch => {
  dispatch({ type: IMAGE_UPLOAD_REQUEST });
  const formData = new FormData();
  // formData.append('myImage',this.state.file);
  formData.append("myImage", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  const res = await axios.post("/api/upload", formData, config);
  dispatch({ type: IMAGE_UPLOADED, image: res.data });
  // dispatch(imageUploadError);
};

export const imageDelete = id => async dispatch => {
  dispatch({ type: IMAGE_DELETE_REQUEST });
  await axios.delete(`/api/images/${id}`);
  dispatch({ type: IMAGE_DELETED });
};

export const fetchBlogPostList = (limit = null) => async dispatch => {
  dispatch({ type: BLOG_POST_LIST_REQUEST });

  let url = "/api/blogposts" + (limit !== null ? "?limit=" + limit : "");

  const res = await axios.get(url);
  dispatch({ type: BLOG_POST_LIST_RECEIVED, data: res.data });
};

export const categoryListFetch = () => async dispatch => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  const res = await axios.get("/api/categories");
  dispatch({ type: CATEGORY_LIST_RECEIVED, data: res.data });
};

export const categoryBlogpostListFetch = () => async dispatch => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  const res = await axios.get("/api/categories/blogposts");
  dispatch({ type: CATEGORY_BLOGPOST_LIST_RECEIVED, data: res.data });
};

export const blogPostFecth = id => async dispatch => {
  dispatch({ type: BLOG_POST_REQUEST });
  const res = await axios.get(`/api/blogposts/${id}`);
  dispatch({ type: BLOG_POST_RECEIVED, data: res.data });
};

export const blogPostFormFecth = id => async dispatch => {
  dispatch({ type: BLOG_POST_REQUEST });
  const res = await axios.get(`/api/blogposts/${id}`);
  dispatch({ type: BLOG_POST_RECEIVED, data: res.data });
  const img = res.data._image;
  if(img) {
    dispatch({type: BLOG_POST_FORM_LOAD, image: img});
  }
};

export const categoryFetch = (id,page = 1)  => async dispatch => {
  dispatch({ type: CATEGORY_REQUEST });
  //@todo : case no blogposts todo
  const res = await axios.get(`/api/categories/${id}/blogposts?_page=${page}&_size=5`);
  let data = null;
  if (res.data.blogposts.length > 0) {
    data = { category: res.data.blogposts[0]._category, blogposts: res.data.blogposts, pages : res.data.pages };
  }
  dispatch({ type: CATEGORY_RECEIVED, data: data });
};

export const categorySetPage = (page) => ({
  type: CATEGORY_SET_PAGE,
  page
});