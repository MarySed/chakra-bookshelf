import { Flex, Heading, Box, Link, Text, useColorModeValue, Divider } from '@chakra-ui/react';
import { BookshelfWithBooks } from 'types/types';

type Props = {
  shelf: BookshelfWithBooks;
};

const BookList = ({ shelf }: Props) => {
  console.log(shelf, 'SHELF');

  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      width="100%"
      // rounded={6}
      // borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
      paddingY={12}
      paddingRight={12}
      direction="column"
      // borderWidth={1}
      // transition="ease-in"
      // transitionDuration="0.2s"
      // _hover={{ boxShadow: 'lg', borderColor: 'gray.300' }}
    >
      <Box display="flex" flex="1" flexDirection="column" justifyContent="center" marginTop={{ base: '3', sm: '0' }}>
        <Heading paddingY={2} as="h1" size="xl">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: 'none', textColor: 'main' }}
            href={`/books/${shelf.id}`}
          >
            {shelf.name}
          </Link>
        </Heading>
        <Divider color="gray.900" mb={6} />
        <Flex>
          {/* TODO: Create Book component to be returned by booklist */}
          {shelf.books.map((book) => {
            console.log(book, 'BOOK');
            return (
              <Flex key={book.id} direction="column">
                <Heading as="h2" mb={2} fontSize="lg">
                  {book.title}
                </Heading>
                <Text>By {book.author?.fullName}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default BookList;
