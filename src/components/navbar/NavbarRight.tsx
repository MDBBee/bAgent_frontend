import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import ThemeToggle from '../homeLayout/ThemeToggle';
import { Link } from 'react-router-dom';
import { LiaSignInAltSolid } from 'react-icons/lia';

const NavbarRight = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex items-center justify-center gap-2`}>
      {/* Theme */}
      <ThemeToggle />
      {/* Auth */}
      <SignedOut>
        <Link to="/login" className="btn text-3xl">
          <LiaSignInAltSolid className="text-3xl" />
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
export default NavbarRight;
