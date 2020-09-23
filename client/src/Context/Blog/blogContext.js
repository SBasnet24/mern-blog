import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import BlogReducer from "./blogReducer";
import config from "../../config.json";
import formData from "./../../services/formData";

import {
  GET_ALL_POSTS,
  SET_LOADING,
  GET_POST,
  // ADD_POST,
  GET_CATEGORIES,
  SET_ERROR,
  LOGIN,
  HANDLE_CATEGORY,
  CLEAR_ERRORS,
  SET_PAGE,
  HANDLE_SEARCH,
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  // LOGOUT,
} from "./../type";

// creates the context
export const BlogContext = createContext();

const url = config.apiUrl;
// provider maintains the state
const BlogProvider = ({ children }) => {
  const defaultState = {
    posts: [],
    post: {},
    category: [],
    errors: {},
    currentUser: {},
    loading: false,
    pageSize: 3,
    currentPage: 1,
    searchQuery: null,
    likes: [],
    comments: [],
    selectedCategory: { name: "All Categories" },
  };
  const [state, dispatch] = useReducer(BlogReducer, defaultState);
  // getAllPosts from server
  const getAllPosts = async () => {
    setLoading();
    const response = await axios.get(`${url}/posts`);
    dispatch({
      type: GET_ALL_POSTS,
      payload: response.data.posts,
    });
  };
  // getSingle Post from server using slug
  const getPost = async (slug) => {
    setLoading();
    const response = await axios.get(`${url}/posts/slug/${slug}`);
    dispatch({
      type: GET_POST,
      payload: response.data.post,
    });
  };

  const addPost = async (title, body, description, category, image) => {
    try {
      setLoading();
      const jwt = localStorage.getItem("token");
      const user = getCurrentUser();
      const newFormData = formData(
        title,
        description,
        body,
        image,
        user.id,
        category
      );
      const response = await axios.post(`${url}/posts`, newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      });
      clearErrors();
      return response;
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.response.data || e.response.data.message,
      });
    }
  };
  const removePost = async (post_id) => {
    setLoading();
    const jwt = localStorage.getItem("token");
    console.log(post_id);
    console.log(state.posts);
    const response = await axios.delete(`${url}/posts/${post_id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: DELETE_POST,
      payload: response.data.posts,
    });
    return response;
  };

  const addComment = async (text, id) => {
    try {
      setLoading();
      const jwt = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/posts/comment/${id}`,
        { text: text },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: ADD_COMMENT,
        payload: response.data.post.comments,
      });
      return response;
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.response.data || e.response.data.message,
      });
    }
  };

  const removeComment = async (pid, cid) => {
    try {
      setLoading();
      const jwt = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/posts/${pid}/comment/${cid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: DELETE_COMMENT,
        payload: response.data.post.comments,
      });
      return response;
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.response.data || e.response.data.message,
      });
    }
  };

  // get All Categories from the server
  const getAllCategories = async () => {
    setLoading();
    const response = await axios.get(`${url}/category`);
    dispatch({
      type: GET_CATEGORIES,
      payload: response.data.categories,
    });
  };

  const loginUser = async (email, password) => {
    try {
      setLoading();
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      dispatch({
        type: LOGIN,
        payload: response.data.user,
      });
      clearErrors();
      const jwt = response.data.token;
      const decodedJwt = jwtDecode(jwt);
      if (decodedJwt.id === response.data.user._id) {
        localStorage.setItem("token", jwt);
      } else {
        return "Invalid Token";
      }

      return response;
    } catch (e) {
      dispatch({
        type: SET_ERROR,
        payload: e.response.data || e.response.data.message,
      });
    }
  };

  const getCurrentUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      const decodedJwt = jwtDecode(jwt);
      const currentTime = Math.ceil(new Date().getTime() / 1000);
      if (decodedJwt.exp < currentTime) {
        localStorage.removeItem("token");
        window.location = "/";
      } else {
        console.log(currentTime, decodedJwt.exp);
      }
      return decodedJwt;
    } catch (error) {
      return null;
    }
  };
  const logout = () => {
    try {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        localStorage.removeItem("token");
        window.location = "/login";
      }
    } catch (error) {
      return null;
    }
  };

  const handlePageChange = (page) => {
    dispatch({ type: SET_PAGE, payload: page });
  };
  const handleCategorySelect = (category) => {
    dispatch({ type: HANDLE_CATEGORY, payload: category });
  };

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  // setloading
  const setLoading = () => dispatch({ type: SET_LOADING });
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const value = {
    posts: state.posts,
    post: state.post,
    category: state.category,
    loading: state.loading,
    pageSize: state.pageSize,
    errors: state.errors,
    currentPage: state.currentPage,
    selectedCategory: state.selectedCategory,
    searchQuery: state.searchQuery,
    comments: state.comments,
    getAllPosts,
    getPost,
    getAllCategories,
    loginUser,
    getCurrentUser,
    logout,
    addPost,
    handlePageChange,
    handleCategorySelect,
    handleSearch,
    addComment,
    removeComment,
    removePost,
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogProvider;
