import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  status: 'idle',
  error: null,
  users: [],
}

export const selectAllUsers = (state) => state.users.users
export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId)

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.users
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'success'
      state.users = state.users.concat(action.payload)
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.error.message
    },
  },
})

export default userSlice.reducer
