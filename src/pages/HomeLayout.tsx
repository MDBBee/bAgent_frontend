import { Navigate, Outlet } from 'react-router-dom';

import Navbar from '../components/HomeLayout/Navbar';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center py-20">
        <SignedOut>
          <Navigate to="/login" replace />
        </SignedOut>
        <SignedIn>
          <Outlet />
        </SignedIn>
      </section>
    </>
  );
};
export default HomeLayout;
