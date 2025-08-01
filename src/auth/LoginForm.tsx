import AppLogo from '../components/AppLogo';
import { FcGoogle } from 'react-icons/fc';
import { useUserStore } from '../store/user_store';
import { motion, useAnimate } from 'motion/react';
import * as z from 'zod';
import { toast } from 'react-toastify';
import { LuLoaderPinwheel } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export const LoginSchema = z.object({
  email: z.email('Invalid email, please cross-check'),
  password: z.string().min(8, 'Password cannot be less than 8 characters!'),
});

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const redirectUri = import.meta.env.VITE_API_URL;

const LogInForm = () => {
  const { setSignUp, logInUser, isUserLoading, setAuthStart } = useUserStore();
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();

  const handleFormSubmition = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      LoginSchema.parse({ email, password });
      await logInUser({ email, password });

      setAuthStart();
      navigate('/agentQ');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0] as string;
        const message = error.issues[0].message;
        toast.error(message);
        animate(
          `#${path}`,
          {
            x: [-20, 0, -10, 10, 0],
            borderColor: ['#be3434', '#bcaaff', '#cc1717'],
          },
          { type: 'keyframes' }
        );
      } else if (error instanceof Error) {
        console.log(error.message);
        if (error.message.includes('Failed to fetch')) {
          toast.error(
            'Server is currently unavailable! Sorry for the inconvinience'
          );
        }
        toast.error(error.message);
      }
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      key="loginForm"
      className="space-y-2 md:w-[30rem] md:h-[34rem] border-2 rounded-xl absolute top-[50%] left-1/2 -translate-x-[50%] -translate-y-[50%] p-4 text-center z-20 w-[85%] h-[70%]"
    >
      <AppLogo size="h-20 w-25" />
      <h2 className="font-bold text-2xl">Sign In</h2>
      <p>Sign into your account</p>
      {/* Social sign-in: Google */}
      <button
        className="btn btn-soft btn-success w-[70%] mb-4 text-lg"
        onClick={() => {
          console.log('GOOgle sign in');
          window.location.href = `https://bagent.onrender.com/auth/google/login`;
        }}
      >
        Sign in with <FcGoogle className="size-5" />
      </button>
      <motion.form
        ref={scope}
        onSubmit={handleFormSubmition}
        className="border-t-2"
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-left text-sm">Email</legend>
          <input
            type="text"
            className="input w-full "
            placeholder="Type here"
            name="email"
            id="email"
          />
        </fieldset>
        <fieldset className="fieldset w-full mb-4">
          <legend className="fieldset-legend text-left text-sm">
            Password
          </legend>
          <input
            type="password"
            className="input w-full "
            placeholder="Type here"
            name="password"
            id="password"
          />
        </fieldset>
        <button className="btn btn-soft w-full " type="submit">
          {isUserLoading ? (
            <span className="flex justify-center items-center">
              Logging in...
              <LuLoaderPinwheel className="animate-spin" />
            </span>
          ) : (
            'Log In'
          )}
        </button>
      </motion.form>
      <p>
        Don't have an account?{' '}
        <button className="btn btn-soft btn-success" onClick={setSignUp}>
          Sign Up
        </button>
      </p>
    </motion.div>
  );
};
export default LogInForm;
