import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useDisclosure, UseDisclosureReturn, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ConnectorsName, connectorTypes } from "../config/walletConnetors";

type WalletProviderProps = PropsWithChildren<{}>;

type WalletContextData = {
  connectorName: ConnectorsName | null;
  walletFormatted: string | null;
  isWalletModalOpen: boolean;
  isWalletProfileModalOpen: boolean;
  setWalletModalOpen: (isOpen: boolean) => void;
  setIsWalletProfileModalOpen: (isOpen: boolean) => void;
  handleMetaMask: () => Promise<void>;
  handleWalletConnect: () => Promise<void>;
  handleSignOut: () => void;
  unsupportedNetworkDisclosure: UseDisclosureReturn;
};

const WalletContext = createContext({} as WalletContextData);

export function WalletProvider({ children }: WalletProviderProps) {
  const { account, activate, deactivate, connector, error } = useWeb3React();
  const { query } = useRouter();

  const toast = useToast();
  const unsupportedNetworkDisclosure = useDisclosure();

  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isWalletProfileModalOpen, setIsWalletProfileModalOpen] =
    useState(false);
  const [connectorName, setConnectorName] = useState<ConnectorsName | null>(
    null
  );
  const [walletFormatted, setWalletFormatted] = useState<string | null>(null);

  useEffect(() => {
    const lastWalletConnector = localStorage.getItem(
      "@ideaschain.last-wallet-connector"
    ) as ConnectorsName;

    if (lastWalletConnector) {
      activate(connectorTypes[lastWalletConnector]);
    }
  }, [activate, query]);

  useEffect(() => {
    if (!connector && !account) {
      return;
    }

    const walletFormatted = `${account?.substring(0, 6)}...${account?.substring(
      account?.length - 4
    )}`;

    setWalletFormatted(walletFormatted);

    const connectorTypes = {
      metaMask: connector instanceof InjectedConnector,
      walletConnect: connector instanceof WalletConnectConnector,
    };

    const connectorType = Object.keys(connectorTypes).find(
      (key) => connectorTypes[key as ConnectorsName] === true
    );

    setConnectorName(connectorType as ConnectorsName);
    localStorage.setItem(
      "@ideaschain.last-wallet-connector",
      String(connectorType)
    );
  }, [connector, account]);

  async function handleMetaMask() {
    if (account) {
      return;
    }

    try {
      await activate(connectorTypes["metaMask"], undefined, true);
    } catch (err) {
      const toastErrorMessage = (err as Error).message;

      if (toastErrorMessage.includes("Unsupported chain id")) {
        unsupportedNetworkDisclosure.onOpen();

        return;
      }

      toast({
        title: toastErrorMessage,
        description: "Please try again",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      localStorage.setItem("@ideaschain.last-wallet-connector", "metaMask");

      setWalletModalOpen(false);
    }
  }

  async function handleWalletConnect() {
    if (account) {
      return;
    }

    const walletConnect = connectorTypes["walletConnect"];

    activate(walletConnect, (err) => {
      if (walletConnect && walletConnect instanceof WalletConnectConnector) {
        walletConnect.walletConnectProvider = undefined;
      }

      localStorage.setItem(
        "@ideaschain.last-wallet-connector",
        "walletConnect"
      );

      setWalletModalOpen(false);

      if (err.message.includes("Unsupported chain id")) {
        unsupportedNetworkDisclosure.onOpen();

        return;
      }

      toast({
        title: err.message,
        description: "Please try again",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    });
  }

  function handleSignOut() {
    localStorage.removeItem("@ideaschain.last-wallet-connector");

    deactivate();

    setIsWalletProfileModalOpen(false);
  }

  return (
    <WalletContext.Provider
      value={{
        connectorName,
        walletFormatted,
        isWalletModalOpen,
        isWalletProfileModalOpen,
        setWalletModalOpen,
        setIsWalletProfileModalOpen,
        handleMetaMask,
        handleWalletConnect,
        handleSignOut,
        unsupportedNetworkDisclosure,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
