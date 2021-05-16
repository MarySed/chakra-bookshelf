import { Flex, Heading, Box, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { PostProps } from 'pages/p/[id]';

const Post = ({ post }: { post: PostProps }) => {
  return (
    <Flex
      width={{ base: '100%', lg: '90%' }}
      borderColor="gray.300"
      p={12}
      direction="column"
      borderWidth={1}
      transition="ease-in"
      transitionDuration="0.2s"
      _hover={{ boxShadow: 'lg', borderColor: 'purple.300' }}
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
        <Heading as="sub" color="purple.500" fontWeight="thin" size="md" mb={6}>
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
