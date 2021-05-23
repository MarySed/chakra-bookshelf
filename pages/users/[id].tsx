import Layout from 'components/Layout';
import { Button, Flex, useColorModeValue, Avatar, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { Session } from 'next-auth';
// import Router from 'next/router'; will add in later...
import { Bio } from '.prisma/client';
import Router from 'next/router';
import { BookshelfWithBooks } from 'types/types';
import BookList from 'components/BookList';

// TODO: This was a test of functionality. Move into new directory and update behavior
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const userId = Number(params?.id);
  const session = await getSession({ req });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      image: true,
      bookshelf: {
        select: {
          id: true,
          books: {
            select: {
              id: true,
              title: true,
              author: true,
              year: true,
              link: true,
              image: true,
            },
          },
          name: true,
        },
      },
    },

    // include: {
    //   bookshelf: true,
    // }
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
  user: { id: number; name?: string; email?: string; bio?: Bio; image?: string; bookshelf?: BookshelfWithBooks[] };
  session: Session | null;
  userId: number;
};

const Users = ({ user }: Props) => {
  // TODO: Add check if current user is logged in user
  console.log(user, 'user');
  return (
    <Layout>
      <Flex
        direction="column"
        w="100%"
        p={12}
        bg={useColorModeValue('base.inverted', 'gray.800')}
        width="100%"
        rounded={6}
        borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
        borderWidth={1}
        height="100%"
        minHeight="100vh"
      >
        {/* Avatar and profile */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          mb={{ base: 6 }}
          width="100%"
          alignSelf="flex-start"
          alignItems="center"
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Avatar size="2xl" mb={6} rounded="full" src={user.image} mr={{ md: 6 }} />
          <Flex direction="column">
            <Heading mb={2}>
              Profile{' '}
              <Button
                bg={'main'}
                color={'base.inverted'}
                _hover={{ bg: 'main.dark' }}
                type="submit"
                onClick={() => Router.push(`/bio/${user.id}`)}
              >
                Edit Profile
              </Button>
            </Heading>
            <Text>{user.bio?.content ?? ''}</Text>
          </Flex>
        </Flex>

        {/* Bookshelves */}
        <Flex direction="column" width="100%">
          <Heading mb={2}>
            Bookshelves{' '}
            <Button
              bg={'main'}
              color={'base.inverted'}
              _hover={{ bg: 'main.dark' }}
              onClick={() => Router.push(`/bookshelves`)}
            >
              Edit Bookshelves
            </Button>
          </Heading>
          {user.bookshelf &&
            user.bookshelf.map((shelf) => {
              console.log(shelf);
              return <BookList key={shelf.id} shelf={shelf} />;
            })}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Users;
