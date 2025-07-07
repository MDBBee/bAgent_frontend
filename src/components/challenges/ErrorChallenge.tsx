import { Link } from 'react-router-dom';
import errorimg from '../../../public/undraw_no-data_ig65.svg';
import { useQuestionStore } from '../../store';

const ErrorChallenge = ({ error }: { error: string }) => {
  const { quota } = useQuestionStore();
  return (
    <div className="h-[30rem] flex flex-col justify-center items-center">
      <img src={errorimg} alt="Out of quota" className="h-[60%] w-[60%]" />

      <h2 className="text-2xl font-bold">Oops !!! {error}</h2>
      <p>Current Quota for the day: {quota?.quota_remaining}</p>
      <p>
        Go back to homePage{' '}
        <Link to="/" className="link link-primary text-lg">
          Click me
        </Link>
      </p>
    </div>
  );
};
export default ErrorChallenge;
