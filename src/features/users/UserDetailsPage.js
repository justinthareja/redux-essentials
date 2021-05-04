import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectUserPosts, selectAllPosts } from '../posts/postsSlice'
import { PostExcerpt } from '../posts/PostExcerpt'

export function UserDetailsPage({ match }) {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))

  // use data from one useSelector call to help determine another
  // useSelector will rerun after every action is dispatched
  const userPosts = useSelector((state) => {
    const posts = selectAllPosts(state)
    // since we're calling .filter here, this will always return a new
    // array and rerender the component even if the posts data
    // hasnt changed
    return posts.filter((post) => post.user === userId)
  })

  const memoizedUserPosts = useSelector((state) =>
    selectUserPosts(state, userId)
  )

  const renderedUserPosts = user.posts.map((postId) => (
    <PostExcerpt key={postId} postId={postId} />
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      {renderedUserPosts}
    </section>
  )
}
