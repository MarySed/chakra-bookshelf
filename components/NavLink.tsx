import { Button, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { isRouteActive } from 'utilities/utils';

const NavLink = ({
  to,
  route,
  children,
  variant = 'ghost',
  colorScheme = 'purple',
  isDisabled = false,
  isLoading = false,
}: {
  to: string;
  route: string;
  variant?: string;
  colorScheme?: string;
  children: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <Link px={2} py={1} rounded="md" _hover={{ textDecoration: 'none' }} href={to} w="100%">
      <Button
        isDisabled={isDisabled ? isDisabled : isRouteActive(to, route)}
        colorScheme={colorScheme}
        variant={variant}
        w="100%"
        isLoading={isLoading}
      >
        {children}
      </Button>
    </Link>
  );
};

export default NavLink;
