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
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import NavLink from 'components/NavLink';

const NavBar = () => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Box bg={useColorModeValue('base.inverted', 'base')} mb={12} px={{ base: 6, lg: 12 }} boxShadow="md">
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
            <Box textColor="main">{'BOOKSHELF'}</Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink route={router.pathname} to="/" colorScheme="gray">
                Timeline
              </NavLink>
              <NavLink route={router.pathname} to="/drafts" colorScheme="gray">
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
                  bg="base.900"
                  color="base.inverted"
                  _hover={{ bg: 'base.800' }}
                  isLoading={loading}
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  onClick={() => signIn()}
                  variant="outline"
                  bg="base.900"
                  color="base.inverted"
                  _hover={{ bg: 'base.800' }}
                  isLoading={loading}
                >
                  Sign in
                </Button>
              )}
            </HStack>

            <IconButton
              bg={useColorModeValue('base.inverted', 'base')}
              size="md"
              icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
            />

            <Menu>
              <MenuButton as="button" rounded="full" cursor="pointer">
                <Avatar name={session?.user?.name ?? ''} src={session?.user?.image ?? ''} size="sm" />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {session ? (
                <>
                  <Button
                    onClick={() => signOut()}
                    isLoading={loading}
                    bg="base.900"
                    color="base.inverted"
                    _hover={{ bg: 'base.800' }}
                  >
                    Sign out
                  </Button>
                  <NavLink route={router.pathname} to="/" colorScheme="gray">
                    Timeline
                  </NavLink>
                  <NavLink route={router.pathname} to="/drafts" colorScheme="gray">
                    Drafts
                  </NavLink>
                  <NavLink route={router.pathname} to="/create" variant="solid">
                    Write a post
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink route={router.pathname} to="/" colorScheme="gray">
                    Timeline
                  </NavLink>
                  <Button
                    onClick={() => signIn()}
                    isLoading={loading}
                    bg="base.900"
                    color="base.inverted"
                    _hover={{ bg: 'base.800' }}
                  >
                    Sign in
                  </Button>
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
