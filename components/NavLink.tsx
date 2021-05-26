import { Button, Box, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { isRouteActive } from 'utilities/utils';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({
  to,
  children,
  isDisabled = false,
  isLoading = false,
  hoverColor = 'rainbow.blue',
}: {
  to: string;
  children: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  hoverColor?: string;
}) => {
  const router = useRouter();

  const currentRoute = router.asPath;

  return (
    <Box px={2} py={1} w="100%">
      <NextLink href={to}>
        <Button
          fontWeight="bold"
          color={useColorModeValue('base', 'base.inverted')}
          _hover={{ color: hoverColor }}
          _focus={{ outline: 'none' }}
          isDisabled={isDisabled ? isDisabled : isRouteActive(to, currentRoute)}
          variant="link"
          rounded="md"
          isLoading={isLoading}
        >
          {children}
        </Button>
      </NextLink>
    </Box>
  );
};

export default NavLink;
