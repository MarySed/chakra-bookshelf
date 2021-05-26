import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex } from '@chakra-ui/layout';

const Footer = () => {
  return (
    <Flex
      bg={useColorModeValue('base', 'base')}
      minH="30vh"
      alignItems="center"
      justifyContent="center"
      color="base.inverted"
    >
      Lol what am I gonna put in a footer?
    </Flex>
  );
};

export default Footer;
