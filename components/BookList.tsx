import { Flex, Heading, Link } from '@chakra-ui/react';
import { BookshelfWithBooks } from 'types/types';
import Book from './Book';

type Props = {
  shelf: BookshelfWithBooks;
};

const BookList = ({ shelf }: Props) => {
  return (
    <Flex direction="column" mb={12}>
      <Heading as="h1" size="lg" mb={8} fontWeight="thin">
        <Link
          textDecoration="none"
          _hover={{ textDecoration: 'none', textColor: 'main' }}
          href={`/bookshelves/${shelf.id}`}
        >
          {shelf.name}
        </Link>
      </Heading>

      <Flex width="100%" overflowX="auto">
        {shelf.books.map((book) => {
          return <Book book={book} key={book.id} />;
        })}
      </Flex>
    </Flex>
  );
};

export default BookList;
