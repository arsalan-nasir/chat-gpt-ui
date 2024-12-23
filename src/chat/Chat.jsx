import React from 'react'
import { ChatMessage } from './ChatMessage'
import { classnames } from '../components/utils'
import styles from './style/chat.module.less'
import './style.less'

export default function Chat() {
  const chatStyle = styles.full
  return (
    <div className={classnames(styles.chat, chatStyle)}>
      <div className={styles.chat_inner}>
        {
      
            <React.Fragment> 
              <ChatMessage />
            </React.Fragment>
        }
      </div>
    </div>
  )
}
