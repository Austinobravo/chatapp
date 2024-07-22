import React from 'react'
import ConversationHeader from '../../_components/ConversationHeader'
import ConversationBody from '../../_components/ConversationBody'
import ConversationInput from '../../_components/ConversationInput'
import ConversationList from '../../_components/ConversationList'

const ConversationPage = () => {
  return (
    <>
    <ConversationList/>
    <section className='flex flex-col w-full h-full'>
      <ConversationHeader/>
      <ConversationBody/>
      <ConversationInput/>
    </section>
    </>
  )
}

export default ConversationPage