import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ToggleColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      bg={useColorModeValue('base.inverted', 'base')}
      size="md"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
    />
  );
};

export default ToggleColorModeButton;
