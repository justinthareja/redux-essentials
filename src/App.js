import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import { PostDetailsPage } from './features/posts/PostDetailsPage'
import { fetchUsers } from './features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const usersStatus = useSelector((state) => state.users.status)
  const usersError = useSelector((state) => state.users.error)

  React.useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [usersStatus, dispatch])

  if (usersStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (usersStatus === 'error') {
    return <div>{usersError}</div>
  }

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <PostsList />
                <AddPostForm />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={PostDetailsPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
