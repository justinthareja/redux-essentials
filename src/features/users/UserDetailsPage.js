import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectAllPosts } from '../posts/postsSlice'
import { PostExcerpt } from '../posts/PostExcerpt'

export function UserDetailsPage({ match }) {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))

  // use data from one useSelector call to help determine another
  const userPosts = useSelector((state) => {
    const posts = selectAllPosts(state)
    return posts.filter((post) => post.user === userId)
  })

  const renderedUserPosts = userPosts.map((post) => (
    <PostExcerpt key={post.id} post={post} />
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      {renderedUserPosts}
    </section>
  )
}
