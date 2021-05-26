import { Flex, Heading } from '@chakra-ui/react';
import { BookshelfWithBooks } from 'types/types';
import Book from './Book';
import NavLink from './NavLink';

type Props = {
  shelf: BookshelfWithBooks;
};

const BookList = ({ shelf }: Props) => {
  return (
    <Flex direction="column" mb={12}>
      <Heading as="h1" size="lg" mb={4} fontWeight="thin">
        <NavLink to={`/bookshelves/${shelf.id}`} hoverColor="rainbow.lightblue" fontSize="2rem">
          {shelf.name}
        </NavLink>
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
