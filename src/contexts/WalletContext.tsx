import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useToast } from "@chakra-ui/react";

import { ConnectorsName, connectorTypes } from "../config/walletConnetors";
// import { getWalletError } from "../functions/wallet/getWalletError";
// import { getInactiveListener } from "../functions/wallet/getInactiveListener";

type WalletProviderProps = PropsWithChildren<{}>;

type Web3Error = { message: string; code: number } | null;

type WalletContextData = {
  connectorName: ConnectorsName | null;
  web3Error: Web3Error;
  walletFormatted: string | null;
  isWalletModalOpen: boolean;
  isWalletProfileModalOpen: boolean;
  isWeb3ErrorModalOpen: boolean;
  setWeb3Error: (web3Error: Web3Error) => void;
  setWalletModalOpen: (isOpen: boolean) => void;
  setIsWalletProfileModalOpen: (isOpen: boolean) => void;
  setWeb3ErrorModalOpen: (isOpen: boolean) => void;
  handleMetaMask: () => Promise<void>;
  handleWalletConnect: () => Promise<void>;
  handleSignOut: () => void;
};

const WalletContext = createContext({} as WalletContextData);

export function WalletProvider({ children }: WalletProviderProps) {
  const { account, activate, deactivate, connector } = useWeb3React();

  const toast = useToast();

  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isWalletProfileModalOpen, setIsWalletProfileModalOpen] =
    useState(false);
  const [isWeb3ErrorModalOpen, setWeb3ErrorModalOpen] = useState(false);
  const [connectorName, setConnectorName] = useState<ConnectorsName | null>(
    null
  );
  const [walletFormatted, setWalletFormatted] = useState<string | null>(null);
  const [web3Error, setWeb3Error] = useState<{
    message: string;
    code: number;
  } | null>(null);

  useEffect(() => {
    const lastWalletConnector = localStorage.getItem(
      "@pwarz.last-wallet-connector"
    ) as ConnectorsName;

    if (lastWalletConnector) {
      activate(connectorTypes[lastWalletConnector]);
    }
  }, [activate]);

  // useEffect(() => {
  //   getInactiveListener({ activate, chainId });
  // }, [activate, chainId]);

  useEffect(() => {
    const walletFormatted = account
      ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      : null;

    setWalletFormatted(walletFormatted);

    if (connector) {
      const connectorTypes = {
        metaMask: connector instanceof InjectedConnector,
        walletConnect: connector instanceof WalletConnectConnector,
      };

      const connectorType = Object.keys(connectorTypes).find(
        (key) => connectorTypes[key as ConnectorsName] === true
      );

      setConnectorName(connectorType as ConnectorsName);
      localStorage.setItem(
        "@pwarz.last-wallet-connector",
        String(connectorType)
      );
    }
  }, [connector, account]);

  async function handleMetaMask() {
    if (account) {
      return;
    }

    try {
      await activate(connectorTypes["metaMask"], undefined, true);
    } catch (err) {
      console.log(err);

      const toastErrorMessage = (err as Error).message;

      toast({
        title: toastErrorMessage,
        description: "Please try again",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      // const errorMessage = getWalletError(err as Error);

      // setWeb3Error(errorMessage);
      setWeb3ErrorModalOpen(true);
    }

    localStorage.setItem("@pwarz.last-wallet-connector", "metaMask");

    setWalletModalOpen(false);
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

      toast({
        title: err.message,
        description: "Please try again",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    });

    localStorage.setItem("@pwarz.last-wallet-connector", "walletConnect");

    setWalletModalOpen(false);
  }

  function handleSignOut() {
    localStorage.removeItem("@pwarz.last-wallet-connector");

    deactivate();

    setIsWalletProfileModalOpen(false);
  }

  return (
    <WalletContext.Provider
      value={{
        connectorName,
        web3Error,
        walletFormatted,
        isWalletModalOpen,
        isWalletProfileModalOpen,
        isWeb3ErrorModalOpen,
        setWalletModalOpen,
        setIsWalletProfileModalOpen,
        setWeb3ErrorModalOpen,
        setWeb3Error,
        handleMetaMask,
        handleWalletConnect,
        handleSignOut,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
