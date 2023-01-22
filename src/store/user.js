import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = action.payload.user
    },
    updateUser: (state, action) => {
      state.user = action.payload.user
    },
    deleteUser: (state, action) => {
      state.user = action.payload.user
    },
    getUsers: (state, action) => {
      state.user = action.payload.user
    },
    getUser: (state, action) => {
      state.user = action.payload.user
    },
  },
})

export const { createUser, updateUser, deleteUser, getUsers, getUser } = userSlice.actions
export default userSlice.reducer