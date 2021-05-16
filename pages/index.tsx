import prisma from 'lib/prisma';
import Layout from 'components/Layout';
import { PostProps } from './p/[id]';
import Post from 'components/Post';
import { Heading, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { useSession } from 'next-auth/client';
import UserCard from 'components/UserCard';

// TODO: Eventually implement pagination. Not sure if I want to do offset or cursor based.
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
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem colSpan={{ base: 5, lg: 4 }} mb={6}>
            <Flex direction="column" gridGap={4}>
              {feed &&
                feed.map((post) => {
                  return <Post key={post.id} post={post} />;
                })}
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 5, lg: 1 }}>
            <UserCard session={session} />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default App;
