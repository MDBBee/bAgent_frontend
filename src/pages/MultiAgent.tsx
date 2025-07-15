import { BsSendArrowUp } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import Top from '../components/multiagents/Top';
import Suggestions from '../components/multiagents/Suggestions';
import Messages from '../components/multiagents/Messages';
import type { Message, SSEEvent } from '../utils/types';

const MultiAgent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [checkpointId, setCheckpointId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    setMessages((prev: Message[]) => [
      ...prev,
      { role: 'user', content: query as string },
    ]);

    const url = new URL('http://localhost:8000/agent/researcher');
    url.searchParams.append('message', query as string);
    if (checkpointId) url.searchParams.append('checkpoint_id', checkpointId);
    console.log('✅✅✅:', url);

    // setAiMessages('');
    const eventSource = new EventSource(url);
    console.log('🔥🔥🔥:', eventSource);

    eventSource.onmessage = (event) => {
      const data: SSEEvent = JSON.parse(event.data);
      // console.log('SSE Event:', data);

      switch (data.type) {
        case 'checkpoint':
          console.log('Checkpoint ID:', data.checkpoint_id);
          setChatLoading(true);
          setCheckpointId(data.checkpoint_id);
          break;
        case 'content':
          console.log('AI chunk🤖🤖..:', data.content);

          setMessages((prev) => {
            const last = prev[prev.length - 1];

            // Append to last assistant message if it's already being streamed
            if (last && last.role === 'assistant') {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...last,
                content: last.content + data.content,
              };
              return updated;
            }

            // Otherwise, create a new assistant message
            return [...prev, { role: 'assistant', content: data.content }];
          });
          break;
        case 'search_start':
          // setChatLoading(true);

          console.log('Search triggered:', data.query);
          break;
        case 'search_results':
          // setChatLoading(true);

          console.log('Search results:', data.urls);
          break;
        case 'end':
          console.log('Finished.');
          setChatLoading(false);
          eventSource.close(); // Close connection
          break;
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      setChatLoading(false);
      eventSource.close();
    };
  };

  return (
    <div className="flex flex-col justify-between mx-auto bg-base-100 max-w-6xl w-[57rem] gap-10 p-4">
      {/* Top */}
      <Top />
      {/* Suggestions */}
      <Suggestions />
      {/* Messages */}
      <div>
        <Messages
          messages={messages}
          ref={bottomRef}
          chatLoading={chatLoading}
        />
      </div>
      {/* User input */}
      <form className="w-[100%] mx-auto mb-4" onSubmit={handleSubmit}>
        <div className="w-full flex justify-center relative">
          <textarea
            placeholder="Primary"
            className="textarea textarea-primary resize-none w-full"
            name="query"
            defaultValue="What's today's weather like in Vaasa, Finland?"
          />
          <button
            className="btn btn-secondary btn-circle absolute top-[50%] right-[1%] -translate-y-[50%] focus:transition-all focus:duration-300 active:transition-all active:duration-300"
            type="submit"
            disabled={chatLoading}
          >
            <BsSendArrowUp />
          </button>
        </div>
      </form>
    </div>
  );
};
export default MultiAgent;
