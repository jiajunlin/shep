import type { Meta, StoryObj } from '@storybook/react';
import { TurnGroupCard } from './turn-group-card';

const meta: Meta<typeof TurnGroupCard> = {
  title: 'Features/Chat/TurnGroupCard',
  component: TurnGroupCard,
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
type Story = StoryObj<typeof TurnGroupCard>;

/**
 * Completed turn — defaults to CLOSED. Click the chevron to reveal
 * the `details` slot (raw bubbles, tool events, assistant replies).
 */
export const Default: Story = {
  args: {
    id: 'turn-1',
    title: 'Working on: Fix login bug',
    assistantMessageCount: 2,
    status: 'completed',
    details: (
      <p style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>
        Raw bubbles render here once expanded.
      </p>
    ),
  },
};

/**
 * In-progress turn — defaults to OPEN, showing the `condensed` slot
 * (user request + friendly streaming indicator) per the layered
 * rendering rule in CLAUDE.md. Raw tool events never appear here.
 */
export const InProgress: Story = {
  args: {
    id: 'turn-2',
    title: 'Working on: Add Storybook stories',
    assistantMessageCount: 0,
    status: 'in-progress',
    condensed: (
      <p style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>
        Reading the chat CLAUDE.md before touching TurnGroupCard…
      </p>
    ),
  },
};
