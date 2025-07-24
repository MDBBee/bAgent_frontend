export type ChallengeResponse = {
  title: string;
  options: string[];
  difficulty: string;
  correct_answer_id: string;
  explanation: string;
  timestamp: Date;
  userAnswer?: number | null;
  question_id: string;
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
  const queryBackend = async (endPoint: string, option: OptionsType) => {
    const request = await fetch(`http://localhost:8000${endPoint}`, {
      ...option,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!request.ok) {
      if (request.status === 429) {
        throw new Error(
          'Daily quota exhausted!!, Will be reset in the next 24hours'
        );
      }
      if (request.status === 401) {
        throw new Error(
          `${request?.statusText}: Please login or create an account to retrieve access!`
        );
      }
      if (request.status === 400) {
        throw new Error(`${request?.statusText}: Quota has been exhausted!`);
      }
      throw new Error(
        `${request?.status}-${request?.statusText}: Something went wrong!`
      );
    }

    const result = await request.json();

    return result;
  };

  const fetchQuotaHook = async (): Promise<QuotaType | undefined> => {
    try {
      const request = await fetch(`http://localhost:8000/api/quota`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
