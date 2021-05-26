import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import { BookWithAuthor } from 'types/types';
import { MAX_BOOK_FETCH } from 'constants/constants';
import BookGrid from 'components/BookGrid';
import { Heading } from '@chakra-ui/layout';

export const getServerSideProps: GetServerSideProps = async () => {
  const results = await prisma.book.findMany({
    take: MAX_BOOK_FETCH,
    include: {
      author: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return {
    props: {
      books: results,
      newCursor: results[results.length - 1]?.id,
    },
  };
};

const BooksListPage = ({ books, newCursor }: { books: BookWithAuthor[]; newCursor: number }) => {
  return (
    <Layout>
      <Heading as="h1" size="2xl" mb={8}>
        All Books
      </Heading>
      <BookGrid fetchedBooks={books} newCursor={newCursor} />
    </Layout>
  );
};

export default BooksListPage;
