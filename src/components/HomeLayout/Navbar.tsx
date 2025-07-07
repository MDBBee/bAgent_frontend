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
            className="capitalize mr-4 bg-base-100 py-2 px-4 rounded-md"
          >
            Challenges
          </NavLink>
          <NavLink
            to="/history"
            className="capitalize bg-base-100 py-2 px-4 rounded-md"
          >
            History
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
