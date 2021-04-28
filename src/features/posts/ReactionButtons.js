import * as React from 'react'
import { useDispatch } from 'react-redux'
import { incrementReactionCount } from './postsSlice'

export const reactionEmojis = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export function ReactionButtons({ post }) {
  const dispatch = useDispatch()

  const onButtonClick = (reaction) => () => {
    dispatch(incrementReactionCount({ postId: post.id, reaction }))
  }

  const buttons = Object.entries(reactionEmojis).map(([name, emoji]) => {
    const count = post.reactions[name]
    return (
      <button
        key={name}
        className="muted-button reaction-button"
        onClick={onButtonClick(name)}
      >
        {emoji} {count}
      </button>
    )
  })

  return <div>{buttons}</div>
}
