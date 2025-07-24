import { NavLink } from 'react-router-dom';

const sideBarLinks = [
  // Absolute path
  { name: 'Challenges', href: '/agentq' },
  // Relative path
  { name: 'History', href: '/agentq/history' },
  // Relative path
  { name: 'Scores', href: '/agentq/highscore' },
  // Relative path
  { name: 'Settings', href: '/agentq/settings' },
];

const SideBarMenu = () => {
  return (
    <div className="flex flex-col h-[30%] min-h-[30vh] justify-around">
      {sideBarLinks.map((sl, i) => (
        <NavLink key={i} to={sl.href}>
          <button className="btn btn-soft btn-secondary w-full">
            {' '}
            {sl.name}
          </button>
        </NavLink>
      ))}
    </div>
  );
};
export default SideBarMenu;
