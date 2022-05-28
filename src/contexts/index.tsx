import { ReactNode } from "react";

import { WalletProvider } from "./WalletContext";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return <WalletProvider>{children}</WalletProvider>;
}
