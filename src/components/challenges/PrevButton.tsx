import { useQuestionStore } from '../../store/questionaire_store';

const NextButton = () => {
  const { curQuestionIndex, updateCurQuestionIndex } = useQuestionStore();

  const prevQuestion = curQuestionIndex - 1;
  const disableButton = curQuestionIndex === 0;

  return (
    <button
      className="btn btn-outline md:order-none order-0"
      onClick={() => updateCurQuestionIndex(prevQuestion)}
      disabled={disableButton}
    >
      Prev Question
    </button>
  );
};
export default NextButton;
