import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'

export function PostsList(props) {
  // useSelector receives the whole state object
  const posts = useSelector((state) => state.posts)

  // sorts posts in reverse chronological order by datetime string
  const sortedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = sortedPosts.map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <Link to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
        <PostAuthor authorId={post.author} />
        <TimeAgo timestamp={post.date} />
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
