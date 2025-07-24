import { Link } from 'react-router-dom';
import landingPage from '../../public/neural-network-3816319_640.png';
import { useUserStore } from '../store/user_store';
import { FaMagento } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';

const HomePage = () => {
  const { setAuthStart, user, logOutUser } = useUserStore();

  return (
    <div className="flex flex-col mx-auto w-6xl px-8 p-2 text-center">
      <h1 className="capitalize text-3xl font-bold mb-4 ">
        Welcome To bAgents. Agent powered assistants
      </h1>
      <p className="capitalize text-xl font-bold mb-8">
        Supercharge Your Research and Test your knowledge with AI-Powered Agents{' '}
      </p>
      <div className="grid md:grid-cols-2 pt-4 gap-8">
        {/* text */}
        <div className="space-y-20 ">
          <p className="text-lg text-justify ">
            Tap into the power of two intelligent agents — a dynamic Question
            Generator and a capable Research Assistant — designed to accelerate
            discovery, deepen understanding, and enhance inquiry. Built for
            curious minds, from student developers to seasoned researchers.
          </p>

          {user ? (
            <div>
              <Link to="/agentQ">
                <button className="btn btn-primary h-10 w-[80%]">
                  Continue <FaMagento className="w-10 h-5 animate-ping" />
                </button>
              </Link>
              <button
                className="btn btn-primary h-10 w-[80%] mt-6"
                onClick={logOutUser}
              >
                Logout
                <AiOutlineLogout className="w-10 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-around mb-4">
              <button
                className="btn btn-outline w-[30%]"
                onClick={setAuthStart}
              >
                Sign[up|in]
              </button>
              <button className="btn btn-outline w-[30%]">Tryout</button>
            </div>
          )}
        </div>
        {/* Image */}
        <div className="h-[60%] w-[80%]">
          <img src={landingPage} alt="Landing page Image" />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
