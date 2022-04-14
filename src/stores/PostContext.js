import React, { createContext, useReducer } from 'react'

export const PostContext = createContext()

export const PostReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COLLECTION':
      return { ...state, posts: action.payload }
    case 'GET_POST':
      return { ...state, posts: state.posts.filter((post) => post.id === action.payload.id) }
    case 'CREATE_POST':
      return { ...state, posts: [...state.posts, action.payload] }
    case 'REMOVE_POST':
      return { ...state, posts: state.posts.filter((post) => post.id !== action.payload) }
    case 'UPDATE_POST':
      return { ...state, posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post)) }
    default:
      return state
  }
}

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, {
    posts: [],
  })

  console.log('PostContext state:', state)

  return <PostContext.Provider value={{ ...state, dispatch }}>{children}</PostContext.Provider>
}
