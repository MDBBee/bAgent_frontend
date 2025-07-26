import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMultiAgentStore } from '../../store/multi_agent_store';

const Messages = ({
  refProp,
}: {
  refProp: React.RefObject<HTMLDivElement | null>;
}) => {
  const { messages, chatLoading, toolCall } = useMultiAgentStore();

  return (
    <div className="space-y-4 p-4 overflow-y-auto h-[85%] ">
      {messages.map((message, idx) => {
        const role = message.role;

        const markdown = (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ children }) => (
                <pre className="bg-gray-900 text-white rounded-md p-4 overflow-auto my-2">
                  {children}
                </pre>
              ),
              //@ts-expect-error
              code: ({ inline, className, children, ...props }) => {
                if (inline) {
                  return (
                    <code className="bg-gray-200 text-sm px-1 py-0.5 rounded">
                      {children}
                    </code>
                  );
                }
                return (
                  <code
                    className={`language-text text-sm ${className}`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        );

        if (role === 'user') {
          return (
            <div key={idx} className="chat chat-end">
              <div className="chat-bubble chat-bubble-primary whitespace-pre-wrap max-w-full">
                {markdown}
              </div>
              <div ref={refProp} />
            </div>
          );
        }

        if (role === 'assistant') {
          return (
            <div key={idx} className="chat chat-start max-w-full">
              <div className="chat-bubble chat-bubble-neutral whitespace-pre-wrap max-w-full">
                {markdown}
              </div>
            </div>
          );
        }

        return null;
      })}

      {chatLoading && (
        <div className="chat chat-start w-full">
          <div className="chat-bubble chat-bubble-neutral whitespace-pre-wrap w-full">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full mt-2"></div>
            <div className="skeleton h-4 w-full mt-2"></div>
          </div>
        </div>
      )}

      {toolCall && (
        <div className="skeleton p-1 inline-block  mt-2">
          <h2>{toolCall}....</h2>
        </div>
      )}
    </div>
  );
};

export default Messages;
