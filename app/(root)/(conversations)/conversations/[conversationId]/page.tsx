"use client"
import React from 'react'
import ConversationHeader from '../../_components/ConversationHeader'
import ConversationBody from '../../_components/ConversationBody'
import ConversationInput from '../../_components/ConversationInput'
import ConversationList from '../../_components/ConversationList'
import { useConversationStore } from '@/hooks/store/useMessagesStore'
import { toast } from 'sonner'
import InitMessage from '@/hooks/store/initMessage'
import { useUserStore } from '@/hooks/store/useUserStore'

const ConversationPage = ({params}: {params:{conversationId: string}}) => {
  const {user} = useUserStore()
    console.log('UserRe', user)
  const conversationId = params.conversationId
  const [conversation, setConversation] = React.useState<ConversationType[]>([])
 const {message} = useConversationStore()
  React.useEffect(() => {
    const fetchData = async () => {
        await fetch(`/api/conversations/${conversationId}`)
        .then((response) => {
          if(!response.ok){
            toast.error(response.statusText)
            return
          }
          return response.json()
        })
        .then((data) => {
          console.log("datadetails", data)
          setConversation(data)
        })
        .catch((error) => {
          toast.error(error)
        })
    }
    fetchData()
  }, [])
  return (
    <>
    {/* <InitMessage message={conversation}/> */}
    <ConversationList />
    <section className='flex flex-col w-full h-full'>
      <ConversationHeader conversation={conversation[0]}/>
      <ConversationBody conversation={conversation[0]}/>
      <ConversationInput/>
    </section>
    </>
  )
}

export default ConversationPage