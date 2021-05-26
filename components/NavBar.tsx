import { useSession } from 'next-auth/client';
import { Box, Flex, HStack, IconButton, useColorModeValue, useDisclosure, Stack, Skeleton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavLink from 'components/NavLink';
import ToggleColorModeButton from './ToggleColorModeButton';
import UserMenuDropdown from './UserMenuDropdown';
import React from 'react';
import UserAuthButton from './UserAuthButton';

const NavBar = () => {
  const [session, loading] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue('base.inverted', 'base')}
        mb={12}
        px={{ base: 6, lg: 12 }}
        boxShadow="md"
        position="relative"
      >
        <Flex height={16} alignItems="center" justifyContent="space-between">
          {/* Hamburger dropdown for mobile display */}
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={2} alignItems="center">
            <HStack as="nav" spacing={2} display={{ base: 'none', md: 'flex' }} gridGap={4}>
              <NavLink to="/">Timeline</NavLink>
              <NavLink to="/drafts" hoverColor="rainbow.pink">
                Drafts
              </NavLink>
              <NavLink to="/books/list" hoverColor="rainbow.yellow">
                Books
              </NavLink>
              <NavLink to="/posts/new" hoverColor="rainbow.green">
                Write a post
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems="center" gridGap={3}>
            <Skeleton isLoaded={!loading}>
              <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
                <ToggleColorModeButton />
                <UserMenuDropdown />
              </HStack>
            </Skeleton>
          </Flex>
        </Flex>

        {/* Hamburger menu for mobile devices & small screens */}
        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {session ? (
                <>
                  {/* TODO: Updated togglecolormodebutton so it looks better in mobile screen */}
                  {/* <ToggleColorModeButton /> */}
                  <NavLink to="/">Timeline</NavLink>
                  <NavLink to="/drafts" hoverColor="rainbow.pink">
                    Drafts
                  </NavLink>
                  <NavLink to="/books/list" hoverColor="rainbow.yellow">
                    Books
                  </NavLink>
                  <NavLink to="/posts/new" hoverColor="rainbow.green">
                    Write a post
                  </NavLink>
                  <UserAuthButton />
                </>
              ) : (
                <>
                  <UserAuthButton />
                  <NavLink to="/">Timeline</NavLink>
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
