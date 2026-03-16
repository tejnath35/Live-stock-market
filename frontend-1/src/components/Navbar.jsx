import { NavLink, useNavigate } from "react-router";

function Navbar() {

  const navigate = useNavigate();

  // check login
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    alert("logout successful")
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-[#020617] text-white px-10 py-6 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold text-purple-400">
        TradeSim
      </h1>

      <div className="space-x-6">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 font-bold py-1 rounded-lg hover:text-purple-400 ${
              isActive ? "bg-purple-600 shadow-lg" : ""
            }`
          }
        >
          Home
        </NavLink>

        {token && (
          <>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-bold px-3 py-1 rounded-lg hover:text-purple-400 ${
                  isActive ? "bg-purple-600 shadow-lg" : ""
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `font-bold px-3 py-1 rounded-lg hover:text-purple-400 ${
                  isActive ? "bg-purple-600 shadow-lg" : ""
                }`
              }
            >
              Portfolio
            </NavLink>

            <button
              onClick={handleLogout}
              className="font-bold px-3 py-1 rounded-lg hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
           <NavLink
              to="/market"
              className={({ isActive }) =>
                `font-bold px-3 py-1 rounded-lg hover:text-purple-400 ${
                  isActive ? "bg-purple-600 shadow-lg" : ""
                }`
              }
            >
              Market
            </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `font-bold px-3 py-1 rounded-lg hover:text-purple-400 ${
                isActive ? "bg-purple-600 shadow-lg" : ""
              }`
            }
          >
            Login/Register
          </NavLink>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;