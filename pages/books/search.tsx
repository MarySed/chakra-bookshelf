import { Flex, Text, Image, Skeleton } from '@chakra-ui/react';
import BookSearch from 'components/BookSearch';
import Layout from 'components/Layout';
import { useState } from 'react';
import { constructCoverString } from 'utilities/utils';

// Page for users to search books using openLibrary API and add results to their personal dbs. WIP
const Books = () => {
  const [books, setBooks] = useState([]);

  console.log(books, 'books');
  return (
    <Layout>
      <Flex direction="column" height="100%" alignItems="flex-start" justifyContent="flex-start" gridGap={7}>
        <BookSearch setResults={setBooks} />
        {books.length
          ? books.map((book: any) => {
              console.log(book['cover_i'], 'does cover exist?');
              return (
                <Flex key={book?.key} mb={4}>
                  <Image
                    width={250}
                    height={350}
                    src={constructCoverString({ id: book['cover_i'] })}
                    fallback={<Skeleton width={250} height={350} />}
                  />
                  <Text>{book.title}</Text>
                </Flex>
              );
            })
          : null}
      </Flex>
    </Layout>
  );
};

export default Books;
