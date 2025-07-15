import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import notfound from '../assets/not-found-error-alert-svgrepo-com.png';

const ErrorElement = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <img src={notfound} alt="Out of quota" className="h-[60%] w-[30%]" />

        <h2 className="text-2xl font-bold">Oops !!! {error.statusText}</h2>
        <p>Status Code: {error.status}</p>
        <p>
          Go back to homePage{' '}
          <Link to="/" className="link link-primary text-lg">
            Click me
          </Link>
        </p>
      </div>
    );
  }
};
export default ErrorElement;
