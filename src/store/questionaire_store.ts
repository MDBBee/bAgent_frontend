import { create } from 'zustand';
import type { ChallengeResponse, OptionsType, QuotaType } from '../utils/hooks';
import { devtools } from 'zustand/middleware';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type ProgrammingLanguage = 'python' | 'typescript' | 'javascript';
export type Timer = 'None' | 5 | 10 | 15;

type StateQuestion = {
  isLoading: boolean;
  difficulty: Difficulty;
  questions: ChallengeResponse[];
  quota: QuotaType | null;
  curQuestionIndex: number;
  choice: number | null;
  //
  error: string | null;
  programmingLanguage: ProgrammingLanguage;
  timer: Timer;
  finish: boolean;
  //
  fetchQuestions: (
    endPoint: string,
    option: OptionsType,
    queryBackend: (
      endPoint: string,
      option: OptionsType
    ) => Promise<{ questions: ChallengeResponse[] } | undefined>
  ) => Promise<void>;
  resetChallengeRound: () => void;
  fetchQuota: (
    queryQuota: () => Promise<QuotaType | undefined>
  ) => Promise<void>;
  updateDifficulty: (diff: Difficulty) => void;
  updateChoice: (val: number, questionId: string) => void;
  updateCurQuestionIndex: (val: number) => void;
  updateProgrammingLanguage: (val: ProgrammingLanguage) => void;
  updateTimer: (val: Timer) => void;
  updateError: () => void;
  updateFinish: () => void;
  updateIsLoading: () => void;
};

export const useQuestionStore = create(
  devtools<StateQuestion>(
    (set) => ({
      isLoading: false,
      difficulty: 'easy' as Difficulty,
      questions: [],
      quota: null,
      curQuestionIndex: 0,
      choice: null,
      error: '',
      programmingLanguage: 'python',
      timer: 'None',
      finish: false,
      updateDifficulty: (diff: Difficulty) => set(() => ({ difficulty: diff })),
      updateProgrammingLanguage: (lang: ProgrammingLanguage) =>
        set(() => ({ programmingLanguage: lang })),
      updateTimer: (time: Timer) => set(() => ({ timer: time })),
      updateChoice: (value: number, questionId: string) => {
        set((state) => {
          return {
            questions: state.questions.map((question) => {
              if (question.question_id === questionId) {
                return { ...question, userAnswer: value };
              }
              return question;
            }),
            choice: value,
          };
        });
      },
      updateError: () => set({ error: null }),
      updateCurQuestionIndex: (val: number) =>
        set({ curQuestionIndex: val, choice: null }),
      fetchQuestions: async (endPoint, option, queryBackend): Promise<void> => {
        set({ isLoading: true });
        try {
          const data: { questions: ChallengeResponse[] } | undefined =
            await queryBackend(endPoint, option);
          if (!data)
            throw new Error('Data fetching failed!, from store, line 60');

          set({
            questions: data.questions,
            isLoading: false,
          });
        } catch (error: unknown) {
          if (error instanceof TypeError) {
            set({
              error: 'Server is temporally down at the moment!',
            });
          }
          if (
            typeof error === 'object' &&
            error !== null &&
            'message' in error
          ) {
            set({
              error: (error as { message: string }).message,
            });
          }
        }
        set({ isLoading: false });
      },
      fetchQuota: async (queryQuota) => {
        try {
          const data = await queryQuota();
          set({ quota: data });
        } catch (error) {
          console.error('Failed to fetch quota:', error);
        }
      },
      updateFinish: () =>
        set((state) => {
          return { finish: !state.finish };
        }),
      updateIsLoading: () =>
        set((state) => ({
          isLoading: !state.isLoading,
        })),
      resetChallengeRound: () =>
        set({
          questions: [],
          curQuestionIndex: 0,
          choice: null,
        }),
    }),
    { name: 'questions', store: 'questions' }
  )
);
