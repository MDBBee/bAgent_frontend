import { NavLink } from 'react-router-dom';

const AppLogo = ({ size }: { size?: string }) => {
  return (
    <NavLink to="/" className={`btn btn-neutral text-3xl ${size}`}>
      bA
    </NavLink>
  );
};
export default AppLogo;
