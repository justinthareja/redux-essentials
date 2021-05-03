import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PostExcerpt } from './PostExcerpt'
import { selectAllPosts, fetchPosts } from './postsSlice'

export function PostsList(props) {
  const dispatch = useDispatch()

  // useSelector receives the whole state object
  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector((state) => state.posts.status)
  const postError = useSelector((state) => state.posts.error)

  // fetch all posts when component mounts
  React.useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content

  if (postsStatus === 'loading') {
    content = <div>Loading...</div>
  } else if (postsStatus === 'error') {
    content = <div>{postError}</div>
  } else if (postsStatus === 'success') {
    // sorts posts in reverse chronological order by datetime string
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = sortedPosts.map((post) => <PostExcerpt post={post} />)
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
