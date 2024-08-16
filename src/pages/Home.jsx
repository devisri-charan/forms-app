import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center p-20 bg-white m-auto rounded-xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to Forms Website</h1>
        <p className="text-lg mb-8 max-w-xl">
          Streamline your data collection with our powerful forms. Easy to use, highly customizable, and built to scale.
        </p>
        <div className="flex space-x-4">
          <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-500 transition duration-300 shadow-lg">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-xl hover:bg-green-600 transition duration-300 shadow-lg">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
