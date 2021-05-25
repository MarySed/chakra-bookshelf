import { Flex, Heading, Box, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { PostWithAuthor } from 'types/types';

const Post = ({ post }: { post: PostWithAuthor }) => {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      width="100%"
      rounded={6}
      borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
      p={12}
      direction="column"
      borderWidth={1}
      transition="ease-in"
      transitionDuration="0.2s"
      _hover={{ boxShadow: 'lg', borderColor: 'gray.300' }}
    >
      <Box display="flex" flex="1" flexDirection="column" justifyContent="center" marginTop={{ base: '3', sm: '0' }}>
        <Heading marginY={1} as="h1" size="xl">
          <Link textDecoration="none" _hover={{ textDecoration: 'none', textColor: 'main' }} href={`/p/${post.id}`}>
            {post.title}
          </Link>
        </Heading>
        <Heading as="sub" color="main" fontWeight="thin" size="md" mb={6}>
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
