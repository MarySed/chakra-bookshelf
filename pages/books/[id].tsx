import { GetServerSideProps } from 'next';
import { BookWithAuthor } from 'types/types';
import prisma from 'lib/prisma';
import Layout from 'components/Layout';
import {
  Flex,
  Heading,
  useColorModeValue,
  Box,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/client';
import AddBookToShelfModal from 'components/AddBookToShelfModal';
import { Bookshelf } from '.prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  const book = await prisma.book.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: true,
    },
  });

  const bookshelves = await prisma.bookshelf.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });

  return {
    props: { bookshelves, book },
  };
};

// TODO: Update page layout once connected with OpenLibrary API & books have details
const BookPage = ({ book, bookshelves }: { book: BookWithAuthor; bookshelves: Bookshelf[] }) => {
  console.log(book, 'book');

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <Grid templateColumns="repeat(5, 1fr)" gridColumnGap={4} gridTemplateRows="auto" height="100%">
        <GridItem colSpan={{ base: 5, lg: 2 }} mb={6}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            p={12}
            bg={useColorModeValue('base.inverted', 'gray.800')}
            width="100%"
            rounded={6}
            borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
            borderWidth={1}
            justifyContent={{ base: 'center', md: 'unset' }}
          >
            <Box>
              <Image width={250} height={350} src={book.image} fallback={<Skeleton height="350px" width="250px" />} />
            </Box>
            <Flex direction="column" ml={{ base: 0, md: 6 }}>
              <Heading as="h1" fontSize="2xl">
                {book.title}
              </Heading>
              <Heading as="h2" fontSize="2xl" fontWeight="thin">
                By {book.author?.fullName ?? 'Unknown author'}
              </Heading>
              <Button variant="ghost" onClick={onOpen} mt="auto">
                Add to bookshelf
              </Button>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 5, lg: 3 }} mb={6}>
          <Flex
            direction="column"
            p={12}
            bg={useColorModeValue('base.inverted', 'gray.800')}
            width="100%"
            rounded={6}
            borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
            borderWidth={1}
          >
            Controls Here
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 5, lg: 5 }} mb={6}>
          <Flex
            direction="column"
            p={12}
            bg={useColorModeValue('base.inverted', 'gray.800')}
            width="100%"
            rounded={6}
            borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
            borderWidth={1}
          >
            Reviews Here
          </Flex>
        </GridItem>
      </Grid>
      <AddBookToShelfModal isOpen={isOpen} onClose={onClose} bookshelves={bookshelves} />
    </Layout>
  );
};

export default BookPage;
