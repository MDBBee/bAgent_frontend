import { SignIn } from '@clerk/react-router';

const Login = () => {
  return (
    <div className="flex justify-center items-center max-h-screen">
      <SignIn forceRedirectUrl={'/'} />
    </div>
  );
};
export default Login;
