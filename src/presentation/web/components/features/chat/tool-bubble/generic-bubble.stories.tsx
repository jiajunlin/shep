import type { Meta, StoryObj } from '@storybook/react';
import { GenericToolBubble } from './generic-bubble';

const meta: Meta<typeof GenericToolBubble> = {
  title: 'Features/Chat/ToolBubble/GenericToolBubble',
  component: GenericToolBubble,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GenericToolBubble>;

/** Parsed-args case — the tool's arguments render as pretty-printed JSON. */
export const Default: Story = {
  args: {
    name: 'Read',
    detail: '{"path":"src/presentation/web/components/features/chat/turn-group-card.tsx"}',
    parsed: { path: 'src/presentation/web/components/features/chat/turn-group-card.tsx' },
    outputBody: null,
  },
};

/** Paired input + output — both sections render in one card, labeled INPUT / OUTPUT. */
export const WithOutput: Story = {
  args: {
    name: 'Bash',
    detail: '{"command":"pnpm test:unit"}',
    parsed: { command: 'pnpm test:unit' },
    outputBody: '✓ 42 tests passed\n✓ 0 tests failed\n\nCoverage: 87%',
  },
};
