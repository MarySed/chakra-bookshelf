import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import { BookWithAuthor } from 'types/types';
import { useFetchBooks } from 'utilities/hooks/hooks';
import Book from './Book';

// TODO: Update with "isSelect" prop, and replace Book comp with Selectable Book component
const BookGrid = ({
  fetchedBooks = [],
  fetchedCursor,
}: {
  fetchedBooks?: BookWithAuthor[];
  fetchedCursor?: number;
}) => {
  const [books, isComplete, handleFetch] = useFetchBooks({ fetchedBooks, fetchedCursor });

  return (
    <Flex direction="column" width="100%" height="100%">
      <Flex flexWrap="wrap" mb={8}>
        {books &&
          books.map((book: BookWithAuthor) => {
            return <Book key={book.id} book={book} />;
          })}
      </Flex>
      <Button onClick={handleFetch} isDisabled={isComplete}>
        Fetch Books
      </Button>
    </Flex>
  );
};

export default BookGrid;
