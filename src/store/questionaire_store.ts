import { create } from 'zustand';
import type { ChallengeResponse, OptionsType, QuotaType } from '../utils/hooks';
import { devtools } from 'zustand/middleware';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type ProgrammingLanguage = 'python' | 'typescript' | 'javascript';
// export type Timer = 'None' | 5 | 10 | 15;

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
  timer: number;
  progressBarTimerConstant: number;
  showTimer: boolean;
  finish: boolean;
  confirmSaveQuestions: boolean;
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
  endChallengeRound: () => void;
  fetchQuota: (
    queryQuota: () => Promise<QuotaType | undefined>
  ) => Promise<void>;
  updateDifficulty: (diff: Difficulty) => void;
  updateChoice: (val: number, questionId: string) => void;
  updateCurQuestionIndex: (val: number) => void;
  updateProgrammingLanguage: (val: ProgrammingLanguage) => void;
  updateTimer: (val: number) => void;
  updateProgressBarTimerConstant: (val: number) => void;
  updateShowTimer: () => void;
  updateError: () => void;
  updateFinish: () => void;
  updateIsLoading: () => void;
  updateConfirmSaveQuestions: () => void;
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
      timer: 300,
      progressBarTimerConstant: 300,
      showTimer: false,
      finish: false,
      confirmSaveQuestions: false,
      updateDifficulty: (diff: Difficulty) => set(() => ({ difficulty: diff })),
      updateProgrammingLanguage: (lang: ProgrammingLanguage) =>
        set(() => ({ programmingLanguage: lang })),
      updateTimer: (time: number) =>
        set((state) => {
          if (time < 0) {
            return {
              showTimer: false,
              finish: state.questions.length > 0,
              timer: state.progressBarTimerConstant,
            };
          }
          return { timer: time };
        }),
      updateProgressBarTimerConstant: (time: number) =>
        set(() => ({ progressBarTimerConstant: time })),
      updateShowTimer: () => {
        set((state) => ({ showTimer: !state.showTimer }));
      },
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

          set((state) => ({
            questions: data?.questions,
            isLoading: false,
            showTimer: state.progressBarTimerConstant <= 0 ? false : true,
            timer: state.progressBarTimerConstant,
          }));
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
          return {
            finish: !state.finish,
            showTimer: false,
            timer: state.progressBarTimerConstant,
          };
        }),
      updateIsLoading: () =>
        set((state) => ({
          isLoading: !state.isLoading,
        })),
      resetChallengeRound: () =>
        set((state) => ({
          curQuestionIndex: 0,
          choice: null,
          questions: state.questions.map((quest) => {
            return {
              correct_answer_id: quest.correct_answer_id,
              explanation: quest.explanation,
              options: quest.options,
              question_id: quest.question_id,
              title: quest.title,
            } as ChallengeResponse;
          }),
          timer: state.progressBarTimerConstant,
          showTimer: state.progressBarTimerConstant > 0,
        })),
      endChallengeRound: () =>
        set((state) => ({
          curQuestionIndex: 0,
          choice: null,
          questions: [],
          timer: state.progressBarTimerConstant,
          showTimer: false,
        })),
      updateConfirmSaveQuestions: () =>
        set((state) => ({
          confirmSaveQuestions: !state.confirmSaveQuestions,
        })),
    }),
    { name: 'questions', store: 'questions' }
  )
);
