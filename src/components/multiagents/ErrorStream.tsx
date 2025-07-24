import { Link } from 'react-router-dom';
import notFound from '../../assets/not-found.png';
import { useQuestionStore } from '../../store/questionaire_store';
import { motion } from 'motion/react';
import { useMultiAgentStore } from '../../store/multi_agent_store';
import { LuRefreshCw } from 'react-icons/lu';

const ErrorStream = () => {
  const { quota } = useQuestionStore();
  const { error, setError } = useMultiAgentStore();
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[90%] backdrop-blur-md z-10"></div>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0, transition: { type: 'tween' } }}
        transition={{ type: 'spring', bounce: 0.6 }}
      >
        <div className="flex flex-col items-center justify-between gap-4">
          <img src={notFound} alt="Out of quota" className="h-[40%] w-[40%]" />
          <h2 className="text-2xl font-bold text-center">Oops!!! {error}.</h2>
          <p>Quotas remaining: {quota?.quota_remaining}</p>
          <p>
            Go back to homePage{' '}
            <Link to="/" className="link link-primary text-lg">
              HomePage
            </Link>
          </p>

          <Link
            to="/multiAgent"
            className="link link-primary text-lg flex justify-center items-center cursor-pointer"
          >
            <button
              className="flex justify-center items-center gap-2"
              onClick={() => setError(null)}
            >
              Refresh page
              <span>
                <LuRefreshCw className="size-5 flex justify-center items-center" />
              </span>
            </button>
          </Link>
        </div>
      </motion.div>
    </>
  );
};
export default ErrorStream;
