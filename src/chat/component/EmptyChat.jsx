import React from 'react'
import styles from './style.module'
import EmptyImg from './EmptyImg'

export function EmptyChat() {
  return (
    <div className={styles.empty}>
      <EmptyImg />

    </div>
  )
}
