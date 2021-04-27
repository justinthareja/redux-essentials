import * as React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export function TimeAgo({ timestamp }) {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const distanceToNow = formatDistanceToNow(date)
    timeAgo = `${distanceToNow} ago`
  }

  return (
    <small title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </small>
  )
}
