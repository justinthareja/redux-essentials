import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { updatePost, selectPostById } from './postsSlice'

export function EditPostForm({ match }) {
  const { postId } = match.params
  const post = useSelector(selectPostById(postId))

  const [title, setTitle] = React.useState(post.title)
  const [content, setContent] = React.useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (content.length === 0 || title.length === 0) {
      return
    }

    dispatch(updatePost({ title, content, id: postId }))
    history.push(`/posts/${postId}`)
  }

  if (!post) {
    return (
      <section>
        <h2>Invalid PostId</h2>
      </section>
    )
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="title">
          Title
          <input
            value={title}
            onChange={onTitleChange}
            type="text"
            name="title"
            id="title"
          />
        </label>
        <label htmlFor="content">
          Content
          <textarea
            value={content}
            onChange={onContentChange}
            name="content"
            id="content"
            cols="30"
            rows="10"
          ></textarea>
        </label>
        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}
