import { create } from 'zustand';
import type { ChallengeResponse, OptionsType, QuotaType } from './utils/hooks';
import { devtools } from 'zustand/middleware';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type ProgrammingLanguage = 'python' | 'typescript' | 'javascript';
export type Timer = 'None' | 5 | 10 | 15;

// const data1: ChallengeResponse[] = [
//   {
//     title:
//       'What will be the output of the following Python code?\n\nfor i in range(5):\n    print(i)',
//     options: [
//       '1\\n2\\n3\\n4\\n5',
//       'Error',
//       '5\\n4\\n3\\n2\\n1',
//       '0\\n1\\n2\\n3\\n4',
//     ],
//     correct_answer_id: '3',
//     explanation:
//       'The `range(5)` function generates a sequence of numbers from 0 to 4. The `for` loop iterates through each number in the sequence, and in each iterati ... (33 characters truncated) ... d to the variable `i`. The code inside the loop (i.e., `print(i)`) is executed. Therefore, the loop will print each number from 0 to 4 on a new line.)',
//     timestamp: new Date(),
//     id: '3',
//     difficulty: 'easy',
//   },
//   {
//     title:
//       'What will be the output of the following Python code?\n\nfor char in "abc":\n    print(char)',
//     options: ['a\\nb\\nc', 'abc', 'Error', 'c\\nb\\na'],
//     difficulty: 'easy',
//     correct_answer_id: '0',
//     explanation:
//       'The `for` loop iterates through each character in the string "abc". In each iteration, the current character is assigned to the variable `char`, and the code inside the loop (i.e., `print(char)`) is executed. Therefore, the loop will print each character of the string on a new line.',
//     timestamp: new Date(),
//     id: '3',
//   },
//   {
//     title:
//       'What will be the output of the following Python code?\n\nx = 5\nprint(x == 5)',
//     options: ['None', 'Error', 'True', 'False'],
//     difficulty: 'easy',
//     correct_answer_id: '2',
//     explanation:
//       'The `==` operator compares two values for equality. In this case, it checks if the value of `x` (which is 5) is equal to 5. Since they are equal, the expression `x == 5` evaluates to `True`.',
//     timestamp: new Date(),
//     id: '3',
//   },
//   {
//     title:
//       'What will be the output of the following Python code?\n\nx = 3.14\nprint(type(x))',
//     options: [
//       "<class 'int'>",
//       "<class 'float'>",
//       "<class 'str'>",
//       "<class 'bool'>",
//     ],
//     difficulty: 'easy',
//     correct_answer_id: '1',
//     explanation:
//       "The `type()` function returns the data type of a variable. In this case, the variable `x` is assigned the value 3.14, which is a floating-point number. Therefore, the `type(x)` function returns `<class 'float'>`.",
//     timestamp: new Date(),
//     id: '3',
//   },
//   {
//     title:
//       'What will be the output of the following Python code?\n\n```python\ndef factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n\nprint(factorial(4))\n```',
//     options: ['24', '120', '6', '16'],
//     difficulty: 'hard',
//     correct_answer_id: '0',
//     explanation:
//       'The code defines a recursive function to calculate the factorial of a number.  factorial(4) = 4 * 3 * 2 * 1 = 24',
//     timestamp: new Date(),
//     id: '3',
//   },
//   {
//     title:
//       'What is the output of the following Python code?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x * 2, numbers))\nprint(doubled)\n```',
//     options: ['False', 'Error', 'True', 'None'],
//     difficulty: 'hard',
//     correct_answer_id: '2',
//     explanation:
//       'The `any` function returns `True` if at least one element in the iterable is true. In this case, 7 > 5 is true.',
//     timestamp: new Date(),
//     id: '3',
//   },
// ];
type StateQuestion = {
  isLoading: boolean;
  difficulty: Difficulty;
  questions: ChallengeResponse[];
  quota: QuotaType | null;
  curQuestionIndex: number;
  choice: number | null;
  //
  error: string;
  programmingLanguage: ProgrammingLanguage;
  timer: Timer;
  //
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
  updateProgrammingLanguage: (val: ProgrammingLanguage) => void;
  updateTimer: (val: Timer) => void;
};

export const useQuestionStore = create(
  devtools<StateQuestion>((set) => ({
    isLoading: false,
    difficulty: 'easy' as Difficulty,
    questions: [],
    quota: null,
    curQuestionIndex: 0,
    choice: null,
    error: '',
    programmingLanguage: 'python',
    timer: 'None',
    updateDifficulty: (diff: Difficulty) => set(() => ({ difficulty: diff })),
    updateProgrammingLanguage: (lang: ProgrammingLanguage) =>
      set(() => ({ programmingLanguage: lang })),
    updateTimer: (time: Timer) => set(() => ({ timer: time })),
    updateChoice: (value: number) => set({ choice: value }),
    updateCurQuestionIndex: (val: number) =>
      set({ curQuestionIndex: val, choice: null }),
    fetchQuestions: async (endPoint, option, queryBackend): Promise<void> => {
      set({ isLoading: true });
      try {
        const data = await queryBackend(endPoint, option);
        // console.log(data);

        set({
          questions: data,
          isLoading: false,
          choice: null,
          curQuestionIndex: 0,
          error: '',
        });
      } catch (error: any) {
        const [code, message] = error.message.split(':');
        set({ error: message, isLoading: false });
        console.log('Error FROM STORE', code, 'Mss:', message);
      }
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
