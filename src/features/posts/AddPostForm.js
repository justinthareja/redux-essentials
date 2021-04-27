import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from './postsSlice'

export function AddPostForm(props) {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [selectedAuthor, setSelectedAuthor] = React.useState('')

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setSelectedAuthor(e.target.value)

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (content.length === 0 || title.length === 0 || selectedAuthor === '') {
      return
    }

    dispatch(addPost(title, content, selectedAuthor))
    setTitle('')
    setContent('')
    setSelectedAuthor('')
  }

  const canSave =
    content.length > 0 && title.length > 0 && selectedAuthor !== ''

  return (
    <section>
      <h2>Add a New Post</h2>
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
        <label htmlFor="author">
          Author
          <select
            value={selectedAuthor}
            onChange={onAuthorChange}
            name="author"
            id="author"
          >
            <option value=""></option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
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
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
