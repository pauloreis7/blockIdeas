import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { WalletProvider } from './WalletContext'
import { IdeasProvider } from './IdeasContext'

const queryClient = new QueryClient()

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <IdeasProvider>{children}</IdeasProvider>
      </WalletProvider>
    </QueryClientProvider>
  )
}
