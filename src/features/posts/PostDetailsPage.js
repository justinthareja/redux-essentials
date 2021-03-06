import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { selectPostById } from './postsSlice'

export function PostDetailsPage({ match }) {
  const { postId } = match.params
  // component will re-render any time the value returned from
  // useSelector changes to a new reference. only select smallest
  // values you need to avoid unnecessary re-renders
  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>invalid post Id</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor authorId={post.user} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
      </article>
      <Link to={`/editPost/${post.id}`}>Edit Post</Link>
    </section>
  )
}
