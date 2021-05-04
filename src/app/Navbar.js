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
  const notifications = useSelector((state) => state.notifications.items)
  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  )

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications{' '}
              {unreadNotifications.length > 0 && (
                <span className="badge">{unreadNotifications.length}</span>
              )}
            </Link>
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
