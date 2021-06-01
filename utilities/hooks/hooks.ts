import { useState } from 'react';
import { BookWithAuthor } from 'types/types';
import { fetchCursoredBooks } from 'utilities/utils';

export const useInfiniteScroll = () => {
  // Create component using intersection observer
};

// Custom hook to fetch all books
// TODO: Make less bad lol
export const useFetchBooks = ({
  fetchedBooks = [],
  fetchedCursor,
}: {
  fetchedBooks?: BookWithAuthor[];
  fetchedCursor?: number;
}): [BookWithAuthor[] | [], boolean, () => Promise<any>] => {
  const [books, setBooks] = useState<BookWithAuthor[] | []>(fetchedBooks);
  const [cursor, setCursor] = useState<number | undefined>(fetchedCursor);
  const [isComplete, setIsComplete] = useState(false);

  const handleFetch = async () => {
    const results = await fetchCursoredBooks({ cursorParams: cursor });

    if (!results.books.length) {
      setIsComplete(true);
      return;
    }

    setBooks((prevState: any) => [...prevState, ...results.books]);
    setCursor(results.newCursor);
  };

  return [books, isComplete, handleFetch];
};
