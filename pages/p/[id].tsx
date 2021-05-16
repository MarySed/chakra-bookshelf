import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { useSession } from 'next-auth/client';

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

export type PostProps = {
  id: number;
  author?: { name: string; email?: string };
  content?: string;
  title: string;
  published: boolean;
  authorId: number;
};

// Full page view of a user's post/review of a book
const Post = ({ post }: { post: PostProps }) => {
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
      await fetch(`api/posts/${post.id}`, {
        method: 'DELETE',
      });

      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Flex direction="column" maxW="80vw">
        <Heading size="2xl" as="h1" mb={12}>
          {post.title}
        </Heading>
        <Text fontSize="lg" mb={12}>
          {post?.content}
        </Text>
        <Flex gridGap={6} wrap="wrap">
          {userCanEdit && !post.published && (
            <Button colorScheme="purple" maxW="md" onClick={handlePublish} isLoading={loading}>
              Publish Story
            </Button>
          )}
          {userCanEdit && (
            <Button
              colorScheme="red"
              maxW="md"
              variant="outline"
              onClick={handleDelete}
              isLoading={loading}
            >
              Delete Story
            </Button>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Post;
