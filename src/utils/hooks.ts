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

export type OptionsType =
  | {
      method: string;
      body: string;
    }
  | Record<string, never>;

export type QuotaType = {
  quota_remaining: number;
  last_reset_date: string;
  user_id: string;
  id: number;
};

export function useSendRequestToBackend() {
  const { getToken } = useAuth();

  // async function queryBackend(apiEndPoint: string, options: Options = {})
  const queryBackend = async (
    endPoint: string,
    option: OptionsType
  ): Promise<ChallengeResponse[] | undefined> => {
    const token = await getToken();

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const request = await fetch(`http://localhost:8000${endPoint}`, {
        ...option,
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
      console.log('FROM HOOKS DOPTION', result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuotaHook = async (): Promise<QuotaType | undefined> => {
    const token = await getToken();

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const request = await fetch(`http://localhost:8000/api/quota`, {
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
  };

  return { queryBackend, fetchQuotaHook };
}
