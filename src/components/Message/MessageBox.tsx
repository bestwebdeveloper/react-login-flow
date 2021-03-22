import { cx } from 'emotion';
import React from 'react';

import * as styles from './styles';

interface MessageProps {
  messages?: string[]
  type?: 'default' | 'error' | 'info'
}

export const MessageBox: React.FC<MessageProps> = ({ messages = [], type = 'default' }) => messages.length > 0 ? (
  <div
    className={cx(
      styles.messageStyle,
      type === 'error'
        ? styles.errorMessageStyle
        : type === 'info'
        ? styles.infoMessageStyle
        : styles.defaultMessageStyle
    )}
  >
    {messages.map((message, index) => (
      <div key={index}>{message}</div>
    ))}
  </div>
) : null;
