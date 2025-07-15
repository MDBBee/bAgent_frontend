import { Outlet, useNavigation } from 'react-router-dom';

import Navbar from '../components/homeLayout/Navbar';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <div className="h-screen">
      <Navbar />
      <section className="flex justify-center items-center ">
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          {isPageLoading ? (
            <span className="loading loading-bars loading-xl"></span>
          ) : (
            <Outlet />
          )}
        </SignedIn>
      </section>
    </div>
  );
};
export default HomeLayout;
