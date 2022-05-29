import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

// web3
import { config } from './'

export type ConnectorsName = 'metaMask' | 'walletConnect'

export const metamask = new InjectedConnector({
  supportedChainIds: config.supportedChainIds,
})

export const walletconnect = new WalletConnectConnector({
  rpc: config.walletConnect.rpc,
  supportedChainIds: config.supportedChainIds,
  qrcode: true,
})

export const connectorTypes = {
  metaMask: metamask,
  walletConnect: walletconnect,
}
