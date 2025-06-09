import { SignIn } from '@clerk/react-router';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn forceRedirectUrl={'/'} />
    </div>
  );
};
export default Login;
