import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import '../styles/globals.css';

const customTheme = extendTheme({
  // Shamelessly taken from dev.to. Thanks dev.to!
  colors: {
    // main: '#3b49df',
    main: '#ff378a',
    'main.dark': '#d22a70',
    'base.900': '#202428',
    'base.800': '#363d44',
    'base.700': '#4d5760',
    'base.600': '#64707d',
    'base.500': '#7d8a97',
    'base.400': '#99a3ad',
    'base.300': '#b5bdc4',
    'base.200': '#d2d6db',
    'base.100': '#eef0f1',
    'base.0': '#f9fafa',
    'base.inverted': '#fff',
    'base.a100': 'rgba(8, 9, 10, 0.1)',
    base: '#08090a',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
