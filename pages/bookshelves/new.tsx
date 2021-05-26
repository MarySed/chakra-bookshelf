import Layout from 'components/Layout';
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Flex,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import prisma from 'lib/prisma';
import { MAX_BOOK_FETCH } from 'constants/constants';
import { BookWithAuthor } from 'types/types';
import BookGrid from 'components/BookGrid';

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

// Page for creating bookshelf
// TODO: create selectable book component, and allow users to add books as they make their bookshelves
const CreateBookshelf = ({ books, newCursor }: { books: BookWithAuthor[]; newCursor: number }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  // const [bookIds, setBookIds] = useState<number[]>([]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name.length) {
      return;
    }

    try {
      const body = { name };

      await fetch('/api/bookshelves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }

    Router.push('/');
  };

  return (
    <Layout>
      <Heading size="lg" as="h1" mb={3}>
        Let's make a new bookshelf! [You can currently only add books by creating a bookshelf (name only) then manually
        adding them later.]
      </Heading>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w="100%"
        p={12}
        bg={useColorModeValue('base.inverted', 'gray.800')}
        width="100%"
        rounded={6}
        borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
        borderWidth={1}
      >
        <FormControl id="title" mb={6} isInvalid={!name.length}>
          <FormLabel pl={3} fontSize="xx-large">
            Name
          </FormLabel>
          <Input
            borderRadius={0}
            borderLeft="2px solid"
            borderLeftColor="white"
            p={4}
            variant="unstyled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            _hover={{ borderLeftColor: 'base.300' }}
            _focus={{ borderLeftColor: 'base.500' }}
            _active={{ borderLeftColor: 'base.500' }}
            placeholder="Title"
          />
          <FormErrorMessage>Please enter a name</FormErrorMessage>
        </FormControl>

        <Button
          bg="rainbow.blue"
          color="base.inverted"
          _hover={{ bg: 'rainbow.indigo' }}
          type="submit"
          maxW="lg"
          onClick={(e) => handleSubmit(e)}
          isLoading={loading}
          mb={12}
          isDisabled={!name.length}
        >
          Create Bookshelf
        </Button>
        <Heading as="h2" size="xl" mb={8}>
          Add Some Books
        </Heading>
        <BookGrid newCursor={newCursor} fetchedBooks={books} />
      </Flex>
    </Layout>
  );
};

export default CreateBookshelf;
