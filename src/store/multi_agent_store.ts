import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { TypeQuestionToCopy } from '../components/challenges/CopyQuestionButton';
import type { Message } from '../utils/types';

type TypeUserMessage = { role: string; content: string };

type multiAgentState = {
  requestMessage: TypeQuestionToCopy | null;
  chatLoading: boolean;
  checkpointId: string | null;
  error: string | null;
  messages: Message[];
  toolCall: string | null;
  setRequestMessage: (quest: TypeQuestionToCopy | null) => void;
  setChatLoading: (val: boolean) => void;
  setCheckpointId: (val: string) => void;
  setError: (val: string | null) => void;
  setMessages: (val: TypeUserMessage) => void;
  setToolCall: (val: string | null) => void;
};

export const useMultiAgentStore = create(
  devtools<multiAgentState>(
    (set) => ({
      requestMessage: null,
      chatLoading: false,
      checkpointId: null,
      error: null,
      messages: [],
      toolCall: null,
      setRequestMessage: (quest: TypeQuestionToCopy | null) =>
        set(() => ({ requestMessage: quest })),
      setChatLoading: (val: boolean) => set({ chatLoading: val }),
      setCheckpointId: (val: string) => set({ checkpointId: val }),
      setError: (val: string | null) => set({ error: val }),
      setMessages: (val: TypeUserMessage) =>
        set((state) => {
          if (val.role === 'user')
            return {
              messages: [
                ...state.messages,
                { role: 'user', content: val.content },
              ],
            };
          if (val.role === 'assistant') {
            const last = state.messages[state.messages.length - 1];
            if (last && last.role === 'assistant') {
              const updated = [...state.messages];
              updated[updated.length - 1] = {
                ...last,
                content: last.content + val.content,
              };
              return { messages: updated };
            }
            return {
              messages: [
                ...state.messages,
                { role: 'assistant', content: val.content },
              ],
            };
          }
          return {};
        }),
      setToolCall: (val: string | null) =>
        set({
          toolCall: val,
        }),
    }),
    { name: 'chatBot', store: 'ChatBot' }
  )
);
