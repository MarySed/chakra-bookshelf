import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NavBar from './NavBar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex height="100vh" direction="column">
      <NavBar />
      <Flex direction="column" px={{ base: 6, lg: 12 }} pb={12}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
