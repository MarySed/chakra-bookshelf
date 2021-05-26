import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import '../styles/globals.css';

const customTheme = extendTheme({
  // Shamelessly taken from dev.to. Thanks dev.to!
  colors: {
    // Rainbow color palette:
    'rainbow.pink': '#e71575',
    'rainbow.red': '#f44336',
    'rainbow.purple': '#673ab7',
    'rainbow.lightblue': '#03a9f4',
    'rainbow.indigo': '#3f51b5',
    'rainbow.yellow': '#ffab00',
    'rainbow.green': '#40c057',
    'rainbow.greendark': '#3d915b',
    'rainbow.blue': '#4c6ef5',
    // #416ffe96
    'rainbow.lightpurple': '#be4bdb',
    'rainbow.mediumpurple': '#9c53a6',

    // Goodreads color palette. Use with black text.
    'goodreads.300': '#f9f8f4',
    'goodreads.100': '#fdfcfa',
    'goodreads.main': '#f6f1e8',
    'goodreads.maindark': '#927f64',
    'goodreads.mainverydark': '#382110',
    'goodreads.mainmedium': '#f5f1e9',

    // Ugly pink color palette lol
    main: '#ff378a',
    'main.dark': '#d22a70',

    // Dev.to inspired color palette. Use with white text.
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
