import { Button, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { isRouteActive } from 'utilities/utils';

const NavLink = ({
  to,
  route,
  children,
  variant = 'ghost',
  colorScheme,
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
      {/* TODO: Create a custom button with accent color theme as default.
      
      This code here means that if the user does not manually use one of 
      ChakraUI's colorSchemes, then the "default" brand color button will be 
      displayed */}

      {colorScheme ? (
        <Button
          isDisabled={isDisabled ? isDisabled : isRouteActive(to, route)}
          colorScheme={colorScheme}
          variant={variant}
          w="100%"
          isLoading={isLoading}
        >
          {children}
        </Button>
      ) : (
        <Button
          // TODO: Create custom button component
          bg={'main'}
          color={'base.inverted'}
          _hover={{ bg: 'main.dark' }}
          isDisabled={isDisabled ? isDisabled : isRouteActive(to, route)}
          variant={variant}
          w="100%"
          isLoading={isLoading}
        >
          {children}
        </Button>
      )}
    </Link>
  );
};

export default NavLink;
