import { toast } from 'react-toastify';
import { useQuestionStore } from '../../store/questionaire_store';
import { useUserStore } from '../../store/user_store';
import { useNavigate } from 'react-router-dom';
import { PiSpinnerBallFill } from 'react-icons/pi';
import { useSendRequestToBackend } from '../../utils/hooks';

const ConfirmSaveQuestions = () => {
  const {
    questions,
    difficulty,
    updateFinish,
    updateIsLoading,
    programmingLanguage,
    isLoading,
    resetChallengeRound,
    updateCurQuestionIndex,
  } = useQuestionStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { queryBackend } = useSendRequestToBackend();

  const unansweredQuestions = questions
    .map((q, index) => (q.userAnswer === undefined ? index + 1 : -1))
    .filter((index) => index !== -1);

  const handleSaveToHistory = async () => {
    if (unansweredQuestions.length > 0) {
      const dialog =
        (document.getElementById('my_modal_5') as HTMLDialogElement) || null;
      dialog?.showModal();
    }

    const questionsToSave = questions.map((q) => {
      if (!q.userAnswer) {
        return {
          ...q,
          difficulty: difficulty,
          programmingLanguage: programmingLanguage,
          createdBy: user?.email,
          userAnswer: null,
        };
      }
      return {
        ...q,
        difficulty: difficulty,
        programmingLanguage: programmingLanguage,
        createdBy: user?.email,
      };
    });

    updateIsLoading();
    try {
      const result: { success: boolean; message: string } = await queryBackend(
        '/api/save_to_history',
        {
          method: 'POST',
          body: JSON.stringify(questionsToSave),
        }
      );
      toast.success(result.message);
      resetChallengeRound();
      updateFinish();
      navigate('/agentQ/settings');
    } catch (error) {
      console.log(error);
    } finally {
      updateIsLoading();
    }
  };

  const handleCheckoutUnswered = () => {
    // User decides to checkout unaswered question(s)

    // - close modal for save confirmation
    const dialog =
      (document.getElementById('my_modal_5') as HTMLDialogElement) || null;
    dialog?.close();

    // - close modal for result history
    updateFinish();

    // - navigate to challenges
    navigate('/agentQ');

    // - Start from the first unaswered question
    updateCurQuestionIndex(unansweredQuestions[0] - 1);
  };

  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello! {user?.username}</h3>
          <p className="py-4">
            😎 Yet to aswer these question(s):
            <span className="text-error ml-2">
              {unansweredQuestions.join(',')}
            </span>
          </p>
          <button
            className="btn w-[80%] block mx-auto btn-success"
            onClick={handleCheckoutUnswered}
          >
            Check Them out
          </button>
          <div className="modal-action justify-center items-center">
            <button className="btn" onClick={handleSaveToHistory}>
              {isLoading ? (
                <h2 className="font-bold flex justify-center items-center">
                  Saving progress..{' '}
                  <PiSpinnerBallFill className="animate-spin size-5" />
                </h2>
              ) : (
                'Save'
              )}
            </button>
            <form method="dialog" className="">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default ConfirmSaveQuestions;
