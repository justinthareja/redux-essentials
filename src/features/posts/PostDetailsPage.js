import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'

export function PostDetailsPage({ match }) {
  const { postId } = match.params
  // component will re-render any time the value returned from
  // useSelector changes to a new reference. only select smallest
  // values you need to avoid unnecessary re-renders
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

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
        <PostAuthor authorId={post.author} />
        <p className="post-content">{post.content}</p>
      </article>
      <Link to={`/editPost/${post.id}`}>Edit Post</Link>
    </section>
  )
}
