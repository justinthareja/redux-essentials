import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post', content: 'Hello' },
  { id: '2', title: 'Second Post', content: 'World' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // state here is the slices' state, not the entire redux state
    addPost: (state, action) => {
      state.push(action.payload)
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
