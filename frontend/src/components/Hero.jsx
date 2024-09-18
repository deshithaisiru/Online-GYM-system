const Hero = () => {
  return (
    <div className="py-5 bg-gray-100">
      <div className="container mx-auto flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 text-center">
          <h1 className="text-3xl font-bold mb-4">MERN Authentication</h1>
          <p className="text-gray-600 mb-6">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and Tailwind CSS for
            styling.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
