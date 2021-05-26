import { useColorModeValue, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { isRouteActive } from 'utilities/utils';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({
  to,
  children,
  hoverColor = 'rainbow.blue',
  fontSize = '1rem',
}: {
  to: string;
  children: ReactNode;
  hoverColor?: string;
  fontSize?: string;
}) => {
  const router = useRouter();

  const currentRoute = router.asPath;
  const isRouteMatch = isRouteActive(to, currentRoute);

  return (
    <NextLink href={to}>
      <Link
        href={to}
        fontWeight="bold"
        color={useColorModeValue(isRouteMatch ? 'gray.300' : 'base', isRouteMatch ? 'gray.100' : 'base.inverted')}
        _hover={{ color: isRouteMatch ? 'gray.100' : hoverColor }}
        _active={{ color: hoverColor }}
        _focus={{ outline: 'none' }}
        cursor={isRouteMatch ? 'not-allowed' : 'pointer'}
        variant="link"
        rounded="md"
        pointerEvents={isRouteMatch ? 'none' : 'all'}
        fontSize={fontSize}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default NavLink;
