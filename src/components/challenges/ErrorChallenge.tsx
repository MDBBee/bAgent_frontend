import { Link } from 'react-router-dom';
import errorimg from '../../../public/undraw_no-data_ig65.svg';
import { useQuestionStore } from '../../store/questionaire_store';
import { LuRefreshCw } from 'react-icons/lu';

const ErrorChallenge = ({ error }: { error: string }) => {
  const { quota, updateError } = useQuestionStore();

  return (
    <div className="h-[30rem] flex flex-col justify-center items-center">
      <img src={errorimg} alt="Out of quota" className="h-[60%] w-[60%]" />

      <h2 className="text-2xl font-bold">Oops !!! {error}</h2>
      <p>Current Quota for the day: {quota?.quota_remaining}</p>
      <p>
        Go back to homePage{' '}
        <Link to="/" className="link link-primary text-lg">
          <button onClick={updateError}>Click me</button>
        </Link>
      </p>
      <Link
        to="/agentq"
        className="link link-primary text-lg flex justify-center items-center cursor-pointer"
      >
        <button
          className="flex justify-center items-center gap-2"
          onClick={updateError}
        >
          Refresh page
          <span>
            <LuRefreshCw className="size-5 flex justify-center items-center" />
          </span>
        </button>
      </Link>
    </div>
  );
};
export default ErrorChallenge;
