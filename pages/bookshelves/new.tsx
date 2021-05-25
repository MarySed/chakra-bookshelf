import Layout from 'components/Layout';
import { FormControl, FormLabel, Heading, Input, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import Router from 'next/router';
import { useSession } from 'next-auth/client';

// Page for creating bookshelf
const CreateBookshelf = () => {
  const [name, setName] = useState('');

  const [, loading] = useSession();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

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
        Let's make a new bookshelf!
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
        <FormControl id="title" mb={6}>
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
        </FormControl>

        <Button
          bg={'main'}
          color={'base.inverted'}
          _hover={{ bg: 'main.dark' }}
          type="submit"
          maxW="lg"
          onClick={(e) => handleSubmit(e)}
          isLoading={loading}
        >
          Create Bookshelf
        </Button>
      </Flex>
    </Layout>
  );
};

export default CreateBookshelf;
