import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }: { children: ReactNode }) => {
  const pageBg = useColorModeValue('goodreads.mainmedium', 'blackAlpha.500');

  return (
    <Flex direction="column" bg={pageBg}>
      <NavBar />
      <Flex direction="column" minHeight="100vh" px={{ base: 2, md: 6, lg: 12 }} pb={20}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
