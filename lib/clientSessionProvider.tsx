"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

type Props = React.PropsWithChildren<{}>
const ClientSessionProvider = ({children}: Props) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default ClientSessionProvider