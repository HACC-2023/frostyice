const Sidebar = ({ role = "public" }) => {
  const publicSidebarItems = (
    <>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </a>
      </li>
      <li>
        <a>Report</a>
      </li>
      <li>
        <a>Data</a>
      </li>
      <li>
        <a>Login</a>
      </li>
    </>
  );

  const organizationSidebarItems = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>Organization Dashboard</a>
      </li>
      <li>
        <a>Report Event</a>
      </li>
      <li>
        <a>Manage Events</a>
      </li>
      <li>
        <a>Data Insights</a>
      </li>
      <li>
        <a>Threads</a>
      </li>
    </>
  );

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {role === "public" && publicSidebarItems}
          {role === "organization" && organizationSidebarItems}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
