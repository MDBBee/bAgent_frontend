// import type { ChallengeResponse } from '../../utils/hooks';
import { useQuestionStore } from '../../store';

const Question = () => {
  const {
    choice,
    updateChoice,
    questions,
    curQuestionIndex,
    programmingLanguage,
  } = useQuestionStore();
  if (questions.length === 0) return;
  const { title, difficulty, correct_answer_id, explanation, options } =
    questions[curQuestionIndex];
  const hasAnswered = choice !== null;

  return (
    <div className="bg-base-300 p-3 rounded-md h-[25rem] overflow-y-scroll mb-2">
      <div className="flex justify-start items-start gap-3 mb-3">
        <h2 className="font-bold mb-4">Difficulty:</h2>
        <span className="capitalize">{difficulty}</span>
      </div>
      <div className="flex flex-col justify-between h-[80%] ">
        <div className="mb-4">
          <pre className="text-wrap">
            <code>
              {programmingLanguage === 'javascript'
                ? title.replace('```javascript', ' ').replace('```', ' ')
                : programmingLanguage === 'python'
                ? title.replace('```python', ' ').replace('```', ' ')
                : programmingLanguage === 'typescript'
                ? title.replace('```typescript', ' ').replace('```', ' ')
                : ''}
            </code>
          </pre>
        </div>
        {/* Options */}
        <div className="mb-4 ">
          {options.map((opt, i) => {
            return (
              <button
                key={i}
                className={`btn  block mb-1 w-[90%] mx-auto ${
                  hasAnswered
                    ? i === +correct_answer_id
                      ? 'btn-success translate-x-6 transition duration-300 '
                      : i !== choice
                      ? ''
                      : 'btn-error -translate-x-2 transition duration-300'
                    : 'btn-outline '
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
        <div>
          {choice !== null ? (
            <p className="font-bold text-primary ">{explanation}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Question;
