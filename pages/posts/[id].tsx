import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Router from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { post },
  };
};

export type PostProps = {
  id: number;
  author?: { name: string; email?: string };
  content?: string;
  title: string;
  published: boolean;
};

// Full page view of a user's post/review of a book
const Post = ({ post }: { post: PostProps }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await fetch(`/api/publish/${post.id}`, {
        method: 'PUT',
      });
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  console.log(post, 'post');
  return (
    <Layout>
      <Flex direction="column" maxW="80vw">
        <Heading size="2xl" as="h1" mb={12}>
          {post.title}
        </Heading>
        <Text fontSize="lg" mb={12}>
          {post?.content}
        </Text>
        {!post.published && (
          <Button colorScheme="purple" maxW="md" onClick={handleSubmit} isLoading={loading}>
            Publish Story
          </Button>
        )}
      </Flex>
    </Layout>
  );
};

export default Post;
