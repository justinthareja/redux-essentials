import * as React from 'react'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectPostById } from './postsSlice'
import { useSelector } from 'react-redux'

let PostExcerpt = ({ postId }) => {
  // by passing just the id to the PostExcerpt, and letting this child
  // component select the actual post, only if the array of postIds
  // changes will the parent re-render this component
  // this prevents PostExceprt from re-rendering when a sibling post
  // data gets updated
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article className="post-excerpt" key={post.id}>
      <Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <PostAuthor authorId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

// Re-render this component only when the props change.
PostExcerpt = React.memo(PostExcerpt)

export { PostExcerpt }
