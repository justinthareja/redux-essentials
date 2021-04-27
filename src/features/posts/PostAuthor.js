import * as React from 'react'
import { useSelector } from 'react-redux'

export function PostAuthor({ authorId }) {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === authorId)
  )
  return <small>{author ? author.name : 'Unknown Author'}</small>
}
