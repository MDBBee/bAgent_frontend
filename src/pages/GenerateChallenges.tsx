import { useSendRequestToBackend } from '../utils/hooks';
import CountDown from '../components/challenges/CountDown';
import { useEffect } from 'react';
// import QuestionContainer from '../components/challenges/QuestionContainer';
import { useQuestionStore, type Difficulty } from '../store';
import ErrorChallenge from '../components/challenges/ErrorChallenge';
import { NavLink, Outlet } from 'react-router-dom';

const sideBarLinks = [
  // Absolute path
  { name: 'Challenges', href: '/agentQ' },
  // Relative path
  { name: 'History', href: 'history' },
  // Relative path
  { name: 'Scores', href: 'highscore' },
];

const GenerateChallenges = () => {
  const { queryBackend, fetchQuotaHook } = useSendRequestToBackend();
  const {
    difficulty,
    updateDifficulty,
    fetchQuestions,
    questions,
    fetchQuota,
    quota,
    error,
    programmingLanguage,
  } = useQuestionStore();

  const quota_remaining = quota ? quota.quota_remaining : 0;

  useEffect(() => {
    fetchQuota(fetchQuotaHook);
  }, [questions]);

  const handleGenerateQuestions = () => {
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
    <div className="bg-base-200 mx-auto w-6xl px-8 p-2 rounded-md ">
      {/* <div className="divider m-0"></div> */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3">
        {/* Form */}
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
            className={`btn btn-outline btn-info`}
            onClick={handleGenerateQuestions}
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
        {error ? (
          <div className="col-span-full overflow-x-hidden">
            <ErrorChallenge error={error} />
          </div>
        ) : (
          <div className="grid md:grid-cols-7 col-span-full">
            <div className="col-span-1 p-2 ">
              <h2 className="text-center leading-10">Menu</h2>
              <div className="flex flex-col h-[30%] min-h-[30vh] justify-around">
                {sideBarLinks.map((sl, i) => (
                  <NavLink key={i} to={sl.href}>
                    <button className="btn btn-soft btn-primary w-full">
                      {' '}
                      {sl.name}
                    </button>
                  </NavLink>
                ))}
              </div>
            </div>
            {/* Outlet for displaying children of this page */}
            <div className="border-l-4 border-base-100 col-span-6">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GenerateChallenges;
