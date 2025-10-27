import { Box, Flex, Heading, Text } from '@radix-ui/themes';

export const Title = () => {
  return (
    <Box py="2" style={{ backgroundColor: 'var(--blue-a10)', borderRadius: 'var(--radius-3)' }}>
      <Flex align="center" justify="between" px="6" py="4">
        <Heading>Points Revenue Agency (PRA)</Heading>
        <Text>Andre D. Lima / 2025</Text>
      </Flex>
    </Box>
  );
};
