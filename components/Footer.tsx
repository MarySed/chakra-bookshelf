import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex } from '@chakra-ui/layout';

const Footer = () => {
  return (
    <Flex
      bg={useColorModeValue('base.300', 'gray.800')}
      minH="30vh"
      alignItems="center"
      justifyContent="center"
    >
      THIS IS AFOOTERI JFOEJ+OFIJ
    </Flex>
  );
};

export default Footer;
