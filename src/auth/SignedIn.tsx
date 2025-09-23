import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user_store';
import { toast } from 'react-toastify';
import { LuLoaderPinwheel } from 'react-icons/lu';
import { useQuestionStore } from '../store/questionaire_store';

const SignedIn = () => {
  const { user, logOutUser, isUserLoading } = useUserStore();
  const { resetChallengeRound } = useQuestionStore();
  const navigate = useNavigate();
  const alphaLogo = user?.email?.split('')[0].toLocaleUpperCase() || 'A';

  return (
    <div className="dropdown dropdown-left">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-neutral btn-circle border-4 text-xl border-secondary flex justify-center items-center"
      >
        {alphaLogo}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <div className="m-4">
          <h2 className="font-bold">{user?.email?.split('@')[0]}</h2>
          <p className="text-base-content">{user?.email}</p>
        </div>
        <button></button>
        <button
          onClick={() =>
            toast(
              'This Feature[User Profile] is currently unavailable- MVP version'
            )
          }
          className="w-full bg-base-200 hover:cursor-pointer hover:bg-base-300 p-3 font-semibold"
        >
          User Profile
        </button>
        <button
          onClick={() =>
            toast(
              'This Feature[Admin Bench] is currently unavailable- MVP version'
            )
          }
          className="w-full bg-base-200 hover:cursor-pointer hover:bg-base-300 p-3 font-semibold"
        >
          Admin Bench
        </button>
        {/* <Link to="/login" className="btn text-sm">
          Admin Bench
        </Link> */}
        <button
          className="btn text-sm"
          onClick={() => {
            logOutUser();
            resetChallengeRound();
            toast('Logged out user');
            navigate('/');
          }}
        >
          {isUserLoading ? (
            <LuLoaderPinwheel className="animate-spin size-5" />
          ) : (
            'SignOut'
          )}
        </button>
      </ul>
    </div>
  );
};
export default SignedIn;
