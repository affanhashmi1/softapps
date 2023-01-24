import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth'
import userReducer from './user'
import postReducer from './post'

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    postReducer,
  },
})