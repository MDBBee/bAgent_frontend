import { useQuestionStore } from '../../store';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import Question from './Question';
import Settings from './Settings';

const QuestionContainer = () => {
  const { isLoading, questions } = useQuestionStore();

  return (
    <div className=" overflow-x-hidden">
      {questions.length !== 0 && !isLoading ? (
        <div>
          {/* Questions component*/}
          <Question />
          <footer className="flex items-center justify-around">
            <PrevButton />
            <NextButton />
          </footer>
        </div>
      ) : !isLoading ? (
        // Return this if not isLoading and not questions
        <div className="mb-4 p-4 space-y-4">
          <h2 className="capitalize text-2xl font-bold py-4 mb-4">
            Welcome To Coding tutor. Agent powered questionaire
          </h2>
          <p>
            <span className="text-lg font-bold">Note:</span> Each quiz section
            comprise of 15 questions.{' '}
          </p>
          <p>Start by setting your question Parameters below: </p>
          {/* Settings for Quiz*/}

          <Settings />
        </div>
      ) : (
        // Retur this skeleton if isLoading === true
        <div className="bg-base-300 p-3 rounded-md h-[30rem] ">
          <div className="skeleton h-[20%] mb-4"></div>
          <div className="skeleton h-[70%]"></div>
        </div>
      )}
    </div>
  );
};
export default QuestionContainer;
