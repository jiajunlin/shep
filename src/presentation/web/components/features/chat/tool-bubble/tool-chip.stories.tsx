import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToolChip } from './tool-chip';

const meta: Meta<typeof ToolChip> = {
  title: 'Features/Chat/ToolBubble/ToolChip',
  component: ToolChip,
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
type Story = StoryObj<typeof ToolChip>;

/** Interactive wrapper so `expanded` actually toggles in the canvas. */
function ToggleableChip(props: React.ComponentProps<typeof ToolChip>) {
  const [expanded, setExpanded] = useState(props.expanded);
  return <ToolChip {...props} expanded={expanded} onToggle={() => setExpanded((v) => !v)} />;
}

/** Default tint, collapsed. */
export const Default: Story = {
  render: (args) => <ToggleableChip {...args} />,
  args: {
    name: 'Read',
    summary: 'src/presentation/web/components/features/chat/turn-group-card.tsx',
    expanded: false,
    tint: 'default',
    onToggle: () => {},
  },
};

/** Green tint — used for Write file cards. */
export const GreenTint: Story = {
  render: (args) => <ToggleableChip {...args} />,
  args: {
    name: 'Write',
    summary: 'turn-group-card.stories.tsx',
    expanded: false,
    tint: 'green',
    onToggle: () => {},
  },
};

/** Blue tint — used for Edit file cards. */
export const BlueTint: Story = {
  render: (args) => <ToggleableChip {...args} />,
  args: {
    name: 'Edit',
    summary: 'tool-chip.tsx',
    expanded: false,
    tint: 'blue',
    onToggle: () => {},
  },
};

/** Expanded state — chevron rotates and bottom border drops to merge with the panel below. */
export const Expanded: Story = {
  render: (args) => <ToggleableChip {...args} />,
  args: {
    name: 'Read',
    summary: null,
    expanded: true,
    tint: 'default',
    onToggle: () => {},
  },
};
