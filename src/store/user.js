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
      state.users.push(action.payload)
    },
    editUser: (state, action) => {
      state.user = action.payload
    },
    updateUser: (state, action) => {
      state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user)
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload)
    },
    getUsers: (state, action) => {
      state.users = action.payload
    },
    getUser: (state, action) => {
      state.user = action.payload.user
    },
  },
})

export const { createUser, editUser, updateUser, deleteUser, getUsers, getUser } = userSlice.actions
export default userSlice.reducer