import * as React from 'react'
import { useSelector } from 'react-redux'

export function PostAuthor({ authorId }) {
  const author = useSelector((state) =>
    state.users.users.find((user) => user.id === authorId)
  )
  return <span>{author ? author.name : 'Unknown Author'}</span>
}
