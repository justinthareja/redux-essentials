import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = notificationsAdapter.getInitialState({
  status: 'idle',
})

export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors((state) => state.notifications)

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
  reducers: {
    allNotificationsRead: (state, payload) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = 'success'

      // keeps unread notifcations as "new"
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read
      })

      notificationsAdapter.upsertMany(state, action.payload)
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.status = 'error'
    },
  },
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer
