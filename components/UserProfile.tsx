import { Flex } from '@chakra-ui/layout';
import { Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import React, { SyntheticEvent } from 'react';

// If content is empty, default to empty string
const UserProfile = ({
  isLoading,
  content = '',
  handleChange,
  handleEdit,
  handleDelete,
}: {
  isLoading: boolean;
  content?: string;
  handleChange: (val: string) => void;
  handleEdit: ({ content, event }: { content: string; event: SyntheticEvent }) => void;
  handleDelete: () => void;
}) => {
  return (
    <>
      <FormControl id="content" mb={6}>
        <FormLabel pl={3} fontSize="xx-large">
          Edit Profile
        </FormLabel>
        <Textarea
          minH="60vh"
          p={4}
          variant="unstyled"
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Introduce yourself!"
        ></Textarea>
      </FormControl>

      <Flex gridGap={6} wrap="wrap">
        <>
          <Button
            alignSelf="flex-end"
            bg={'main'}
            color={'base.inverted'}
            _hover={{ bg: 'main.dark' }}
            type="submit"
            maxW="lg"
            onClick={(e) => handleEdit({ event: e, content: content })}
            isLoading={isLoading}
            disabled={!content}
          >
            Update profile
          </Button>

          <Button
            colorScheme="gray"
            type="submit"
            maxW="lg"
            onClick={handleDelete}
            isLoading={isLoading}
            disabled={!content}
          >
            Delete profile
          </Button>
        </>
      </Flex>
    </>
  );
};

export default UserProfile;
