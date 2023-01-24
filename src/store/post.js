import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  post: null
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.push(action.payload)
    },
    editPost: (state, action) => {
      state.post = action.payload
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload)
    },
    getPosts: (state, action) => {
      state.posts = action.payload
    },
    getPost: (state, action) => {
      state.post = action.payload.post
    },
  },
})

export const { createPost, editPost, updatePost, deletePost, getPosts, getPost } = postSlice.actions
export default postSlice.reducer