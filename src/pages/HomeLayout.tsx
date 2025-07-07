import { Outlet } from 'react-router-dom';

import Navbar from '../components/homeLayout/Navbar';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

const HomeLayout = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <section className="flex justify-center items-center">
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <Outlet />
        </SignedIn>
      </section>
    </div>
  );
};
export default HomeLayout;
