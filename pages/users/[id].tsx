import Layout from 'components/Layout';
import { FormControl, FormLabel, Heading, Button, Textarea, Flex, useColorModeValue } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { createBio } from 'utilities/utils';

// TODO: Currently this is a work in progress. Will update to match design and fucntionality ideas soon.
export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await getSession({ req });

  // Consider removing this check.
  if (!session) {
    res.statusCode = 403;

    return {
      props: {
        bio: {
          content: '',
          session: null,
        },
      },
    };
  }

  const bio = await prisma.bio.findUnique({
    where: {
      userId: Number(params?.id) || -1,
    },

    select: {
      content: true,
      userId: true,
      id: true,
    },
  });

  return {
    props: {
      bio,
      session,
    },
  };
};

const Bio = ({ bio, session }: { bio: { content?: string; userId?: number; id: number }; session: any }) => {
  console.log(session, 'will come back to you');
  const [isLoading, setIsLoading] = useState(false);
  const [body, setContent] = useState(bio?.content ?? '');

  const handleCreate = async ({ event, content }: { event: SyntheticEvent; content: string }) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with SWR
      await createBio({ content: content });
    } catch (error) {
      console.error(error);
    }

    Router.push('/');
  };

  const handleDelete = async ({ event }: { event: SyntheticEvent }) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await fetch(`/api/bio/${bio?.id}`, {
        method: 'DELETE',
      });

      Router.push('/');
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
        <>
          <FormControl id="content" mb={6}>
            <FormLabel pl={3} fontSize="xx-large">
              Body
            </FormLabel>
            <Textarea
              minH="60vh"
              p={4}
              variant="unstyled"
              value={body}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
            ></Textarea>
          </FormControl>
          <Flex gridGap={6} wrap="wrap">
            <Button
              bg={'main'}
              color={'base.inverted'}
              _hover={{ bg: 'main.dark' }}
              type="submit"
              maxW="lg"
              onClick={(e) => handleCreate({ event: e, content: body })}
              isLoading={isLoading}
            >
              {bio?.content ? 'Create Bio' : 'Update Bio'}
            </Button>
            {bio?.content && (
              <Button
                colorScheme="gray"
                type="submit"
                maxW="lg"
                onClick={(e) => handleDelete({ event: e })}
                isLoading={isLoading}
              >
                Delete Bio
              </Button>
            )}
          </Flex>
        </>
      </Flex>
    </Layout>
  );
};

export default Bio;
