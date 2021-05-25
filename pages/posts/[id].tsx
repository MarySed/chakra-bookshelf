import { Flex, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { useSession } from 'next-auth/client';
import { PostWithAuthor } from 'types/types';

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
  const [session, loading] = useSession();

  const userCanEdit = post.author?.email === session?.user?.email;

  const handlePublish = async () => {
    // setLoading(true);

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
        p={12}
        bg={useColorModeValue('base.inverted', 'gray.800')}
        width="100%"
        rounded={6}
        borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
        borderWidth={1}
      >
        <Heading size="2xl" as="h1" mb={2}>
          {post.title}
        </Heading>
        <Heading size="lg" as="sub" mb={12} fontWeight="thin">
          By {post.author?.name}
        </Heading>
        <Text fontSize="lg" mb={12}>
          {post?.content}
        </Text>
        <Flex gridGap={6} wrap="wrap">
          {userCanEdit && !post.published && (
            <Button
              bg={'main'}
              color={'base.inverted'}
              _hover={{ bg: 'main.dark' }}
              maxW="md"
              onClick={handlePublish}
              isLoading={loading}
            >
              Publish Story
            </Button>
          )}
          {userCanEdit && (
            <Button colorScheme="gray" maxW="md" variant="outline" onClick={handleDelete} isLoading={loading}>
              Delete Story
            </Button>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Post;
