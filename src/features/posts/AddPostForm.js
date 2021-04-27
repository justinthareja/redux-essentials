import * as React from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addPost } from './postsSlice'

export function AddPostForm(props) {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const dispatch = useDispatch()

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (content.length === 0 || title.length === 0) {
      return
    }

    dispatch(addPost({ title, content, id: nanoid() }))
    setTitle('')
    setContent('')
  }

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
