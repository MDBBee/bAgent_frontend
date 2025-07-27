import { useQuestionStore } from '../../store/questionaire_store';

const NextButton = () => {
  const { curQuestionIndex, questions, updateCurQuestionIndex, updateFinish } =
    useQuestionStore();

  const numOfQuestions = questions.length;
  const nextQuestion = curQuestionIndex + 1;
  const disableNextButton = curQuestionIndex > numOfQuestions - 2;

  return (
    // Logic - display button-Finish when question at the end
    <div>
      {!disableNextButton ? (
        <button
          className="btn btn-outline md:order-none order-2"
          onClick={() => updateCurQuestionIndex(nextQuestion)}
          disabled={disableNextButton}
        >
          Next Question
        </button>
      ) : (
        <button
          className="btn btn-secondary border-b-8 border-b-neutral hover:-translate-y-1 hover:scale-x-110 duration-300 transition-all active:border-b-4 active:-translate-y-0 md:order-none order-2"
          onClick={updateFinish}
        >
          Finish
        </button>
      )}
    </div>
  );
};
export default NextButton;
