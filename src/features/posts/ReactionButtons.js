import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementReactionCount } from './postsSlice'

export const reactionEmojis = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export function ReactionButtons({ postId }) {
  const dispatch = useDispatch()
  const reactions = useSelector(
    (state) => state.posts.find((post) => post.id === postId).reactions
  )

  const onButtonClick = (reaction) => () => {
    dispatch(incrementReactionCount({ postId, reaction }))
  }

  const buttons = Object.entries(reactionEmojis).map(
    ([reaction, reactionEmoji]) => {
      const count = reactions[reaction]
      return (
        <button
          key={reaction}
          className="button reaction-button"
          onClick={onButtonClick(reaction)}
        >
          {reactionEmoji} {count}
        </button>
      )
    }
  )

  return <div>{buttons}</div>
}
