import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Post, retrievePost } from '../../../api'
import { MessageBox } from '../../components/Message'
import { Text } from '../../components/Text'
import { MESSAGES } from '../../constants'
import { AccessContext } from '../../contexts/AccessContext'
import { useAsyncRequest } from '../../hooks/useAsyncRequest'
import { Comment } from './Comment'
import * as styles from './styles'

interface PostDetailsRouteParams {
  postId: string
}

export const PostDetailsScreen: React.FC = () => {
  const accessToken = React.useContext(AccessContext)
  const { postId } = useParams<PostDetailsRouteParams>()
  const { isLoading, error, result: post } = useAsyncRequest<Post>({
    asyncFn: retrievePost,
    params: [accessToken, parseInt(postId, 10)],
  })

  return (
    <div className={styles.rootStyle}>
      {isLoading ? <MessageBox messages={[MESSAGES.LOADING]} /> : null}
      {error ? <MessageBox type="error" messages={[error]} /> : null}
      {!isLoading && !error && post != null ? (
        <>
          <div>
            <Link className={styles.allPostsLink} to="/">
              &laquo; {MESSAGES.ALL_POSTS}
            </Link>
          </div>
          <h1>{post.title}</h1>
          <div className={styles.postSubtitle}>
            <div>{`${MESSAGES.POSTED_AT}: ${post.createdAt.toFormat('dd/LL/yyyy')}`}</div>
            <div>{`${MESSAGES.LIKES}: ${post.likes}`}</div>
          </div>
          <div className={styles.postText}>
            <Text text={post.text} />
          </div>
          <h2>{`${
            post.comments.length === 0
              ? MESSAGES.NO_COMMENTS
              : `${post.comments.length} ${post.comments.length === 1 ? MESSAGES.COMMENT : MESSAGES.COMMENTS}`
          }`}</h2>
          {post.comments.length > 0
            ? post.comments.map(({ author, text }, index) => <Comment author={author} key={index} text={text} />)
            : null}
        </>
      ) : null}
    </div>
  )
}
