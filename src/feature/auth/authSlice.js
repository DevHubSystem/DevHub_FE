import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { authService, getToken, setToken, clearToken } from '@/service'

/**
 * Authenticate with email + password. On success the JWT is persisted to
 * localStorage and the returned `{ token, user }` becomes the fulfilled payload.
 */
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authService.login(credentials)
    setToken(data.token)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message ?? 'Login failed. Please try again.')
  }
})

const initialState = {
  user: null,
  token: getToken(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      clearToken()
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
