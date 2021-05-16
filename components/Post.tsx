import { Flex, Heading, Box, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { PostProps } from 'pages/p/[id]';

const Post = ({ post }: { post: PostProps }) => {
  return (
    <Flex
      width={[
        '100%', // 0-30em
        '80%', // 30em-48em
        '80%', // 48em-62em
        '80%', // 62em+
      ]}
      borderColor="gray.300"
      p={12}
      direction="column"
      borderWidth={1}
      transition="ease-in"
      transitionDuration="0.2s"
      _hover={{ boxShadow: 'lg' }}
    >
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: '3', sm: '0' }}
      >
        <Heading marginY={1} as="h1" size="xl">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: 'none', textColor: 'purple.500' }}
            href={`/p/${post.id}`}
          >
            {post.title}
          </Link>
        </Heading>
        <Heading as="sub" color="gray.900" fontWeight="thin" size="md" mb={6}>
          By {post.author?.name ?? 'Unknown author'}
        </Heading>
        <Text as="p" marginTop="2" color={useColorModeValue('gray.700', 'gray.200')} fontSize="md">
          {post?.content ?? ''}
        </Text>
      </Box>
    </Flex>
  );
};

export default Post;
