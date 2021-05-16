import { useRouter } from 'next/router';
import { signOut, signIn, useSession } from 'next-auth/client';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  useColorModeValue,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavLink from 'components/NavLink';

const NavBar = () => {
  const [session, loading] = useSession();

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        borderColor={useColorModeValue('gray.100', 'gray.900')}
        borderBottomWidth={1}
        px={4}
        mb={6}
      >
        <Flex height={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            {/* TODO: Replace bookshelf with logo */}
            <Box textColor="purple.400">{'BOOKSHELF'}</Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink route={router.pathname} to="/">
                Timeline
              </NavLink>
              <NavLink route={router.pathname} to="/drafts">
                Drafts
              </NavLink>
              <NavLink route={router.pathname} to="/create" variant="solid" isLoading={loading}>
                Write a post
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems="center" gridGap={3}>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {session ? (
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  colorScheme="purple"
                  isLoading={loading}
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  onClick={() => signIn()}
                  variant="outline"
                  colorScheme="purple"
                  isLoading={loading}
                >
                  Sign in
                </Button>
              )}
            </HStack>
            <Menu>
              <MenuButton as="button" rounded="full" cursor="pointer">
                <Avatar size="sm" />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {session ? (
                <>
                  <Button onClick={() => signOut()} isLoading={loading}>
                    Sign out
                  </Button>
                  <NavLink route={router.pathname} to="/drafts">
                    Drafts
                  </NavLink>
                  <NavLink route={router.pathname} to="/create" variant="solid">
                    Write a post
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink route={router.pathname} to="/api/auth/signin">
                    Sign in
                  </NavLink>
                </>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavBar;
