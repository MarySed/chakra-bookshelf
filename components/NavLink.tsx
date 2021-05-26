import { useColorModeValue, Link, Spinner } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  const currentRoute = router.asPath;
  const isRouteMatch = isRouteActive(to, currentRoute);

  const color = useColorModeValue(isRouteMatch ? 'gray.300' : 'base.700', isRouteMatch ? 'gray.100' : 'base.inverted');

  // Crappy solution to making loading evident to users
  if (loading) {
    return <Spinner />;
  }

  return (
    <NextLink href={to}>
      <Link
        onClick={() => setLoading(true)}
        fontWeight="bold"
        color={color}
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
