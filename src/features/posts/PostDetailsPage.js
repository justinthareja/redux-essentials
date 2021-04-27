import * as React from 'react'
import { useSelector } from 'react-redux'
import { EditPostForm } from './EditPostForm'

export function PostDetailsPage({ match }) {
  const { postId } = match.params
  // component will re-render any time the value returned from
  // useSelector changes to a new reference. only select smallest
  // values you need to avoid unnecessary re-renders
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const [isEditing, setIsEditing] = React.useState(false)
  const toggleIsEditing = () => setIsEditing((prevIsEditing) => !prevIsEditing)

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
      <button className="button" onClick={toggleIsEditing}>
        Edit Post
      </button>
      {isEditing && <EditPostForm postId={postId} onSubmit={toggleIsEditing} />}
    </section>
  )
}
