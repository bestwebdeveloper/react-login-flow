import React from 'react'
import { Link } from 'react-router-dom'

import * as styles from './styles'

interface PostProps {
  comments: number
  createdAt: string
  id: number
  likes: number
  title: string
}

export const PostsListItem: React.FC<PostProps> = ({ comments, createdAt, id, likes, title }) => (
  <h2 className={styles.postLinkWrapper}>
    <Link className={styles.postLink} to={`/post/${id}`}>
      <div className={styles.postLinkTitle}>{title}</div>
      <div className={styles.postLinkSubtitle}>
        <div className={styles.postLinkDate}>{`Posted at: ${createdAt}`}</div>
        <div className={styles.postLinkComments}>{`Comments: ${comments}`}</div>
        <div className={styles.postLinkLikes}>{`Likes: ${likes}`}</div>
      </div>
    </Link>
  </h2>
)
