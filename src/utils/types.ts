// Define message type
export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Define the server event type
export type SSEEvent =
  | { type: 'checkpoint'; checkpoint_id: string }
  | { type: 'content'; content: string }
  | { type: 'search_start'; query: string }
  | { type: 'search_results'; urls: string[] }
  | { type: 'end' };
