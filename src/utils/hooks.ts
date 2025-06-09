import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

export const queryKeys = {
  challenges: ['challenges'] as const,
};

const URL = 'http://localhost:8000/api/generate-challenge';
interface challengeResponse {
  title: string;
  options: string[];
  difficulty: string;
  correct_answer_id: string;
  explanation: string;
  timestamp: Date;
  id: string;
}

export function useGenerateChallenge(difficulty: 'easy' | 'medium' | 'hard') {
  // Use `useAuth()` to access the `getToken()` method
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.challenges,
    queryFn: async (): Promise<challengeResponse> => {
      const token = await getToken();

      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({ difficulty }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as challengeResponse;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
