import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

export function PostAuthor({ authorId }) {
  const author = useSelector((state) => selectUserById(state, authorId))
  return <span>{author ? author.name : 'Unknown Author'}</span>
}
