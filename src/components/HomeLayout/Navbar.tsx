import { NavLink } from 'react-router-dom';
import NavbarRight from '../navbar/NavbarRight';
import MobileDrawer from '../navbar/MobileDrawer';

const Navbar = () => {
  return (
    <nav className="bg-base-300">
      <div className="align-element p-2 flex items-center justify-between">
        {/* Start */}
        <NavLink to="/" className="btn btn-neutral text-3xl">
          bA
        </NavLink>
        {/* Middle */}
        <div className="mx-4  md:flex hidden">
          <NavLink
            to="/agentQ"
            className={({ isActive }) =>
              `capitalize mr-4 bg-base-100 py-2 px-4 rounded-md btn btn-soft ${
                isActive ? 'btn-info' : ''
              }`
            }
          >
            Challenges
          </NavLink>
          <NavLink
            to="/multiAgent"
            className={({ isActive }) =>
              `capitalize mr-4 bg-base-100 py-2 px-4 rounded-md btn btn-soft ${
                isActive ? 'btn-info' : ''
              }`
            }
          >
            MultiAgent
          </NavLink>
        </div>
        {/* End */}
        <div className=" md:block hidden">
          <NavbarRight />
        </div>
        {/* Mobile */}
        <div className="md:hidden flex-col gap-4 ">
          <MobileDrawer />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
