// Import necessary modules
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserProvider";

// Define the Navbar component
const Navbar = () => {
  // Define necessary state and context variables
  const navigate = useNavigate();
  const { users } = useContext(userContext);
  const location = useLocation()
  const [open, setOpen] = useState(false);

  // This function is called when the user clicks on their name in the navbar
  const handleOpenNavbar = () => {
    setOpen(!open);
  };

  // Retrieve user data from localStorage
  const dataArr = JSON.parse(localStorage.getItem("userData"));

  // This function is called when the user clicks the "Sign out" button
  const handleSignOut = () => {
    // remove data from localStorage
    localStorage.removeItem("userData");
    // Navigate to home page
    navigate("/");
  };

  // Render the Navbar component

  return (
    <nav className="bg-white text-gray-600 py-4 flex justify-between items-center">
      {/* Link to home page */}
      <Link to="#" className="text-xl font-semibold">
        {location.pathname === `/profile/${dataArr.id}` ? "Profile" : ""}
        {location.pathname === `/profile/posts` ? "Posts" : ""}
        {location.pathname === `/profile/gallery` ? "Gallery" : ""}
        {location.pathname === `/profile/todo` ? "ToDo" : ""}
      </Link>

      <div className="flex items-center">
        {/* User profile picture */}
        <div className="mr-4">
          <img
            src={dataArr.profilepicture}
            alt={dataArr.username}
            className="rounded-full w-8 h-8"
          />
        </div>

        {/* Display user name and dropdown menu on larger screens */}
        <div className="hidden md:block">
          <div className="relative">
            <button
              onClick={handleOpenNavbar}
              className="flex items-center"
            >
              <span className="mr-2">{dataArr.name}</span>
            </button>

            {/* Dropdown menu */}
            {open ? (
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                }}
                className="absolute top-10 right-0 bg-white rounded-lg shadow-md p-4 w-[19rem] z-10"
              >
                {/* User information */}
                <div className="block">
                  <img
                    src={dataArr.profilepicture}
                    className="rounded-full w-16 h-16 m-auto"
                    alt={dataArr.username}
                  />
                  <p className="text-xl font-semibold text-gray-700">
                    {dataArr.name}
                  </p>
                  <p className="text-gray-400">{dataArr.email}</p>
                </div>
                <hr />

                {
                  users.slice(0,3).map((user) => (
                    <li key={user.id} className="mb-4 list-none ">
                      {/* Link to the user's profile page */}
                      <Link
                        to={`/profile/${user.id}`}
                        className="block  rounded hover:bg-gray-100 "
                      >
                        <div className="flex items-center pb-4 bg-white">
                          <img
                            src={user.profilepicture}
                            alt={user.username}
                            className="w-11 h-11 rounded-full mr-2"
                          />
                          <div className="font-medium">{user.name}</div>
                        </div>
                        <hr />
                      </Link>
                    </li>
                  ))}

                {/* Sign out button */}
                <div className="block mt-1">
                  <button
                    onClick={handleSignOut}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-[2rem]"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
