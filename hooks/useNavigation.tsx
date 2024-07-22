import { MessageCircleMore, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

const useNavigation = () => {
    const pathname = usePathname()

    const paths = useMemo(() => [
        {
            name: 'Conversations',
            href: '/conversations',
            icon: MessageCircleMore,
            active: pathname.startsWith('/conversations')
        },
        {
            name: 'Friends',
            href: '/friends',
            icon: Users,
            active: pathname.startsWith('/friends')
        },
    ], [pathname])
  return paths
}

export default useNavigation