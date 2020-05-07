import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  authenticationToken: string | null
}

const initialState: AuthState = {
  authenticationToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userAuthenticated(state, action: PayloadAction<string>) {
      state.authenticationToken = action.payload
    },
  },
})

export const { userAuthenticated } = authSlice.actions

export default authSlice.reducer
