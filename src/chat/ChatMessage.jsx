import React, { useState, useEffect } from 'react'
import { Avatar, Icon, Textarea, Loading, Tooltip, Button, Popover } from '@/components'
import { CopyIcon, EmptyChat } from './component'
// import { MessageRender } from './MessageRender'

import avatar from '@/assets/images/avatar-gpt.png'
import styles from './style/message.module.less'
import { classnames } from '../components/utils'

export function MessageHeader({messages,setTheme,theme}) {

  return (
    <div className={classnames(styles.header)}>
      <div className={styles.header_title}>
        Custom GPT POC
        <div className={styles.length}>{messages.length} messages</div>
      </div>
      <div className={styles.header_bar}>
        <Icon className={styles.icon} type={theme} onClick={() => setTheme(theme === 'light'?'dark':'light')} />
      </div>
    </div>
  )
}
export function MessageItem(props) {
  const { content, type } = props
  return (
    <div className={classnames(styles.item, styles[type])}>
      <Avatar src={type !== 'user' && avatar} />
      <div className={classnames(styles.item_content, styles[`item_${type}`])}>
        <div className={styles.item_inner}>
          {/* <MessageRender> */}
            {content}
          {/* </MessageRender> */}
        </div>
      </div>
    </div>
  )
}

export function MessageBar({ setMessages, messages,callGPT }) {
  const [inputMessage, setInputMessage] = useState('')

  const onMessageInput = (e) => {
    setInputMessage(e)
  }

  const sendMessage = () => {
    if(inputMessage.trim()){
    const newMessages = [...messages]
    newMessages.push({ type: 'user', content: inputMessage })
    setMessages(newMessages)
    callGPT(inputMessage)
    setInputMessage('')
    }
  }

  return (
    <div className={styles.bar}>
      <div className={styles.bar_inner}>
        <div className={styles.bar_type}>
          <Textarea transparent={true} rows="1" value={inputMessage} placeholder="Enter somthing...." onChange={(e) => onMessageInput(e)} sendMessage={sendMessage}/>
        </div>
        <div className={styles.bar_icon}>
          {inputMessage &&
            <Tooltip text="clear">
              <Icon className={styles.icon} type="cancel" onClick={() => setInputMessage('')} />
            </Tooltip>}
          <Icon className={styles.icon} type="send" onClick={sendMessage} />
        </div>
      </div>
    </div>
  )
}

export function MessageContainer({ messages }) {
  if (messages.length > 0) {
    return (
      <React.Fragment>
        {
          messages.length ? <div className={styles.container}>
            {messages.map((item, index) => <MessageItem key={index} {...item} />)}
          </div> : <></>
        }
      </React.Fragment>
    )
  } else {
    return <EmptyChat />
  }
}

export function ChatMessage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(()=>{
    const body = document.querySelector("html");
    body.classList = [];
    body.setAttribute("data-theme", theme);
    body.classList.add(theme);
  },[theme])

  const callGPT = (inputMessage) => {
    console.log("CALLED",inputMessage)
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },3000)
  }

  return (
    <React.Fragment>
      <div className={styles.message}>
        <MessageHeader messages={messages} setTheme={setTheme} theme={theme}/>
        {/* <ScrollView> */}
          <MessageContainer messages={messages} />
          {loading && <Loading />}
        {/* </ScrollView> */}
        <MessageBar setMessages={setMessages} messages={messages} callGPT={callGPT}/>
      </div>
    </React.Fragment >
  )
}
