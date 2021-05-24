import { Box, Flex, Heading, useColorModeValue, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { BookWithAuthor } from 'types/types';

const Book = ({ book }: { book: BookWithAuthor }) => {
  return (
    <Flex
      textAlign="center"
      width="200px"
      minW="200px"
      direction="column"
      mx={4}
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
      borderWidth={1}
      transition="ease-in"
      transitionDuration="0.2s"
      _hover={{ boxShadow: 'lg', borderColor: 'gray.300' }}
      cursor="pointer"
    >
      <Image width="100%" height="250px" src={book.image ?? ''} />
      <Box p={4}>
        <Heading as="h2" mb={1} fontSize="lg">
          {book.title}
        </Heading>
        <Text>By {book.author?.fullName}</Text>
      </Box>
    </Flex>
  );
};

export default Book;
