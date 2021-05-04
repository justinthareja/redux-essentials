import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

// createEntityAdapter is a helper to manage normalization of data
// returns an object with normalized getters and setters
const postsAdapter = createEntityAdapter({
  // sortComparer is a custom function that sorts the entity ids
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

// by default the initial state of the adapter is
// { ids: [], entities: {} }
// any additional fields will be merged
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

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
      const { id, content, title } = action.payload
      const post = state.entities[id]
      if (!post) {
        return
      }

      post.content = content
      post.title = title
    },
    incrementReactionCount: (state, action) => {
      // reducers can contain as much logic as necessary to calculate the new state
      // better to do these calculations in a reducer than an action
      const { postId, reaction } = action.payload
      const post = state.entities[postId]
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
      // Use the `upsertMany` reducer as a mutating update utility
      postsAdapter.upsertMany(state, action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.error.message
    },
    // Use the `addOne` reducer for the fulfilled case
    [addNewPost.fulfilled]: postsAdapter.addOne,
  },
})

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts)

// createSelector takes a list of "input selectors" and an
// "output selector" and returns a memoized selector
// that will only update if any of the inputs are changed
export const selectUserPosts = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export const {
  addPost,
  updatePost,
  incrementReactionCount,
} = postsSlice.actions

export default postsSlice.reducer
