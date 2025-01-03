import React, { useState, useEffect } from 'react'
import { Avatar, Icon, Textarea, Loading, Tooltip, Button, Switch } from '@/components'
import { CopyIcon, EmptyChat } from './component'
import { MessageRender } from './MessageRender'

import avatar from '@/assets/images/avatar-gpt.png'
import styles from './style/message.module.less'
import { classnames } from '../components/utils'

import axios from 'axios'

export function MessageHeader({ messages, setTheme, theme }) {

  return (
    <div className={classnames(styles.header)}>
      <div className={styles.header_title}>
        Nisum AI Assistant
        <div className={styles.length}>{messages.length} messages</div>
      </div>
      <div className={styles.header_bar}>
        <Icon className={styles.icon} type={theme} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      </div>
    </div>
  )
}
export function MessageItem(props) {
  const { content, type } = props
  return (
    <div className={classnames(styles.item, styles[type])}>
      <Avatar src={type !== 'user' && avatar} />
      <div className={classnames(styles.item_content, styles[`item_${type}`])} style={{maxWidth:'90%'}}>
        <div className={styles.item_inner} >
        <div className={styles.item_tool}>
            <div className={styles.item_bar}>
              {type === 'user' ? <React.Fragment>
              </React.Fragment> : <CopyIcon value={content} tooltip="Copy"/>}

            </div>
          </div>
          <MessageRender>
          {content}
          </MessageRender>
        </div>
      </div>
    </div>
  )
}

export function MessageBar({ setMessages, messages, callGPT }) {
  const [inputMessage, setInputMessage] = useState('')

  useEffect(()=>{
    if(messages.length>0 && messages[messages.length-1].type === 'user'){
    callGPT(messages[messages.length-1].content)
    }
  },[messages])

  const onMessageInput = (e) => {
    setInputMessage(e)
  }

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessages = [...messages]
      newMessages.push({ type: 'user', content: inputMessage })
      setMessages(newMessages)
      setInputMessage('')
    }
  }

  return (
    <div className={styles.bar}>
      <div className={styles.bar_inner}>
        <div className={styles.bar_type}>
          <Textarea transparent={true} rows="1" value={inputMessage} placeholder="Ask anything" onChange={(e) => onMessageInput(e)} sendMessage={sendMessage} />
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

  useEffect(() => {
    const body = document.querySelector("html");
    body.classList = [];
    body.setAttribute("data-theme", theme);
    body.classList.add(theme);
  }, [theme])

  useEffect(()=>{console.log({messages})},[messages])

  const callGPT =async (inputMessage) => {
    setLoading(true)
    try {
      
    const response = await axios.get(`http://localhost:8800/v1/ai/generateFromPdf?query=${inputMessage}`)
      const newResponse= [...messages]
    if(response.status == 500){
      newResponse.push({type:'response',content: 'Sorry, seems like a technical issue in our system. Can you please try again.'})
      setMessages(newResponse)
    }else if(response.status == 200 && response.data.response.toLowerCase() === 'unknown') {
      newResponse.push({type:'response',content: 'Sorry, can you please rephrase/ask your question again with more clarity.'})

      setMessages(newResponse)
    }else{
      newResponse.push({type:'response',content:response.data.response})
      setMessages(newResponse)

    }
      setLoading(false)
  } catch (error) {
      console.log("SOMETHING WENT WRONG")
  }
  finally{
    setLoading(false)
  }
  }

  return (
    <React.Fragment>
      <div className={styles.message}>
        <MessageHeader messages={messages} setTheme={setTheme} theme={theme} />
        {/* <ScrollView> */}
        <MessageContainer messages={messages} />
        {loading && <Loading />}
        {/* </ScrollView> */}
        <MessageBar setMessages={setMessages} messages={messages} callGPT={callGPT} />
      </div>
    </React.Fragment >
  )
}

