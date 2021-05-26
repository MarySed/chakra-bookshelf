import { Flex, Heading, Link, Text, useColorModeValue, Avatar, Divider, Box } from '@chakra-ui/react';
import { PostWithAuthor } from 'types/types';

const Post = ({ post }: { post: PostWithAuthor }) => {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      width="100%"
      height="250px"
      rounded={6}
      overflow="hidden"
      borderColor={useColorModeValue('base.a100', 'blackAlpha.100')}
      p={{ base: 6, md: 12 }}
      gridGap={8}
      borderWidth={1}
      transition="ease-in"
      transitionDuration="0.2s"
      _hover={{ boxShadow: 'lg', borderColor: 'gray.300' }}
    >
      <Avatar size="lg" src={post.author?.image ?? ''} display={{ base: 'none', md: 'block' }} />
      <Box height="20vh" display={{ base: 'none', md: 'block' }}>
        <Divider orientation="vertical" color="rainbow.pink" height="100%" />
      </Box>
      <Flex flex="1" flexDirection="column" justifyContent="center" overflow="hidden" height="100%">
        <Heading marginY={1} as="h1" size="xl">
          <Link
            textDecoration="none"
            _focus={{ outline: 'none' }}
            _hover={{ textDecoration: 'none', textColor: 'rainbow.blue' }}
            href={`/posts/${post.id}`}
          >
            {post.title}
          </Link>
        </Heading>
        <Heading as="sub" color="rainbow.indigo" fontWeight="thin" size="md" mb={6}>
          By {post.author?.name ?? 'Unknown author'}
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue('gray.700', 'gray.200')}
          fontSize="md"
          textOverflow="ellipsis"
          whiteSpace="pre"
          overflow="hidden"
          maxHeight="100px"
        >
          {post?.content ?? ''}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Post;
