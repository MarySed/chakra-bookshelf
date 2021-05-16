import { Avatar, Button, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/client';

// TODO: Update and implement user card on screen right side
const UserCard = ({ session }: { session: Session | null }) => {
  const avatarSrc = session?.user?.image ?? '';

  return (
    <Flex
      rounded={6}
      borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
      backgroundColor={useColorModeValue('white', 'gray.800')}
      p={12}
      direction="column"
      alignItems="center"
    >
      {session ? (
        <>
          <Avatar size="2xl" mb={6} rounded="full" src={avatarSrc} />
          <Heading mb={6}>{session.user?.name}</Heading>
          <Text>Stuff from your bio here</Text>
          <Text>Stuff about your books and activity here</Text>
        </>
      ) : (
        <>
          <Heading mb={6}>Welcome to Bookshelf</Heading>
          <Button colorScheme="teal" onClick={() => signIn()}>
            Log in
          </Button>
        </>
      )}
    </Flex>
  );
};

export default UserCard;
