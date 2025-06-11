import { useQuestionStore } from '../../store';

const NextButton = () => {
  const { curQuestionIndex, updateCurQuestionIndex } = useQuestionStore();

  const prevQuestion = curQuestionIndex - 1;
  const disableButton = curQuestionIndex === 0;

  return (
    <button
      className="btn btn-outline"
      onClick={() => updateCurQuestionIndex(prevQuestion)}
      disabled={disableButton}
    >
      Prev Question
    </button>
  );
};
export default NextButton;
