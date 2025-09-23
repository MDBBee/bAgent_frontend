import { AnimatePresence, motion } from 'motion/react';
import { useQuestionStore } from '../../store/questionaire_store';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import Question from './Question';
import Settings from './Settings';
import CopyQuestionButton from './CopyQuestionButton';

const QuestionContainer = () => {
  const { isLoading, questions, finish } = useQuestionStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className=" overflow-x-hidden"
      >
        <AnimatePresence mode="wait">
          {questions.length !== 0 && !isLoading ? (
            <motion.div
              key="question"
              variants={{
                hidden: { x: 100, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-y-scroll"
            >
              {/* Questions component*/}
              <Question />
              {!finish && (
                <footer className="flex items-center justify-around md:flex-nowrap flex-wrap-reverse gap-1 md:gap-0">
                  <PrevButton />
                  <CopyQuestionButton />
                  <NextButton />
                </footer>
              )}
            </motion.div>
          ) : !isLoading ? (
            // Return this if not isLoading and not questions
            <motion.div
              key="settings"
              className="mb-4 p-4 space-y-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
            >
              <h2 className="capitalize text-2xl font-bold py-4 mb-4">
                Welcome To BAgent. Agent powered questionaire
              </h2>
              <p>
                <span className="text-lg font-bold">Note:</span> Each quiz
                section comprise of 15 questions.{' '}
              </p>
              <p>Start by setting your question Parameters below: </p>
              {/* Settings for Quiz*/}

              <Settings />
            </motion.div>
          ) : (
            // Return this skeleton if isLoading === true
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              key="loading"
              className="bg-base-300 p-3 rounded-md h-[30rem] "
            >
              <div className="skeleton h-[20%] mb-4"></div>
              <div className="skeleton h-[70%]"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
export default QuestionContainer;
