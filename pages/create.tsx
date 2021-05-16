import Layout from 'components/Layout';
import { FormControl, FormLabel, Heading, Input, Button, Textarea, Flex } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [, loading] = useSession();

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
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
      <Flex direction="column" alignItems="center" justifyContent="center" mt={12}>
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
            _hover={{ borderLeftColor: 'purple.300' }}
            _focus={{ borderLeftColor: 'purple.500' }}
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
          colorScheme="purple"
          type="submit"
          maxW="lg"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Create Draft
        </Button>
      </Flex>
    </Layout>
  );
};

export default Create;
