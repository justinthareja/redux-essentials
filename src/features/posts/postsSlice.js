import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    title: 'First Post',
    content: 'Hello',
    author: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'World',
    author: '1',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // state here is the slices' state, not the entire redux state
    addPost: {
      reducer: (state, action) => {
        // can only use state and action to update state
        // anything else will cause bugs
        state.push(action.payload)
      },

      // by default, the action creator returned from createSlice takes
      // a single argument. prepare allows us to customize that
      // now when you dispatch(addPost()) it takes title and content
      // as the two arguments. this allows us to centralize
      // the id creation or any other info before going to the reducer step
      prepare(title, content, author) {
        return {
          payload: {
            id: nanoid(),
            // redux actions and state should only contain plain JS values like
            // objects, arrays and primitives (no functions or classes)
            date: new Date().toISOString(),
            title,
            content,
            author,
          },
        }
      },
    },
    updatePost: (state, action) => {
      const post = state.find((p) => p.id === action.payload.id)
      if (!post) {
        return
      }

      post.content = action.payload.content
      post.title = action.payload.title
    },
  },
})

export const { addPost, updatePost } = postsSlice.actions

export default postsSlice.reducer
