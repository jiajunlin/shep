import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import type { ThreadMessageLike, AppendMessage } from '@assistant-ui/react';
import { AssistantRuntimeProvider, useExternalStoreRuntime } from '@assistant-ui/react';
import { ChatComposer } from './ChatComposer';
import type { FormAttachment } from '@/hooks/use-attachments';

/**
 * `ChatComposer` renders `ComposerPrimitive` / `ThreadPrimitive` from
 * `@assistant-ui/react`, which requires an `AssistantRuntimeProvider`
 * ancestor to mount at all. This mirrors the minimal mock runtime
 * used in `ChatTab.stories.tsx` — just enough state for `onNew` to
 * resolve so the Send button doesn't throw outside a real session.
 */
function MockComposerProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ThreadMessageLike[]>([]);
  const onNew = useCallback(async (message: AppendMessage) => {
    const textPart = message.content.find((c) => c.type === 'text');
    if (textPart?.type !== 'text') return;
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        content: [{ type: 'text', text: textPart.text }],
        createdAt: new Date(),
      },
    ]);
  }, []);

  const runtime = useExternalStoreRuntime({
    messages,
    convertMessage: useCallback((msg: ThreadMessageLike): ThreadMessageLike => msg, []),
    isRunning: false,
    onNew,
  });

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}

function makeAttachment(overrides: Partial<FormAttachment> = {}): FormAttachment {
  return {
    id: 'attachment-1',
    name: 'auth-flow-diagram.png',
    size: 84_213,
    mimeType: 'image/png',
    path: '/tmp/auth-flow-diagram.png',
    ...overrides,
  };
}

const meta: Meta<typeof ChatComposer> = {
  title: 'Features/Chat/ChatComposer',
  component: ChatComposer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <MockComposerProvider>
        <div
          style={{
            maxWidth: '480px',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Story />
        </div>
      </MockComposerProvider>
    ),
  ],
  args: {
    attachments: [],
    isDragOver: false,
    uploadError: null,
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
    onDrop: () => {},
    onPaste: () => {},
    onRemoveAttachment: () => {},
    onNotesChange: () => {},
    onPickFiles: () => {},
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ChatComposer>;

/** Default — empty composer, ready for input. */
export const Default: Story = {};

/** Disabled — visually dimmed and input blocked, e.g. while the agent session is starting. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/** With an attachment chip rendered between the textarea and the controls bar. */
export const WithAttachment: Story = {
  args: {
    attachments: [makeAttachment()],
  },
};
