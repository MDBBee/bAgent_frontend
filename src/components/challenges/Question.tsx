import { useQuestionStore } from '../../store/questionaire_store';
import { AnimatePresence, motion } from 'motion/react';

const Question = () => {
  const {
    choice,
    updateChoice,
    questions,
    curQuestionIndex,
    programmingLanguage,
  } = useQuestionStore();
  if (questions.length === 0) return;
  const {
    title,
    difficulty,
    correct_answer_id,
    explanation,
    options,
    userAnswer,
    question_id,
  } = questions[curQuestionIndex];

  // Choice || hasAnswered is basically used for Ui display
  // Through update choice, choice will be updated and also the questions
  const hasAnswered = choice !== null;
  const prevAnswered = userAnswer !== null && userAnswer !== undefined;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="bg-base-300 p-3 rounded-md h-[28rem] overflow-y-scroll mb-2"
      >
        <motion.div
          variants={{
            hidden: { x: -100, opacity: 0 },
            visible: { x: 0, opacity: 1 },
          }}
          exit={{ x: 10, opacity: 0 }}
          transition={{ type: 'tween' }}
          className="flex justify-start items-start gap-3 mb-3"
        >
          <h2 className="font-bold mb-4">Difficulty:</h2>
          <span className="capitalize">{difficulty}</span>
        </motion.div>
        <motion.div
          variants={{
            hidden: { x: -100, opacity: 0 },
            visible: { x: 0, opacity: 1 },
          }}
          exit={{ x: 10, opacity: 0 }}
          transition={{ type: 'tween' }}
          className="flex flex-col justify-between h-[80%] "
        >
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
              let buttonClass = 'btn block mb-1 w-[90%] mx-auto ';

              if (hasAnswered || prevAnswered) {
                if (i === +correct_answer_id) {
                  buttonClass +=
                    'btn-success translate-x-6 transition duration-300';
                } else if (i === userAnswer) {
                  buttonClass +=
                    'btn-secondary -translate-x-2 transition duration-300';
                } else if (i === choice) {
                  buttonClass +=
                    'btn-secondary -translate-x-2 transition duration-300';
                } else {
                  buttonClass += 'btn-outline';
                }
              } else {
                buttonClass += 'btn-outline';
              }

              return (
                <button
                  key={i}
                  className={buttonClass}
                  onClick={() => updateChoice(i, question_id)}
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Question;
