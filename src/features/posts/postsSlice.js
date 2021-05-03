import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  status: 'idle',
  error: null,
  posts: [],
}

// createAsyncThunk will dispatch "pending" "error" and "success" actions
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  // this callback is considred a "payload creator"
  // whatever is returned here will be used as action.payload
  // for the action.type of "posts/fetchPosts/fulfilled"
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    return response.post
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // state here is the slices' state, not the entire redux state
    addPost: {
      reducer: (state, action) => {
        // can only use state and action to update state
        // anything else will cause bugs
        state.posts.push(action.payload)
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
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    updatePost: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload.id)
      if (!post) {
        return
      }

      post.content = action.payload.content
      post.title = action.payload.title
    },
    incrementReactionCount: (state, action) => {
      // reducers can contain as much logic as necessary to calculate the new state
      // better to do these calculations in a reducer than an action
      const { postId, reaction } = action.payload
      const post = state.posts.find((p) => p.id === postId)
      if (
        !(
          post &&
          post.reactions &&
          typeof post.reactions[reaction] === 'number'
        )
      ) {
        return
      }

      post.reactions[reaction]++
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'success'
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload)
    },
  },
})

// selector functions - decouples redux state shape from components
// state for selector functions is root redux state
// not necessary for everything, but a good idea when accessing the
// same state in many places
export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === postId)

export const {
  addPost,
  updatePost,
  incrementReactionCount,
} = postsSlice.actions

export default postsSlice.reducer
