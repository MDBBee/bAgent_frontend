import landingPage from '../../public/neural-network-3816319_640.png';
const HomePage = () => {
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
          <div className="flex items-center justify-around mb-4">
            <button className="btn btn-outline w-[30%] ">Sign[up|in]</button>
            <button className="btn btn-outline w-[30%]">Tryout</button>
          </div>
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
