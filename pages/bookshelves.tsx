import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { BookshelfWithBooks } from 'types/types';
import { Session } from 'inspector';
import Router from 'next/router';
import BookList from 'components/BookList';

// List all bookshelves of the signed in user
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  // Drafts page cannot be accessed if the user is not logged in
  if (!session) {
    res.statusCode = 403;

    return {
      props: {
        drafts: [],
      },
    };
  }

  const bookshelves = await prisma.bookshelf.findMany({
    where: {
      user: {
        email: session.user?.email,
      },
    },

    include: {
      books: true,
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

const Bookshelves = ({ bookshelves, session }: Props) => {
  console.log(bookshelves);

  if (!session) {
    return <Text>Please log in to view this page...</Text>;
  }
  return (
    <Layout>
      <Heading size="lg" as="h1" mb={3}>
        Your Bookshelves {'  '}
        <Button
          bg={'main'}
          color={'base.inverted'}
          _hover={{ bg: 'main.dark' }}
          onClick={() => Router.push('/create/bookshelf')}
        >
          Create bookshelf
        </Button>
      </Heading>
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