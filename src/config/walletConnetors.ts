import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export type ConnectorsName = "metaMask" | "walletConnect";

const supportedChainIds = [1666600000, 1666600001, 1666600002, 1666600003, 1];

export const metamask = new InjectedConnector({
  supportedChainIds,
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
    1666600000: "https://api.harmony.one/",
    1666600001: "https://s1.api.harmony.one/",
    1666600002: "https://s2.api.harmony.one",
    1666600003: "https://s3.api.harmony.one",
  },
  supportedChainIds,
  qrcode: true,
});

export const connectorTypes = {
  metaMask: metamask,
  walletConnect: walletconnect,
};
