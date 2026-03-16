import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password
        }
      );

      alert("Login Successful!");

      // save token
      localStorage.setItem("token", res.data.token);

      // save user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect to dashboard
      navigate("/dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Login failed");

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-900 via-black to-gray-900">

      <div className="bg-white rounded-2xl shadow-2xl p-10 h-80 w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            className="w-full border p-2 rounded mb-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded mb-4"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          New user?{" "}
          <Link to="/signup" className="text-blue-500">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;