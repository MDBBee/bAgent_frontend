import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user_store';
import { toast } from 'react-toastify';
import { LuLoaderPinwheel } from 'react-icons/lu';

const SignedIn = () => {
  const { user, logOutUser, isUserLoading } = useUserStore();
  const navigate = useNavigate();
  const alphaLogo = user?.email?.split('')[0].toLocaleUpperCase() || 'A';

  return (
    <div className="dropdown dropdown-center">
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
        <Link to="/login" className="btn text-sm ">
          User Profile
        </Link>
        <Link to="/login" className="btn text-sm">
          Admin Bench
        </Link>
        <button
          className="btn text-sm"
          onClick={() => {
            logOutUser();
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
