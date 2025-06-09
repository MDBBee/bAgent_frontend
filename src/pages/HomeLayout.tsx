import { Outlet } from 'react-router-dom';

import Navbar from '../components/HomeLayout/Navbar';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center py-20">
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <Outlet />
        </SignedIn>
      </section>
    </>
  );
};
export default HomeLayout;
