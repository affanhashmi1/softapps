import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user'
import authReducer from './auth'

export const store = configureStore({
  reducer: {
    userReducer,
    authReducer,
  },
})