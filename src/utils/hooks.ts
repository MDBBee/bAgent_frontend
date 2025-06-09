import { useAuth } from '@clerk/clerk-react';

export type ChallengeResponse = {
  title: string;
  options: string[];
  difficulty: string;
  correct_answer_id: string;
  explanation: string;
  timestamp: Date;
  id: string;
};

export function useSendRequestToBackend() {
  const { getToken } = useAuth();

  async function queryBackend(apiPoint: string, options = {}) {
    const token = await getToken();

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const request = await fetch(`http://localhost:8000/api/${apiPoint}`, {
        ...options,
        ...defaultOptions,
      });

      if (!request.ok) {
        const errorMessage = await request.json().catch(() => null);
        if (request.status === 429) {
          throw new Error(
            'Daily quota exhausted!!, Will be reset in the next 24hours'
          );
        }
        throw new Error(
          errorMessage?.detail ||
            'Somethging went wrong, error from queryBackend!'
        );
      }

      const result = await request.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return { queryBackend };
}
