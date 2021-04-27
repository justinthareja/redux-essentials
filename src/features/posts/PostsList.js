import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function PostsList(props) {
  // useSelector receives the whole state object
  const posts = useSelector((state) => state.posts)
  const users = useSelector((state) => state.users)

  const renderedPosts = posts.map((post) => {
    const postAuthor = users.find((user) => user.id === post.author)

    return (
      <article className="post-excerpt" key={post.id}>
        <Link to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
        <small>{postAuthor && postAuthor.name}</small>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
  })

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
