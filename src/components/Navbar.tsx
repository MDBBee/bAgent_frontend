import { NavLink } from 'react-router-dom';
import NavbarRight from './navbar/NavbarRight';
import MobileDrawer from './navbar/MobileDrawer';
import AppLogo from './AppLogo';
import { useUserStore } from '../store/user_store';

const Navbar = () => {
  const { user } = useUserStore();

  return (
    <nav className="bg-base-300">
      <div className="align-element p-2 flex items-center justify-between">
        {/* Start */}
        <AppLogo />
        {/* Middle */}
        {user && (
          <div className="mx-4 flex justify-center items-center w-[10%]">
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
        )}
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
