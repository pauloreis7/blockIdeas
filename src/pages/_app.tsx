import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";

import { AppProvider } from "../contexts";

import { theme } from "../styles/theme";
import { getWeb3Library } from "../config/getWeb3LibraryProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <ChakraProvider resetCSS theme={theme}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
