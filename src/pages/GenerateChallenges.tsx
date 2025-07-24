import { useSendRequestToBackend } from '../utils/hooks';
import CountDown from '../components/challenges/CountDown';
import { useEffect } from 'react';
import { useQuestionStore, type Difficulty } from '../store/questionaire_store';
import ErrorChallenge from '../components/challenges/ErrorChallenge';
import { useNavigate, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import SideBarMenu from '../components/challenges/SideBarMenu';
// import { useUserStore } from '../store/user_store';
import FinishChallenge from '../components/challenges/FinishChallenge';

const GenerateChallenges = () => {
  const { queryBackend, fetchQuotaHook } = useSendRequestToBackend();
  // const { user } = useUserStore();
  const navigate = useNavigate();
  const {
    difficulty,
    updateDifficulty,
    fetchQuestions,
    questions,
    fetchQuota,
    curQuestionIndex,
    quota,
    error,
    programmingLanguage,
    isLoading,
    finish,
  } = useQuestionStore();
  const quota_remaining = quota ? quota.quota_remaining : 0;
  const disableGenerateChallengeBtn =
    questions.length !== 0 && curQuestionIndex !== questions.length - 1;

  // Redirect users not logged in
  // useEffect(() => {
  //   if (user === null) navigate('/');
  // }, [user]);
  // Refresh quota after generating questions
  useEffect(() => {
    fetchQuota(fetchQuotaHook);
  }, [questions]);

  const handleGenerateQuestions = () => {
    navigate('');
    fetchQuestions(
      '/api/generate-challenge',
      {
        method: 'POST',
        body: JSON.stringify({ difficulty, programmingLanguage }),
      },
      queryBackend
    );
  };

  return (
    <div className="bg-base-200 mx-auto w-6xl px-8 p-2 rounded-md relative">
      <AnimatePresence mode="wait">
        {finish && <FinishChallenge />}
      </AnimatePresence>
      <div className="grid lg:grid-cols-4 md:grid-cols-3">
        {/* TOp: Generate question Form/Button */}
        <div className="md:col-span-2 flex justify-center items-center">
          <label className="select">
            <span className="label">Difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => updateDifficulty(e.target.value as Difficulty)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button
            className={`btn btn-outline btn-info disabled:btn-error`}
            onClick={handleGenerateQuestions}
            disabled={disableGenerateChallengeBtn || isLoading}
          >
            Generate Question
          </button>
        </div>
        {/* Quota */}

        <div className="flex justify-center items-center gap-2 text-lg">
          <p className="capitalize font-bold">Remaining Quota:</p>
          <p className="text-center font-bold">{quota_remaining}</p>
        </div>
        <div className="mx-auto md:col-span-full lg:col-span-1 md:mt-2 text-sm">
          <CountDown />
          <span className="capitalize font-bold text-center">
            Time to reset daily quota
          </span>
        </div>
        <div className="col-span-full divider" />

        {/* Question */}
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              className="col-span-full overflow-x-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              key="error"
            >
              <ErrorChallenge error={error} />
            </motion.div>
          ) : (
            <motion.div
              key="challenge"
              className="grid md:grid-cols-8 col-span-full"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
            >
              {/* Tabs on the left */}
              <div className="hidden md:block col-span-1 p-2">
                <h2 className="text-center leading-10">Menu</h2>
                <SideBarMenu />
              </div>
              {/* Outlet for displaying children of this page */}
              <motion.div
                layout
                className="border-l-4 border-base-100 col-span-7 mb-4"
              >
                <Outlet />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default GenerateChallenges;
