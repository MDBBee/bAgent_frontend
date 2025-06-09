import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { LiaSignInAltSolid } from 'react-icons/lia';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-base-300">
      <div className="align-element p-4 flex items-center justify-between">
        {/* Start */}
        <NavLink to="/" className="btn btn-primary text-3xl">
          bA
        </NavLink>
        {/* Middle */}
        <div className="mx-4 flex">
          <NavLink
            to="/"
            className="capitalize mr-4 bg-neutral py-2 px-4 rounded-md"
          >
            Challenges
          </NavLink>
          <NavLink
            to="/history"
            className="capitalize bg-neutral py-2 px-4 rounded-md"
          >
            History
          </NavLink>
        </div>
        {/* End */}
        <SignedOut>
          <Link to="/login" className="btn text-3xl">
            <LiaSignInAltSolid className="text-3xl" />
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
export default Navbar;
