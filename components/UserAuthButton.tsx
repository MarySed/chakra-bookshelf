import { signIn, signOut, useSession } from 'next-auth/client';
import { Button } from '@chakra-ui/react';

const UserAuthButton = () => {
  const [session, loading] = useSession();

  return session ? (
    <Button
      onClick={() => signOut()}
      variant="outline"
      bg="base.900"
      color="base.inverted"
      _hover={{ bg: 'base.800' }}
      width="100%"
      isLoading={loading}
    >
      Sign out
    </Button>
  ) : (
    <Button
      onClick={() => signIn()}
      variant="outline"
      bg="base.900"
      color="base.inverted"
      _hover={{ bg: 'base.800' }}
      isLoading={loading}
      width="100%"
    >
      Sign in
    </Button>
  );
};

export default UserAuthButton;
