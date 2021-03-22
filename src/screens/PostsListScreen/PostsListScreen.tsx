import React from 'react'

import { listPosts, Post } from '../../../api'
import { MessageBox } from '../../components/Message'
import { MESSAGES } from '../../constants'
import { AccessContext } from '../../contexts/AccessContext'
import { useAsyncRequest } from '../../hooks/useAsyncRequest'
import { PostsListItem } from './PostsListItem'
import * as styles from './styles'

export const PostsListScreen: React.FC = () => {
  const accessToken = React.useContext(AccessContext)
  const { isLoading, error, result: posts } = useAsyncRequest<Post[]>({
    asyncFn: listPosts,
    params: [accessToken],
  })

  return (
    <div className={styles.rootStyle}>
      <h1 className={styles.postsHeader}>Posts</h1>
      {isLoading ? <MessageBox messages={[MESSAGES.LOADING]} /> : null}
      {error ? <MessageBox type="error" messages={[error]} /> : null}
      {!isLoading && !error && posts !== null && posts !== undefined
        ? posts.map(({ comments, createdAt, id, likes, title }) => (
            <PostsListItem
              comments={comments.length}
              createdAt={createdAt.toFormat('LL/dd/yyyy')}
              id={id}
              key={id}
              likes={likes}
              title={title}
            />
          ))
        : null}
    </div>
  )
}
