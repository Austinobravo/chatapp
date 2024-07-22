import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

const useConversations = () => {
    const params = useParams()
    
    const conversationId = useMemo(() => 
        params?.conversationId || ""
    , [params?.conversationId])

    const isActive = useMemo(() => !!conversationId, [conversationId])
  return {conversationId, isActive}
}

export default useConversations