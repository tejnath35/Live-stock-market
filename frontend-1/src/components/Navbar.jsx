import { NavLink, useNavigate } from "react-router";

function Navbar() {

  const navigate = useNavigate();

  // check login
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    alert("logout successful")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-[#020617] text-white px-4 py-4 shadow-lg sm:px-10 sm:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-purple-400 sm:text-2xl">
          TradeSim
        </h1>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 text-sm font-bold rounded-lg hover:text-purple-400 sm:text-base ${
                isActive ? "bg-purple-600 shadow-lg" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/market"
            className={({ isActive }) =>
              `px-3 py-1 text-sm font-bold rounded-lg hover:text-purple-400 sm:text-base ${
                isActive ? "bg-purple-600 shadow-lg" : ""
              }`
            }
          >
            Market
          </NavLink>

          {token && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-1 text-sm font-bold rounded-lg hover:text-purple-400 sm:text-base ${
                    isActive ? "bg-purple-600 shadow-lg" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `px-3 py-1 text-sm font-bold rounded-lg hover:text-purple-400 sm:text-base ${
                    isActive ? "bg-purple-600 shadow-lg" : ""
                  }`
                }
              >
                Portfolio
              </NavLink>

              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm font-bold rounded-lg hover:text-red-400 sm:text-base"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-1 text-sm font-bold rounded-lg hover:text-purple-400 sm:text-base ${
                  isActive ? "bg-purple-600 shadow-lg" : ""
                }`
              }
            >
              Login/Register
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;