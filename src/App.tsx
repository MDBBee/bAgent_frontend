import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Error from './components/Error';
import GenerateChallenges from './pages/GenerateChallenges';
import ErrorElement from './components/ErrorElement';
import ChallengesHistory from './pages/ChallengesHistory';
import SingleChallenge from './components/SingleChallenge';
import Login from './auth/LoginForm';
import HomePage from './pages/HomePage';

import QuestionContainer from './components/challenges/QuestionContainer';
import HighScore from './components/challenges/HighScore';
import MultiAgent from './pages/MultiAgent';
import Settings from './components/challenges/Settings';
import { useUserStore } from './store/user_store';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'agentq',
        element: <GenerateChallenges />,
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <QuestionContainer />,
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
          {
            path: 'highscore',
            element: <HighScore />,
            errorElement: <ErrorElement />,
          },
          {
            path: 'settings',
            element: <Settings />,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: 'multiAgent',
        element: <MultiAgent />,
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
  const { setUser } = useUserStore();
  useEffect(() => {
    // return;
    setUser();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
