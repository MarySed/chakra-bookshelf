import Layout from 'components/Layout';
import { FormControl, FormLabel, Button, Textarea, Flex, useColorModeValue } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { createBio, editBio } from 'utilities/utils';
import { Session } from 'next-auth';
import Router from 'next/router';

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
      userId: true,
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
  console.log(session, 'I forgot what I wanted the session for lol');

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [body, setBody] = useState(bio?.content ?? '');

  const handleEdit = async ({ event, content }: { event: SyntheticEvent; content: string }) => {
    event.preventDefault();

    setIsLoading(true);

    console.log(bio?.content, 'does bio content exist after being deleted?');
    if (bio?.content) {
      try {
        await editBio({ content: content, userId: userId });
        setIsLoading(false);
        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await createBio({ content: content });
        Router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async ({ event }: { event: SyntheticEvent }) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await fetch(`/api/bio/${userId}`, {
        method: 'DELETE',
      });

      setBody('');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }

    Router.push('/');
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
        <Button
          alignSelf="flex-end"
          bg={'main'}
          color={'base.inverted'}
          _hover={{ bg: 'main.dark' }}
          type="submit"
          maxW="lg"
          onClick={() => setIsEditing(!isEditing)}
          isLoading={isLoading}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
        <FormControl id="content" mb={6}>
          <FormLabel pl={3} fontSize="xx-large">
            Profile
          </FormLabel>
          <Textarea
            cursor={isEditing ? 'text' : 'default'}
            minH="60vh"
            p={4}
            variant="unstyled"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Introduce yourself!"
            // Set Profile textarea to read only if bio content exists, and user is not editing
            isReadOnly={!isEditing}
          ></Textarea>
        </FormControl>

        {/* Only display buttons when editing is true */}
        {isEditing && (
          <Flex gridGap={6} wrap="wrap">
            <>
              <Button
                alignSelf="flex-end"
                bg={'main'}
                color={'base.inverted'}
                _hover={{ bg: 'main.dark' }}
                type="submit"
                maxW="lg"
                onClick={(e) => handleEdit({ event: e, content: body })}
                isLoading={isLoading}
              >
                Update profile
              </Button>
              {bio?.content && (
                <Button
                  colorScheme="gray"
                  type="submit"
                  maxW="lg"
                  onClick={(e) => handleDelete({ event: e })}
                  isLoading={isLoading}
                >
                  Delete profile
                </Button>
              )}
            </>
          </Flex>
        )}
      </Flex>
    </Layout>
  );
};

export default Bio;
