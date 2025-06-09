import { useState } from 'react';
import type { TypeQuestion } from '../../pages/GenerateChallenges';

const Question = ({ data }: { data: TypeQuestion }) => {
  const [choice, setChoice] = useState<number | null>(null);

  const { title, difficulty, correct_answer_id, explanation, options } = data;

  return (
    <div className="bg-base-300 p-3 rounded-md">
      <div className="flex justify-start items-start gap-3 mb-3">
        <h2 className="font-bold mb-4">Difficulty:</h2>
        <span className="capitalize">{difficulty}</span>
      </div>
      <h2 className="mb-4">{title}</h2>
      {/* Options */}
      <div className="mb-4">
        {options.map((opt, i) => {
          return (
            <button
              key={i}
              className={`btn block w-1/2 mb-1 ${
                i === choice && choice === +correct_answer_id
                  ? 'btn-success translate-x-6 duration-700'
                  : choice && i !== choice && i === +correct_answer_id
                  ? 'btn-success translate-x-6 duration-700'
                  : i === choice && choice !== +correct_answer_id
                  ? 'btn-error translate-x-2 duration-700'
                  : 'btn-soft'
              } `}
              onClick={() => setChoice(i)}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {/* Explanation */}
      {choice !== null && (
        <div>
          <p className="font-stretch-90% font-bold text-primary">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
};
export default Question;
