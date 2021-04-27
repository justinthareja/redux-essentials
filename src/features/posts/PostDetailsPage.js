import * as React from 'react'
import { useSelector } from 'react-redux'

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
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  )
}
