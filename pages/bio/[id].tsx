import Layout from 'components/Layout';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { createBio, editBio } from 'utilities/utils';
import { Session } from 'next-auth';
import Router from 'next/router';
import UserProfile from 'components/UserProfile';

// TODO: This was a test of functionality. Move into new directory and update behavior
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const userId = Number(params?.id);
  const session = await getSession({ req });

  const bio = await prisma.bio.findUnique({
    where: {
      userId: userId,
    },

    select: {
      content: true,
      id: true,
    },
  });

  return {
    props: {
      bio,
      session,
      userId,
    },
  };
};

type Props = {
  bio: { content?: string; id: number };
  session: Session | null;
  userId: number;
};

const Bio = ({ bio, session, userId }: Props) => {
  console.log(session?.expires, 'I forgot what I wanted the session for lol');

  const [isLoading, setIsLoading] = useState(false);
  const [body, setBody] = useState(bio?.content ?? '');

  const handleEdit = async ({ event, content }: { event: SyntheticEvent; content: string }) => {
    event.preventDefault();

    setIsLoading(true);

    if (bio?.content) {
      try {
        await editBio({ content: content, id: userId });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await createBio({ content: content });
      } catch (error) {
        console.error(error);
      }
    }

    Router.push(`/users/${userId}`);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await fetch(`/api/bio/${userId}`, {
        method: 'DELETE',
      });

      setBody('');
    } catch (error) {
      console.error(error);
    }

    Router.push(`/users/${userId}`);
  };

  return (
    <Layout>
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
        <UserProfile
          handleChange={setBody}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isLoading={isLoading}
          content={body}
        />
      </Flex>
    </Layout>
  );
};

export default Bio;
