import { BsSendArrowUp } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import Top from '../components/multiagents/Top';
import Suggestions from '../components/multiagents/Suggestions';
import Messages from '../components/multiagents/Messages';
import type { SSEEvent } from '../utils/types';

import ErrorStream from '../components/multiagents/ErrorStream';
import { PiSpinnerBallLight } from 'react-icons/pi';
import { AnimatePresence } from 'motion/react';
import { useMultiAgentStore } from '../store/multi_agent_store';
// import { useNavigate } from 'react-router-dom';
// import { useUserStore } from '../store/user_store';
const apiUrl: string = import.meta.env.VITE_API_URL;

const MultiAgent = () => {
  const {
    checkpointId,
    setCheckpointId,
    chatLoading,
    setChatLoading,
    error,
    setError,
    messages,
    setMessages,
    setToolCall,
    chatBotText,
    setChatBotText,
    askAi,
    setAskAi,
  } = useMultiAgentStore();
  // const { user } = useUserStore();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const submitOnce = useRef(false);
  // const navigate = useNavigate();

  // For redirecting users not logged in
  // useEffect(() => {
  //   if (user === null) navigate('/');
  // }, [user]);

  // For properly displaying the ai response on screen
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // For injecting queries from "agentQ-questions" to multiagen
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
    if (chatBotText === '') return;
    if (!submitOnce.current) {
      submitOnce.current = true;
      return;
    }
    setTimeout(() => {
      if (formRef.current) formRef.current?.requestSubmit();
    }, 500);
  }, [askAi]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = chatBotText;
    const form = e.target as HTMLFormElement;
    if (query === '') return;
    setMessages({ role: 'user', content: query });
    setChatBotText('');
    setAskAi();
    form.reset();

    const url = new URL(`${apiUrl}/agent/researcher`);
    url.searchParams.append('message', query as string);
    if (checkpointId) url.searchParams.append('checkpoint_id', checkpointId);

    const controller = new AbortController();
    const { signal } = controller;
    try {
      setChatLoading(true);
      const response = await fetch(url.toString(), {
        method: 'GET',
        credentials: 'include',
        signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`${response.status}: Daily quota exhausted`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE chunks
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          if (part.startsWith('data: ')) {
            const data: SSEEvent = JSON.parse(part.replace('data: ', ''));
            setChatLoading(false);

            switch (data.type) {
              case 'checkpoint':
                setCheckpointId(data.checkpoint_id);
                break;
              case 'content':
                setToolCall(null);
                setMessages({ role: 'assistant', content: data.content });
                break;
              case 'search_start':
                setToolCall('🌐 Searching the web 🛜');
                break;
              case 'search_results':
                setToolCall(null);
                // console.log('Search results:', data.urls);

                break;
              case 'end':
                break;
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof TypeError) {
        setError('Server is temporarily down at the moment!');
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error
      ) {
        setError((error as { message: string }).message);
      } else {
        setError('An unknown error occurred.');
      }

      setChatLoading(false);
      controller.abort();
    }
  };

  return (
    <div className="flex flex-col justify-between mx-auto bg-base-100 w-6xl h-[90vh]  gap-8 p-4 relative">
      {/* Error Element */}
      <AnimatePresence>{error && <ErrorStream />}</AnimatePresence>
      {messages.length > 0 ? (
        <Messages refProp={bottomRef} />
      ) : (
        <>
          <Top />
          <Suggestions />
        </>
      )}

      {/* User input */}
      <form
        ref={formRef}
        className="w-[100%] mx-auto mb-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex justify-center relative">
          <textarea
            ref={textAreaRef}
            className="h-20 rounded-lg p-4 text-sm text-inherit resize-none w-full border-2"
            name="query"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // prevent newline
                const form = e.currentTarget.form;
                if (form) form.requestSubmit(); // trigger form submit
              }
            }}
            value={chatBotText}
            onChange={(e) => setChatBotText(e.target.value)}
          />
          <button
            className="btn btn-secondary btn-circle absolute  focus:transition-all focus:duration-300 active:transition-all active:duration-300 right-[1%] top-[25%]"
            type="submit"
            disabled={chatLoading}
          >
            {chatLoading ? (
              <PiSpinnerBallLight className="animate-spin" />
            ) : (
              <BsSendArrowUp />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default MultiAgent;
