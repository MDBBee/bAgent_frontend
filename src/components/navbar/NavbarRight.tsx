import { LiaSignInAltSolid } from 'react-icons/lia';
import { useUserStore } from '../../store/user_store';
import SignedIn from '../../auth/SignedIn';
import { useQuestionStore } from '../../store/questionaire_store';
import { useEffect } from 'react';
import ToggleButton from '../ToggleButton';

const NavbarRight = ({ className }: { className?: string }) => {
  const { user, setUser, setAuthStart } = useUserStore();
  const { quota } = useQuestionStore();

  // Logic for refreshing the userIcon after a while of inactivity
  // Not efficient
  useEffect(() => {
    setUser();
  }, [quota]);

  return (
    <div className={`${className} flex items-center justify-center gap-2`}>
      {/* Theme */}
      {/* <ThemeToggle /> */}
      <ToggleButton />
      {/* Auth */}
      {user ? (
        <SignedIn />
      ) : (
        <button onClick={setAuthStart} className="btn text-3xl">
          <LiaSignInAltSolid className="text-3xl" />
        </button>
      )}
    </div>
  );
};
export default NavbarRight;
