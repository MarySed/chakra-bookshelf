import { Flex, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { useSession } from 'next-auth/client';
import { PostWithAuthor } from 'types/types';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: { post },
  };
};

// Full page view of a user's social post. Note: different than reviews.
const Post = ({ post }: { post: PostWithAuthor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [session] = useSession();

  const userCanEdit = post.author?.email === session?.user?.email;

  const handlePublish = async () => {
    setIsLoading(true);

    try {
      await fetch(`/api/publish/${post.id}`, {
        method: 'PUT',
      });

      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Flex
        direction="column"
        w="100%"
        h="100%"
        py={12}
        px={{ base: 6, md: 12 }}
        bg={useColorModeValue('base.inverted', 'gray.800')}
        borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
        borderTopWidth={0}
        rounded={6}
        borderWidth={1}
      >
        <Flex gridGap={4} wrap="wrap" justifyContent="space-between" w="100%" mb={12}>
          <Heading size="2xl" as="h1">
            {post.title}
          </Heading>

          <Flex gridGap={2}>
            {userCanEdit && !post.published && (
              <Button
                bg={'rainbow.blue'}
                color={'base.inverted'}
                _hover={{ bg: 'rainbow.indigo' }}
                maxW="md"
                onClick={handlePublish}
                isLoading={isLoading}
              >
                Publish Story
              </Button>
            )}
            {userCanEdit && (
              <Button colorScheme="red" maxW="md" variant="solid" onClick={handleDelete} isLoading={isLoading}>
                Delete Story
              </Button>
            )}
          </Flex>
        </Flex>
        <Heading size="lg" as="sub" fontWeight="thin" mb={12}>
          By {post.author?.name}
        </Heading>

        <Text fontSize="lg" mb={12} whiteSpace="pre-line">
          {post?.content}
        </Text>
      </Flex>
    </Layout>
  );
};

export default Post;
