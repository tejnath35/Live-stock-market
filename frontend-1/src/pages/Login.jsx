import { Link, useNavigate } from "react-router"
function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">

      <div className="bg-white rounded-2xl shadow-2xl p-10 h-80 w-96 transform hover:scale-105 transition">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Email"
        />

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Login
        </button>

         <p className="text-center mt-4 text-gray-600">
          New user?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;