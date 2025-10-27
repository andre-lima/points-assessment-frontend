import type { AxiosError } from 'axios';
import { Button, Card, Code, Text } from '@radix-ui/themes';

interface ErrorMessageProps {
  error: AxiosError;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const status = error.response?.status;
  const message = error.message || 'An unexpected error occurred.';

  return (
    <Card>
      <Text as="div" size="3" weight="bold" mb="2">
        Something went wrong
      </Text>
      <Text as="p" size="2" color="gray">
        {message}
      </Text>

      {status && (
        <Text as="p" size="2" color="gray">
          <Code>Status: {status}</Code>
        </Text>
      )}

      {onRetry && (
        <Button color="red" variant="soft" size="2" mt="3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Card>
  );
}
