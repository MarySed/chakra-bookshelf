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

  //   console.log(userId, 'userid');

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

const Users = ({ user, session, userId }: Props) => {
  // TODO: Add check if current user is logged in user

  console.log(user, 'user');
  console.log(session, 'session');
  console.log(userId, 'userId');

  //@ts-expect-error Types are incorrect for session
  const userCanEdit = user?.id === session?.user?.id;

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
        {user ? (
          <>
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
                  {userCanEdit && (
                    <Button variant="ghost" onClick={() => Router.push(`/bio/${user.id}`)}>
                      Edit Profile
                    </Button>
                  )}
                </Heading>
                <Text>{user.bio?.content ?? ''}</Text>
              </Flex>
            </Flex>
            <Flex direction="column" width="100%">
              <Heading mb={2}>
                Bookshelves{' '}
                {userCanEdit && (
                  <Button variant="ghost" onClick={() => Router.push(`/users/${user.id}/bookshelves/list`)}>
                    Edit Bookshelves
                  </Button>
                )}
              </Heading>
              {user.bookshelf &&
                user.bookshelf.map((shelf) => {
                  console.log(shelf);
                  return <BookList key={shelf.id} shelf={shelf} />;
                })}
            </Flex>
          </>
        ) : (
          <>
            <Text>User not found</Text>
          </>
        )}
      </Flex>
    </Layout>
  );
};

export default Users;
