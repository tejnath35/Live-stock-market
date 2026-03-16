import { useState } from "react";
import { Link } from "react-router";

function Signup() {

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    console.log({
      name,
      dob,
      age,
      email,
      password
    });

    alert("Signup form submitted!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-96 transform hover:scale-105 transition">

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleSignup}>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />

          {/* Date of Birth */}
          <input
            type="date"
            className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDob(e.target.value)}
          />

          {/* Age */}
          <input
            type="number"
            placeholder="Age"
            className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAge(e.target.value)}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;