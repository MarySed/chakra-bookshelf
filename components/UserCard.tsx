import { Button, Flex, Heading } from '@chakra-ui/react';

// TODO: Update and implement user card on screen right side
const UserCard = () => {
  return (
    <Flex rounded={6} backgroundColor="gray.100" p={12} direction="column">
      <Heading mb={6}>Welcome to Whatever</Heading>
      <Button colorScheme="teal">Log in</Button>
    </Flex>
  );
};

export default UserCard;
