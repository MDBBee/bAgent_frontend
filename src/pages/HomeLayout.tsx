import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Login from '../auth/LoginForm';
import { useUserStore } from '../store/user_store';
import { motion, AnimatePresence } from 'motion/react';
import SignUpForm from '../auth/SignUpForm';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const { login, signUp, authStart, setAuthStart } = useUserStore();

  return (
    <div className="h-screen relative">
      <Navbar />
      <AnimatePresence mode="wait">
        {/* Sign-In, sign-up with social */}
        {authStart && (
          <>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '90%', opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { delay: 0.3 } }}
              transition={{ type: 'tween' }}
              key="overlay"
              className="absolute backdrop-blur-lg size-full z-20"
              onClick={setAuthStart}
            ></motion.div>
            <div>
              {authStart && !login && <Login />}
              {authStart && signUp && <SignUpForm />}
            </div>
          </>
        )}
      </AnimatePresence>
      <section className="flex justify-center items-center ">
        {isPageLoading ? (
          <span className="loading loading-bars loading-xl"></span>
        ) : (
          <Outlet />
        )}
      </section>
    </div>
  );
};
export default HomeLayout;
