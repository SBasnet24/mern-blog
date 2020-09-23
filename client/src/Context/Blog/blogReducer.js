/* eslint-disable no-unused-vars */
import react from "react";
import {
  GET_ALL_POSTS,
  SET_LOADING,
  GET_POST,
  GET_CATEGORIES,
  LOGIN,
  SET_ERROR,
  CLEAR_ERRORS,
  REGISTER,
  DELETE_COMMENT,
  ADD_COMMENT,
  HANDLE_CATEGORY,
  SET_PAGE,
  HANDLE_SEARCH,
  DELETE_POST,
  LOGOUT,
} from "./../type";

export default (state, action) => {
  if (action.type === GET_ALL_POSTS) {
    return {
      ...state,
      posts: action.payload,
      loading: false,
    };
  }
  if (action.type === GET_POST) {
    return {
      ...state,
      post: action.payload,
      comments: action.payload.comments,
      loading: false,
    };
  }
  if (action.type === DELETE_POST) {
    return {
      ...state,
      loading: false,
      posts: action.payload,
    };
  }
  if (action.type === ADD_COMMENT) {
    return {
      ...state,
      comments: action.payload,
      loading: false,
    };
  }
  if (action.type === DELETE_COMMENT) {
    return {
      ...state,
      comments: action.payload,
      loading: false,
    };
  }
  if (action.type === GET_CATEGORIES) {
    return {
      ...state,
      category: [{ name: "All Categories" }, ...action.payload],
      loading: false,
    };
  }
  if (action.type === HANDLE_CATEGORY) {
    return {
      ...state,
      selectedCategory: action.payload,
      searchQuery: "",
      currentPage: 1,
    };
  }
  if (action.type === HANDLE_SEARCH) {
    return {
      ...state,
      searchQuery: action.payload,
      selectedCategory: {},
      currentPage: 1,
    };
  }

  if (action.type === LOGIN) {
    return {
      ...state,
      loading: false,
      currentUser: action.payload,
    };
  }
  // if (action.type === LOGIN) {
  //   return {
  //     ...state,
  //     currentUser: {},
  //   };
  // }
  if (action.type === SET_PAGE) {
    return {
      ...state,
      currentPage: action.payload,
    };
  }
  if (action.type === SET_ERROR) {
    return {
      ...state,
      errors: action.payload,
      loading: false,
    };
  }
  if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === CLEAR_ERRORS) {
    return {
      ...state,
      errors: {},
    };
  }
};
