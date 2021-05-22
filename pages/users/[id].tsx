import Layout from 'components/Layout';
import { Button, Flex, useColorModeValue, Avatar } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { Session } from 'next-auth';
// import Router from 'next/router'; will add in later...
import { Bio } from '.prisma/client';

// TODO: This was a test of functionality. Move into new directory and update behavior
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const userId = Number(params?.id);
  const session = await getSession({ req });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      name: true,
      email: true,
      bio: true,
      image: true,
    },
  });

  return {
    props: {
      user,
      session,
      userId,
    },
  };
};

// TODO: Finish this page. Ugh I am so bored I'm being lazy with code choices >_<

type Props = {
  user: { name?: string; email?: string; bio?: Bio; image?: string };
  session: Session | null;
  userId: number;
};

const UserProfile = ({ user }: Props) => {
  // TODO: Add check if current user is logged in user
  console.log(user, 'user');
  return (
    <Layout>
      <Flex
        direction="column"
        alignItems="center"
        w="100%"
        p={12}
        bg={useColorModeValue('base.inverted', 'gray.800')}
        width="100%"
        rounded={6}
        borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
        borderWidth={1}
        height="100vh"
        minHeight="100vh"
      >
        <Button
          justifySelf="flex-start"
          alignSelf="flex-end"
          bg={'main'}
          color={'base.inverted'}
          _hover={{ bg: 'main.dark' }}
          type="submit"
          maxW="lg"
          //   onClick={(e) => setIsEditing(!isEditing)}
          //   isLoading={isLoading}
        >
          Edit Profile
        </Button>
        <Flex direction="column" justifyContent="center" height="100%">
          <Avatar size="2xl" mb={6} rounded="full" src={user.image} />
          {user.bio?.content ?? ''}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default UserProfile;
