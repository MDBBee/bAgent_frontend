import { motion } from 'motion/react';
import { useUserStore } from '../../store/user_store';
import { useQuestionStore } from '../../store/questionaire_store';
import { useSendRequestToBackend } from '../../utils/hooks';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PiSpinnerBallFill } from 'react-icons/pi';

const FinishChallenge = () => {
  const { user } = useUserStore();
  const {
    questions,
    difficulty,
    updateFinish,
    updateIsLoading,
    programmingLanguage,
    isLoading,
    resetChallengeRound,
  } = useQuestionStore();
  const { queryBackend } = useSendRequestToBackend();
  const navigate = useNavigate();

  const totalNumQuestions = questions.length;
  const totalNumOfCorrectAnswer = questions.reduce((acc, cur) => {
    if (+cur.correct_answer_id === cur.userAnswer) {
      acc += 1;
    }
    return acc;
  }, 0);
  const userName = user?.username || user?.email?.split('@')[0];
  const scorePercent = (totalNumOfCorrectAnswer / totalNumQuestions) * 100;
  const date = new Date();

  const handleSaveToHistory = async () => {
    const unansweredQuestions = questions
      .map((q, index) => (q.userAnswer === undefined ? index + 1 : -1))
      .filter((index) => index !== -1);

    if (unansweredQuestions.length > 0) {
      const dialog =
        (document.getElementById('my_modal_1') as HTMLDialogElement) || null;
      dialog?.showModal();
      return;
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

  return (
    <>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '90%', opacity: 1 }}
        exit={{ height: 0, opacity: 0, transition: { delay: 0.3 } }}
        transition={{ type: 'tween' }}
        key="overlay"
        className="absolute backdrop-blur-2xl size-full z-10"
        onClick={updateFinish}
      ></motion.div>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: 'tween' }}
        key="summary"
        className="h-[80%] w-[80%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 rounded-2xl z-10"
      >
        <h2 className="mb-2 p-2">
          UserName:{' '}
          <span className="font-bold text-lg">{userName || 'No_UserName'}</span>
        </h2>
        {/* Table */}
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 h-[60%] p-4 mb-4">
          <table className="table">
            {/* head */}
            <thead className="border-b-2">
              <tr>
                <th></th>
                <th>Score</th>
                <th>Difficulty</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="text-xs md:text-base text-left border-b-1">
                <th>1</th>
                <td>
                  {/* {`(
                  ${totalNumOfCorrectAnswer} / ${totalNumQuestions})`}{' '} */}
                  ~{scorePercent.toFixed(0)}%
                </td>
                <td className="capitalize">{difficulty}</td>
                <td>{date.toDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Options */}
        <div className="space-y-10">
          <h2 className="text-center md:text-lg text-sm">
            <span className="font-bold">Note:</span> Saving this challenge round
            to history, guarantees non-repition of generated questions.
          </h2>
          <div className=" flex justify-center items-center md:gap-8 md:flex-nowrap flex-wrap-reverse">
            <button className="btn btn-neutral">Restart</button>
            <button className="btn btn-success" onClick={handleSaveToHistory}>
              {isLoading ? (
                <h2 className="font-bold flex justify-center items-center">
                  Saving progress..{' '}
                  <PiSpinnerBallFill className="animate-spin size-5" />
                </h2>
              ) : (
                'Save to History'
              )}
            </button>
            <button className="btn btn-neutral">Settings</button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default FinishChallenge;
