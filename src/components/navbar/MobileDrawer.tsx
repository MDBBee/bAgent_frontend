import { NavLink } from 'react-router-dom';
import NavbarRight from './NavbarRight';

const MobileDrawer = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4 ">
          {/* Sidebar content here */}
          <li className="mb-6 flex ">
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-primary"
            >
              Close
            </label>
          </li>
          <NavLink
            to="/"
            className="capitalize mr-4 bg-base-100 py-2 px-4 rounded-md w-1/2"
          >
            Challenges
          </NavLink>

          <NavLink
            to="/history"
            className="capitalize bg-base-100 py-2 px-4 rounded-md w-1/2"
          >
            History
          </NavLink>

          <NavbarRight className="justify-start ml-4 mt-4" />
        </ul>
      </div>
    </div>
  );
};
export default MobileDrawer;
