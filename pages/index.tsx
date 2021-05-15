import prisma from 'lib/prisma';
import Layout from 'components/Layout';
import { PostProps } from './posts/[id]';
import Post from 'components/Post';
import { Heading, Flex } from '@chakra-ui/layout';
import { useSession } from 'next-auth/client';

export const getServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });

  return {
    props: { feed },
  };
};

const App = ({ feed }: { feed: PostProps[] }) => {
  const [session, loading] = useSession();

  return (
    <>
      <Layout>
        <Heading size="2xl" as="h1" mb={12}>
          {session && !loading ? `Welcome, ${session.user?.name}` : 'Recent updates'}
        </Heading>
        <Flex direction="column" gridGap={4}>
          {feed &&
            feed.map((post) => {
              return <Post key={post.id} post={post} />;
            })}
        </Flex>
      </Layout>
    </>
  );
};

export default App;
