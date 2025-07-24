import NavbarRight from './NavbarRight';
import SideBarMenu from '../challenges/SideBarMenu';
import { FaBraille } from 'react-icons/fa6';
import { FaWindowClose } from 'react-icons/fa';

const MobileDrawer = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          <FaBraille />
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
              <FaWindowClose />
            </label>
          </li>

          <SideBarMenu />

          <NavbarRight className="justify-start ml-4 mt-4" />
        </ul>
      </div>
    </div>
  );
};
export default MobileDrawer;
