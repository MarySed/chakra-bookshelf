import Layout from 'components/Layout';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Flex, Heading, Text } from '@chakra-ui/react';
import Post from 'components/Post';
import { PostWithAuthor } from 'types/types';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  // Drafts page cannot be accessed if the user is not logged in
  if (!session) {
    res.statusCode = 403;

    return {
      props: {
        drafts: [],
      },
    };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: {
        email: session?.user?.email,
      },
      published: false,
    },

    include: {
      author: {
        select: {
          name: true,
        },
      },
    },

    orderBy: {
      id: 'desc',
    },
  });

  return {
    props: {
      drafts,
      session,
    },
  };
};

type Props = {
  drafts: PostWithAuthor[];
  session: any;
};

const Drafts = ({ drafts, session }: Props) => {
  return (
    <Layout>
      <Heading size="lg" as="h1" mb={3}>
        Drafts
      </Heading>
      <Flex direction="column" gridGap={4}>
        {session ? (
          drafts &&
          drafts.map((draft) => {
            return <Post key={draft.id} post={draft} />;
          })
        ) : (
          <Text>Please log in to view this page...</Text>
        )}
      </Flex>
    </Layout>
  );
};

export default Drafts;
