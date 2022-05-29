import { ReactNode } from "react";

import { WalletProvider } from "./WalletContext";
import { IdeasProvider } from "./IdeasContext";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <WalletProvider>
      <IdeasProvider>{children}</IdeasProvider>
    </WalletProvider>
  );
}
