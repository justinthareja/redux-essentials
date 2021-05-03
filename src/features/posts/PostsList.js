import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
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

    content = sortedPosts.map((post) => {
      return (
        <article className="post-excerpt" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <PostAuthor authorId={post.author} />
          <TimeAgo timestamp={post.date} />
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <ReactionButtons post={post} />
          <Link to={`/posts/${post.id}`} className="button muted-button">
            View Post
          </Link>
        </article>
      )
    })
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
