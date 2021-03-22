import React from 'react'

import * as styles from './styles'

interface HeaderProps {
  onLogOut: () => void
}

export const Header: React.FC<HeaderProps> = ({ onLogOut }) => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerInner}>
        <button className={styles.logOutButton} onClick={onLogOut}>
          Log Out
        </button>
      </div>
    </header>
  )
}
