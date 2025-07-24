// import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import ThemeToggle from '../homeLayout/ThemeToggle';
import { Link } from 'react-router-dom';
import { LiaSignInAltSolid } from 'react-icons/lia';
import { useUserStore } from '../../store/user_store';
import SignedIn from '../../auth/SignedIn';
import { useQuestionStore } from '../../store/questionaire_store';
import { useEffect } from 'react';

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
      <ThemeToggle />
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
// // import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
// import ThemeToggle from '../homeLayout/ThemeToggle';
// import { Link } from 'react-router-dom';
// import { LiaSignInAltSolid } from 'react-icons/lia';

// const NavbarRight = ({ className }: { className?: string }) => {
//   return (
//     <div className={`${className} flex items-center justify-center gap-2`}>
//       {/* Theme */}
//       <ThemeToggle />
//       {/* Auth */}
//       <SignedOut>
//         <Link to="/login" className="btn text-3xl">
//           <LiaSignInAltSolid className="text-3xl" />
//         </Link>
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </div>
//   );
// };
// export default NavbarRight;
