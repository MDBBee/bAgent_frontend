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

  const hasAnswered = choice !== null;
  const prevAnswered = userAnswer !== null && userAnswer !== undefined;

  function cleanTitle(title: string, lang: string) {
    return title
      .replace(`\`\`\`${lang}`, '') // Remove ```javascript or ```python
      .replace('```', '') // Remove trailing ```
      .trim(); // Clean up extra space
  }

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
          <div className="mb-4 ml-2">
            <pre className="text-wrap">
              <code>{cleanTitle(title, programmingLanguage)}</code>
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
                  onClick={() => {
                    if (hasAnswered || prevAnswered) {
                      return;
                    }
                    updateChoice(i, question_id);
                  }}
                  // disabled={hasAnswered}}
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

// {correct_answer_id: 1,
// explanation: 'The `pipe` function applies a series of functions to an initial value from left to right.  `pipe(5, double, square)` is equivalent to `square(double(5))`, which is `square(10)`, resulting in 100.',
// options: [('50', '100', '25', 'Error')],
// question_id: '084975bb-fea5-4309-a467-440460966ca4',
// title: 'With the `pipe` function applying functions sequentially, what is the result of `pipe(5, double, square)` if `double = (x) => x * 2` and `square = (x) => x * x`?'}
