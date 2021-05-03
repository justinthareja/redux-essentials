import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewPost } from './postsSlice'

export function AddPostForm(props) {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [selectedAuthor, setSelectedAuthor] = React.useState('')
  const [addRequestStatus, setAddRequestStatus] = React.useState('idle')

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setSelectedAuthor(e.target.value)

  const canSave =
    content.length > 0 &&
    title.length > 0 &&
    selectedAuthor !== '' &&
    addRequestStatus === 'idle'

  const onFormSubmit = async (e) => {
    e.preventDefault()

    if (canSave) {
      try {
        // only want to know if the request in in progress or not
        setAddRequestStatus('pending')

        // dispatch(thunk) returns a promise that will resolve when request
        // completes. the promise will resolve as the final action
        // either "fulfilled" or "rejected"
        const resultAction = await dispatch(
          addNewPost({ title, content, user: selectedAuthor })
        )

        // unwrapResult will check to see if
        // fulfilled, it will just return the action.payload
        // or throw an error this allows us to use try catch as expected
        unwrapResult(resultAction)

        setTitle('')
        setContent('')
        setSelectedAuthor('')
      } catch (e) {
        console.error('error adding post', e)
      } finally {
        setAddRequestStatus('idle')
      }
    }
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
