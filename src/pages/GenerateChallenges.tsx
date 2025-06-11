// import { useEffect, useState } from 'react';
import { useSendRequestToBackend } from '../utils/hooks';
import CountDown from '../components/challenges/CountDown';
import Question from '../components/challenges/Question';
// import { data } from 'react-router-dom';
import { useQuestionStore, type Difficulty } from '../store';
import NextButton from '../components/challenges/NextButton';
import PrevButton from '../components/challenges/PrevButton';
import { useEffect } from 'react';

const GenerateChallenges = () => {
  const { queryBackend, fetchQuotaHook } = useSendRequestToBackend();
  const {
    difficulty,
    isLoading,
    updateDifficulty,
    fetchQuestions,
    questions,
    fetchQuota,
    quota,
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
        body: JSON.stringify({ difficulty }),
      },
      queryBackend
    );
  };

  // if (isLoading) return <h1>Is Loading!!</h1>;
  // if (error) return <h1>Something went wrong!!</h1>;

  return (
    <div className="bg-base-200 mx-auto w-6xl px-8 p-6 rounded-md">
      <h1>Refined Challenge Generator</h1>
      <div className="divider"></div>
      <div className="flex justify-between ">
        {/* Form */}
        <div className="flex justify-center items-center">
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
            className={`btn btn-outline btn-primary`}
            onClick={handleGenerateQuestions}
          >
            Generate Question
          </button>
        </div>
        {/* Quota */}

        <div className="flex justify-center items-center gap-2 text-xl">
          <p className="">Remaining Challenges:</p>
          <p className="text-center">{quota_remaining}</p>
        </div>
        <div>
          <CountDown />
        </div>
      </div>
      <div className="divider"></div>
      {questions.length !== 0 && !isLoading ? (
        <>
          <Question />
          <footer className="w-1/2 flex items-center justify-between">
            <PrevButton />
            <NextButton />
          </footer>
        </>
      ) : !isLoading ? (
        <p>START</p>
      ) : (
        <h1>Is Loading!!</h1>
      )}
    </div>
  );
};
export default GenerateChallenges;
