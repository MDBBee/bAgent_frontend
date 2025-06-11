import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Error from './components/Error';
import GenerateChallenges from './pages/GenerateChallenges';
import ErrorElement from './components/ErrorElement';
import ChallengesHistory from './pages/ChallengesHistory';
import SingleChallenge from './components/SingleChallenge';
import ClerkProviderContext from './auth/ClerkProvider';
import Login from './auth/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <GenerateChallenges />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'history',
        element: <ChallengesHistory />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'history/:id',
        element: <SingleChallenge />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <ClerkProviderContext>
      <RouterProvider router={router} />;
    </ClerkProviderContext>
  );
}

export default App;
