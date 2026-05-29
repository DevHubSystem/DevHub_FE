import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'

/** Root RTK store. Register additional domain reducers here as slices land. */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
