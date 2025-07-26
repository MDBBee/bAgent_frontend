import AppLogo from '../components/AppLogo';
import { useUserStore } from '../store/user_store';
import { motion, useAnimate, stagger } from 'motion/react';
import * as z from 'zod';
import { toast } from 'react-toastify';
import { LuLoaderPinwheel } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export const SignUpSchema = z
  .object({
    email: z.email('Invalid email, please cross-check'),
    password: z.string().min(8, 'Password cannot be less than 8 characters!'),
    confirmPassword: z
      .string()
      .min(8, 'Password cannot be less than 8 characters!'),
  })
  .refine(
    (val) => {
      return val.password === val.confirmPassword;
    },
    { message: 'Password mismatch. confirmPassword and password must be same!' }
  );

const SignUpForm = () => {
  const { signUpUser, setLogin, isUserLoading, setAuthStart } = useUserStore();
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();

  const handleFormSubmition = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;

    try {
      SignUpSchema.parse({ email, password, confirmPassword });

      await signUpUser({ email, password });
      toast.success('Accout created successfully!');

      setAuthStart();
      setLogin();
      navigate('/agentQ');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const path =
          (error.issues[0].path[0] as string) || `password, #confirmPassword`;
        const message = error.issues[0].message;
        console.log('PATH', path, 'MSS', message);

        toast.error(message);
        animate(
          `#${path}`,
          {
            x: [-20, 0, 20, 10, -10, 0],
            borderColor: ['#be3434', '#bcaaff', '#cc1717'],
          },
          { type: 'keyframes', delay: stagger(0.2) }
        );
      } else {
        console.log(JSON.stringify(error, null, 2));
      }
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
      exit={{ y: -50, opacity: 0 }}
      key="loginForm"
      className="space-y-2 w-[30rem] h-[34rem] border-2 rounded-xl absolute top-[50%] left-1/2 -translate-x-[50%] -translate-y-[50%] p-4 text-center z-20"
    >
      <AppLogo size="h-20 w-25" />
      <h2 className="font-bold text-2xl">Create An Account</h2>
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
            defaultValue={'max@mail.com'}
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
            defaultValue="12345678"
          />
        </fieldset>
        <fieldset className="fieldset w-full mb-4">
          <legend className="fieldset-legend text-left text-sm">
            Retype-Password
          </legend>
          <input
            type="password"
            className="input w-full "
            placeholder="Type here"
            name="confirmPassword"
            id="confirmPassword"
            defaultValue="12345678"
          />
        </fieldset>
        <button className="btn btn-soft w-full " type="submit">
          {isUserLoading ? (
            <span className="flex justify-center items-center">
              Signing in...
              <LuLoaderPinwheel className="animate-spin" />
            </span>
          ) : (
            'Sign Up'
          )}
        </button>
      </motion.form>
      <p className="">
        Already have an account?{' '}
        <button className="btn btn-soft btn-success" onClick={setLogin}>
          Sign In
        </button>
      </p>
    </motion.div>
  );
};
export default SignUpForm;
