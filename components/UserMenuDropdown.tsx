import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup, Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { isRouteActive } from 'utilities/utils';
import UserAuthButton from './UserAuthButton';

const UserMenuDropdown = () => {
  const [session] = useSession();
  const router = useRouter();

  // @ts-expect-error Ok fine I am going to fix the session object
  const userId = session?.user?.id ?? null;
  const userName = session?.user?.name ?? 'Guest';

  return (
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
            <MenuItem>Reviews</MenuItem>
            <Flex p={2}>
              <UserAuthButton />
            </Flex>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenuDropdown;
