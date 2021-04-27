import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from './postsSlice'

export function EditPostForm({ postId, onSubmit }) {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')

  const dispatch = useDispatch()
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  React.useEffect(() => {
    setTitle(post.title)
    setContent(post.content)
  }, [post])

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit && onSubmit()

    if (content.length === 0 || title.length === 0) {
      return
    }

    dispatch(updatePost({ title, content, id: postId }))
    setTitle('')
    setContent('')
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
