import { providers } from 'ethers'

// web3
import BoardIdeasABI from './ABIs/BoardIdeas.json'
import { BoardIdeas__factory } from './typechain'

// types
import type { Signer } from 'ethers'
import type { Provider } from '@ethersproject/providers'

const defaultProvider = new providers.JsonRpcProvider(
  'https://rpc-mumbai.matic.today'
)

const commonConfig = {
  abi: {
    BoardIdeas: BoardIdeasABI,
  },
  contracts: {
    BoardIdeas: (signerOrProvider?: Signer | Provider) =>
      BoardIdeas__factory.connect(
        process.env.NEXT_PUBLIC_BOARD_IDEAS_SMART_CONTRACT_ADDRESS,
        signerOrProvider || defaultProvider
      ),
  },
  smartContractAddresses: {
    BoardIdeas: process.env.NEXT_PUBLIC_BOARD_IDEAS_SMART_CONTRACT_ADDRESS,
  },
}
const config = {
  supportedChainIds: [80001],
  url: 'https://rpc-mumbai.matic.today',
  walletConnect: {
    rpc: {
      80001: 'https://rpc-mumbai.matic.today',
    },
  },
  ...commonConfig,
}

export { config }
