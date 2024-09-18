import { useState } from 'react'; // Import useState for managing dropdown state
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Removed Link for conditional navigation
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // State to control dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout successful!');
    } catch (err) {
      console.error(err);
      toast.error('Logout failed');
    }
  };

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to handle navigation based on user role
  const handleNavigation = () => {
    if (userInfo) {
      // If user is an admin, navigate to the admin dashboard
      if (userInfo.isAdmin) {
        navigate('/admin-dashboard');
      } 
      // If user is a member, navigate to the member dashboard
      else {
        navigate('/member-dashboard');
      }
    } else {
      // If not logged in, navigate to the home page
      navigate('/');
    }
  };

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Replaced Link with onClick for dynamic navigation */}
        <button
          onClick={handleNavigation}
          className="text-white text-xl font-semibold focus:outline-none"
        >
          MERN Auth
        </button>
        <div className="flex items-center space-x-4">
          {userInfo ? (
            <div className="flex items-center space-x-4">
              {/* Admin Panel link only visible if user is an admin */}
              {userInfo.isAdmin && (
                <button
                  onClick={() => navigate('/admin-dashboard')}
                  className="text-white text-sm font-medium"
                >
                  Admin Panel
                </button>
              )}

              {/* User name and dropdown */}
              <div className="relative">
                {/* Button to toggle dropdown */}
                <button
                  className="text-white font-medium focus:outline-none"
                  onClick={toggleDropdown}
                >
                  {userInfo.name}
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={() => navigate('/profile')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-white text-sm flex items-center"
              >
                <FaSignInAlt className="mr-1" />
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="text-white text-sm flex items-center"
              >
                <FaSignOutAlt className="mr-1" />
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
