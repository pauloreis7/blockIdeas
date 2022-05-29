import { useQuery } from 'react-query'

// web3
import { config } from '../../config'

async function fetchUserNFT(account?: string | null): Promise<boolean> {
  if (!account) {
    return false
  }

  try {
    const contract = config.contracts.BoardIdeas()
    const [userHasNFT] = await contract.functions.hasAccessPass(account)

    return userHasNFT
  } catch (error) {
    console.log({error})
    return false
  }
}

export function useGetNFT(account?: string | null) {
  return useQuery(['userNFT', account], () => fetchUserNFT(account), {
    staleTime: 1000 * 60 * 2, // 2 minutes

  })
}
