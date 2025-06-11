import { create } from 'zustand';
import type { ChallengeResponse, OptionsType, QuotaType } from './utils/hooks';
import { devtools } from 'zustand/middleware';

export type Difficulty = 'easy' | 'medium' | 'hard';

type StateQuestion = {
  isLoading: boolean;
  difficulty: Difficulty;
  questions: ChallengeResponse[];
  quota: QuotaType | null;
  curQuestionIndex: number;
  choice: number | null;
  fetchQuestions: (
    endPoint: string,
    option: OptionsType,
    queryBackend: (
      endPoint: string,
      option: OptionsType
    ) => Promise<ChallengeResponse[] | undefined>
  ) => Promise<void>;
  fetchQuota: (
    queryQuota: () => Promise<QuotaType | undefined>
  ) => Promise<void>;
  updateDifficulty: (diff: Difficulty) => void;
  updateChoice: (val: number) => void;
  updateCurQuestionIndex: (val: number) => void;
};

export const useQuestionStore = create(
  devtools<StateQuestion>((set) => ({
    isLoading: false,
    difficulty: 'easy' as Difficulty,
    questions: [],
    quota: null,
    curQuestionIndex: 0,
    choice: null,
    updateDifficulty: (diff: Difficulty) => set(() => ({ difficulty: diff })),
    updateChoice: (value: number) => set({ choice: value }),
    updateCurQuestionIndex: (val: number) =>
      set({ curQuestionIndex: val, choice: null }),
    fetchQuestions: async (endPoint, option, queryBackend): Promise<void> => {
      set({ isLoading: true });

      console.log('STORE', endPoint, option);
      const data = await queryBackend(endPoint, option);
      console.log('STORE', data);

      set({
        questions: data,
        isLoading: false,
        choice: null,
        curQuestionIndex: 0,
      });
    },
    fetchQuota: async (queryQuota) => {
      try {
        const data = await queryQuota();
        set({ quota: data });
      } catch (error) {
        console.error('Failed to fetch quota:', error);
      }
    },
  }))
);
