import { Flex, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BookWithAuthor } from 'types/types';
import { fetchCursoredBooks } from 'utilities/utils';
import Book from './Book';

type Props = {
  fetchedBooks?: BookWithAuthor[];
  newCursor?: number;
};

// TODO: Update with "isSelect" prop, and replace Book comp with Selectable Book component
const BookGrid = ({ fetchedBooks = [], newCursor = undefined }: Props) => {
  const [books, setBooks] = useState(fetchedBooks);
  const [cursor, setCursor] = useState(newCursor);
  const [isComplete, setIsComplete] = useState(false);

  // TODO: Note to self, use this for a custom hook for reusability
  const handleFetch = async () => {
    const results = await fetchCursoredBooks({ cursorParams: cursor });

    if (!results.books.length) {
      setIsComplete(true);
      return;
    }

    setBooks((prevState: any) => [...prevState, ...results.books]);
    setCursor(results.newCursor);
  };

  return (
    <Flex direction="column" width="100%" height="100%">
      <Flex flexWrap="wrap" mb={8}>
        {books.map((book) => {
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
