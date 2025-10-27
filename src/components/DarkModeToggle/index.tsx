import { Switch, Text, Flex } from '@radix-ui/themes';

export function DarkModeToggle({ isDark, setIsDark }: { isDark: boolean; setIsDark: (checked: boolean) => void }) {
  return (
    <Flex style={{ marginLeft: 'auto' }} align="center" gap="2">
      <Text>{isDark ? 'Dark' : 'Light'} Mode</Text>
      <Switch checked={isDark} onCheckedChange={(checked) => setIsDark(checked)} />
    </Flex>
  );
}
