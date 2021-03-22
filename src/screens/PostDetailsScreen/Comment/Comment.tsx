import React from 'react'

import { Text } from '../../../components/Text'
import * as styles from './styles'

interface CommentProps {
  author: string
  text: string
}

export const Comment: React.FC<CommentProps> = ({ author, text }) => (
  <div className={styles.commentRoot}>
    <div className={styles.commentAuthor}>{`${author} said:`}</div>
    <div className={styles.commentText}>
      <Text text={text} />
    </div>
  </div>
)
