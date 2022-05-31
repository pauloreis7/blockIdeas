import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { QueryClientProvider } from "react-query";

import { Header } from '../components/Header'

import { AppProvider } from "../contexts";

import { theme } from "../styles/theme";
import { getWeb3Library } from "../config/getWeb3LibraryProvider";
import { queryClient } from "../services/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <AppProvider>
            <Header />
            
            <Component {...pageProps} />
          </AppProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
