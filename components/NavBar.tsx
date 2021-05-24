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
  Skeleton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import NavLink from 'components/NavLink';
import { isRouteActive } from 'utilities/utils';

const NavBar = () => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const userName = session?.user?.name ?? 'Guest';

  //@ts-expect-error will fix these errors later
  const userId = session?.user?.id ?? undefined;

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
              <NavLink route={router.pathname} to="/posts/new" variant="solid" isLoading={loading}>
                Write a post
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems="center" gridGap={3}>
            <Skeleton isLoaded={!loading}>
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
            </Skeleton>

            <IconButton
              bg={useColorModeValue('base.inverted', 'base')}
              size="md"
              icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
            />

            <Menu>
              <MenuButton as="button" rounded="full" cursor="pointer">
                <Avatar name={userName} src={session?.user?.image ?? ''} size="sm" />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem
                    // Disable profile button if user is not signed in.
                    isDisabled={!userId || isRouteActive(`/users/${userId}`, router.asPath)}
                    onClick={() => (userId ? router.push(`/users/${userId}`) : undefined)}
                  >
                    {userName}
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />

                {/* Display links to bookshelves and reviews if user is logged in */}
                {userId && (
                  <>
                    <MenuItem
                      isDisabled={isRouteActive(`/users/${userId}/bookshelves/list`, router.asPath)}
                      onClick={() => router.push(`/users/${userId}/bookshelves/list`)}
                    >
                      Bookshelves
                    </MenuItem>
                    {/* TODO: Add reviews  link */}
                    <MenuItem>Reviews</MenuItem>{' '}
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* Hamburger menu for mobile devices & small screens */}
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
                  <NavLink route={router.pathname} to="/posts/new" variant="solid">
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
