import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Paul Pierce' },
  { id: '1', name: 'Lebron James' },
  { id: '2', name: 'Rick Sanchez' },
]

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default userSlice.reducer
