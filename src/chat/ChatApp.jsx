import React, { Suspense } from 'react'
import { Loading } from '@/components'
import './style.less'
const Chat = React.lazy(() => import("./Chat"))

export default function ChatApp() {
  return (
    <Suspense fallback={<Loading />}>
        <Chat />
    </Suspense>
  )
}
