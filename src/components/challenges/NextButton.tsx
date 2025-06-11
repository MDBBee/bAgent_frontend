import { useQuestionStore } from '../../store';

const NextButton = () => {
  const { curQuestionIndex, questions, updateCurQuestionIndex } =
    useQuestionStore();

  const numOfQuestions = questions.length;
  const nextQuestion = curQuestionIndex + 1;

  const disableButton = curQuestionIndex > numOfQuestions - 2;

  return (
    <button
      className="btn btn-outline"
      onClick={() => updateCurQuestionIndex(nextQuestion)}
      disabled={disableButton}
    >
      Next Question
    </button>
  );
};
export default NextButton;
