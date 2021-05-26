import Layout from 'components/Layout';
import { Flex, useColorModeValue, Avatar, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { Session } from 'next-auth';
import { Bio } from '.prisma/client';
import { BookshelfWithBooks } from 'types/types';
import BookList from 'components/BookList';
import NavLink from 'components/NavLink';

const MAX_BOOKSHELVES_DISPLAY = 3;

// TODO: This was a test of functionality. Move into new directory and update behavior
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const userId = Number(params?.id);
  const session = await getSession({ req });

  const bookshelvesCount = await prisma.bookshelf.count({
    where: {
      userId: userId,
    },
  });

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
        take: MAX_BOOKSHELVES_DISPLAY,
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
      bookshelvesCount,
    },
  };
};

type Props = {
  user: {
    id: number;
    name?: string;
    email?: string;
    bio?: Bio;
    image?: string;
    bookshelf?: BookshelfWithBooks[];
  };
  bookshelvesCount: number;
  session: Session | null;
  userId: number;
};

const Users = ({ user, session, userId, bookshelvesCount }: Props) => {
  // TODO: Add check if current user is logged in user

  //@ts-expect-error Types are incorrect for session
  const userCanEdit = userId === session?.user?.id;

  return (
    <Layout>
      <Flex
        direction="column"
        p={6}
        bg={useColorModeValue('base.inverted', 'gray.800')}
        width="100%"
        rounded={6}
        borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
        borderWidth={1}
        mb={8}
      >
        <Flex direction="column" alignItems="center" w="100%" mb={6} textAlign="center">
          {userCanEdit && (
            <Flex mb={{ base: 8, md: 0 }} alignSelf={{ base: 'center', md: 'flex-end' }}>
              <NavLink to={`/bio/${user.id}`}>Edit Profile</NavLink>
            </Flex>
          )}

          <Avatar size="2xl" mb={6} rounded="full" src={user.image} />

          <Heading mb={6} as="h1">
            {user.name ?? 'Nameless user'}
          </Heading>
          <Text maxWidth="70%">{user.bio?.content ?? "This user doesn't have a bio yet"}</Text>
        </Flex>
      </Flex>

      {/* Bookshelves */}
      <Flex direction="column" width="100%" mb={8} px={4}>
        {userCanEdit && (
          <Flex alignSelf={{ base: 'center', md: 'flex-end' }} mb={{ base: 8, md: 0 }}>
            <NavLink to={`/users/${user.id}/bookshelves/list`} hoverColor="rainbow.yellow">
              Edit Bookshelves
            </NavLink>
          </Flex>
        )}

        {/* TODO: Refactor */}
        {bookshelvesCount && <Text>User has {bookshelvesCount} bookshelves</Text>}

        {user.bookshelf ? (
          user.bookshelf.map((shelf) => {
            return <BookList key={shelf.id} shelf={shelf} />;
          })
        ) : (
          <Text>User has no bookshelves</Text>
        )}
      </Flex>
    </Layout>
  );
};

export default Users;
