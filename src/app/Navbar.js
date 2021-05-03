import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchNotifications,
  selectNotificationsStatus,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notificationStatus = useSelector(selectNotificationsStatus)

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications</Link>
          </div>
          <button
            className="button"
            disabled={notificationStatus === 'loading'}
            onClick={() => dispatch(fetchNotifications())}
          >
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
