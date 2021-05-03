import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  status: 'idle',
  items: [],
}

export const selectAllNotifications = (state) => state.notifications.items
export const selectNotificationsStatus = (state) => state.notifications.status

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  // "payload callback has two params, the first is the argument passed into"
  // the actionCreator:

  // fetchNotifications(_)

  // second parameter is a thunkAPI object with getState and other useful methods
  // for cancelling and modularizing query logic
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const timeSinceLastNotification = latestNotification
      ? latestNotification.date
      : ''

    const response = await client.get(
      `/fakeApi/notifications?since=${timeSinceLastNotification}`
    )

    return response.notifications
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotifications.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = 'success'
      state.items.push(...action.payload)
      // Sort with newest first
      state.items.sort((a, b) => b.date.localeCompare(a.date))
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.status = 'error'
    },
  },
})

export default notificationsSlice.reducer
