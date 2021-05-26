import Layout from 'components/Layout';
import { FormControl, FormLabel, Heading, Input, Button, Textarea, Flex, useColorModeValue } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';

// TODO: Error handling & notifications for users. Create some toasts lol
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    setIsLoading(true);
    try {
      const body = { title, content };

      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Navigate to drafts page once you create a draft
      await router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Heading size="lg" as="h1" mb={3}>
        What's on your mind?
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
            Title
          </FormLabel>
          <Input
            borderRadius={0}
            borderLeft="2px solid"
            borderLeftColor="white"
            p={4}
            variant="unstyled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            _hover={{ borderLeftColor: 'base.300' }}
            _focus={{ borderLeftColor: 'base.500' }}
            _active={{ borderLeftColor: 'base.500' }}
            placeholder="Title"
          />
        </FormControl>

        <FormControl id="content" mb={6}>
          <FormLabel pl={3} fontSize="xx-large">
            Body
          </FormLabel>
          <Textarea
            minH="60vh"
            p={4}
            variant="unstyled"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
          ></Textarea>
        </FormControl>

        <Button
          bg="rainbow.green"
          color={'base.inverted'}
          _hover={{ bg: 'rainbow.greendark' }}
          type="submit"
          maxW="lg"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Create Draft
        </Button>
      </Flex>
    </Layout>
  );
};

export default CreatePost;
