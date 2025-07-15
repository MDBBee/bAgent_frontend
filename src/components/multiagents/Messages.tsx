import type { Message } from '../../utils/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Messages = ({
  messages,
  ref,
  chatLoading,
}: {
  messages: Message[];
  ref: React.RefObject<HTMLDivElement | null>;
  chatLoading: boolean;
}) => {
  return (
    <>
      <div
        className={`space-y-4 p-4 overflow-y-auto ${
          messages.length > 0 ? 'h-[80vh]' : ''
        }`}
      >
        {messages.map((message, idx) => {
          const role = message.role;

          if (role === 'user') {
            return (
              <div
                key={idx}
                className={`chat ${
                  message.role === 'assistant' ? 'chat-start' : 'chat-end'
                }`}
              >
                <div
                  className={`chat-bubble whitespace-pre-wrap ${
                    message.role === 'assistant' ? 'chat-bubble-neutral' : ''
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            );
          }
          if (chatLoading) {
            return (
              <div className="flex w-full flex-col gap-4">
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            );
          }
          if (role === 'assistant') {
            return (
              <div
                key={idx}
                className={`chat ${
                  message.role === 'assistant' ? 'chat-start' : 'chat-end'
                }`}
              >
                <div
                  className={`chat-bubble whitespace-pre-wrap ${
                    message.role === 'assistant' ? 'chat-bubble-neutral' : ''
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            );
          }
        })}
        {/* Ref div for controlling ui view */}
        <div ref={ref} />
      </div>
    </>
  );
};
export default Messages;
