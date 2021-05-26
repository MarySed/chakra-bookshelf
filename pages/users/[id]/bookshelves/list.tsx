import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { BookshelfWithBooks } from 'types/types';
import { Session } from 'inspector';

import BookList from 'components/BookList';
import NavLink from 'components/NavLink';

// List all bookshelves of the signed in user
export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await getSession({ req });

  // Drafts page cannot be accessed if the user is not logged in
  if (!session) {
    res.statusCode = 403;

    return {
      props: {
        bookshelves: [],
      },
    };
  }

  const bookshelves = await prisma.bookshelf.findMany({
    where: {
      user: {
        id: Number(params?.id),
      },
    },

    include: {
      books: {
        include: {
          author: true,
        },
      },
    },

    orderBy: {
      id: 'desc',
    },
  });

  return {
    props: {
      bookshelves,
      session,
    },
  };
};

type Props = {
  bookshelves: BookshelfWithBooks[];
  session: Session;
};

const Bookshelves = ({ bookshelves }: Props) => {
  return (
    <Layout>
      <Flex direction="column" justifyContent="center" width="100%" height="100%" gridGap={2} flexWrap="wrap" pb={8}>
        <Flex>
          <Heading size="2xl" as="h1">
            Your Bookshelves
          </Heading>
        </Flex>

        <Flex>
          <NavLink to={'/bookshelves/new'} hoverColor="rainbow.pink" fontSize="1.5rem">
            Create bookshelf
          </NavLink>
        </Flex>
      </Flex>

      <Flex direction="column" gridGap={4}>
        {bookshelves.length ? (
          bookshelves.map((shelf) => {
            return <BookList key={shelf.id} shelf={shelf} />;
          })
        ) : (
          <>
            <Text>You don't have any bookshelves yet</Text>
          </>
        )}
      </Flex>
    </Layout>
  );
};

export default Bookshelves;
