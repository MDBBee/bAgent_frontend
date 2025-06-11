// import type { ChallengeResponse } from '../../utils/hooks';
import { useQuestionStore } from '../../store';

const Question = () => {
  const { choice, updateChoice, questions, curQuestionIndex } =
    useQuestionStore();
  if (questions.length === 0) return;
  const { title, difficulty, correct_answer_id, explanation, options } =
    questions[curQuestionIndex];
  const hasAnswered = choice !== null;

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
                hasAnswered
                  ? i === +correct_answer_id
                    ? 'btn-success translate-x-6 transition duration-300 '
                    : i !== choice
                    ? ''
                    : 'btn-error -translate-x-2 transition duration-300'
                  : ''
              } `}
              onClick={() => updateChoice(i)}
              // disabled={hasAnswered}
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
