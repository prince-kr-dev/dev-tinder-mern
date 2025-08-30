import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <nav className="fixed navbar bg-base-300 shadow-sm px-4 md:px-10 z-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-md font-medium">Welcome, {user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="profile" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/viewprofile">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <Link to="/connections">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
