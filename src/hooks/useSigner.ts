import { useState, useEffect } from 'react'
import { providers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

// types
import type { Signer } from 'ethers'

function useSigner() {
  // states
  const [signer, setSigner] = useState<Signer>()

  // hooks
  const { library, active } = useWeb3React()

  useEffect(() => {
    if (active) {
      const provider = new providers.Web3Provider(library.provider)
      const signer = provider.getSigner()

      setSigner(signer)
    }
  }, [active])

  return { signer }
}

export { useSigner }
