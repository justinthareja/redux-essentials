import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PostExcerpt } from './PostExcerpt'
import { fetchPosts, selectPostIds } from './postsSlice'

export function PostsList(props) {
  const dispatch = useDispatch()

  // useSelector receives the whole state object
  const postIds = useSelector(selectPostIds)
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
    content = postIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
