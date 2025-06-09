import { useEffect, useState } from 'react';
import { useSendRequestToBackend } from '../utils/hooks';
import CountDown from '../components/challenges/CountDown';
import Question from '../components/challenges/Question';

// const example = {
//   correct_answer_id: 0,
//   difficulty: 'easy',
//   explanation:
//     'The // operator performs integer division, which discards the decimal part of the result. 7 // 2 equals 3.',
//   id: 21,
//   options: ['3', '3.5', '4', 'Error'],
//   timestamp: '2025-06-09T09:20:21.452539',
//   title: 'What is the output of the expression 7 // 2 in Python?',
// };
export type TypeQuestion = {
  correct_answer_id: number;
  difficulty: string;
  explanation: string;
  id: number;
  options: Array<string>;
  timestampt: Date;
  title: string;
};

type Difficulty = 'easy' | 'medium' | 'hard' | null;

const GenerateChallenges = () => {
  const [difficulty, setDificulty] = useState<Difficulty>('easy');
  const [question, setQuestion] = useState<TypeQuestion | null>(null);
  const [isLoading, setIsloading] = useState<boolean | null>(null);
  const { queryBackend } = useSendRequestToBackend();

  useEffect(() => {}, []);

  const fetchChallenges = async () => {
    console.log('***CLICKED');

    const response = await queryBackend('generate-challenge', {
      method: 'POST',
      body: JSON.stringify({ difficulty }),
    });
    console.log(response);

    setQuestion(response);
  };

  if (isLoading) return <h1>Is Loading!!</h1>;
  // if (error) return <h1>Something went wrong!!</h1>;

  return (
    <div className="bg-base-200 mx-auto w-6xl px-8 p-6 rounded-md">
      <h1>Refined Challenge Generator</h1>
      <div className="divider"></div>
      <div className="flex justify-between ">
        {/* Form */}
        <div className="flex justify-center items-center">
          <label className="select">
            <span className="label">Difficulty</span>
            <select
              onChange={(e) => setDificulty(e.target.value as Difficulty)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button className={`btn btn-default type`} onClick={fetchChallenges}>
            Generate Question
          </button>
        </div>
        {/* Quota */}

        <div className="flex justify-center items-center gap-2 text-xl">
          <p className="">Remaining Challenges:</p>
          <p className="text-center">4</p>
        </div>
        <div>
          <CountDown />
        </div>
      </div>
      <div className="divider"></div>
      {question && <Question data={question} />}
    </div>
  );
};
export default GenerateChallenges;
