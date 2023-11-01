import { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import { HomeIcon, PlusCircleIcon, ChartPieIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// TODO: update elements depending on user's role
// TODO: change icons
// TODO: add sign out button if logged in
const Navbar = () => {
  const { data: session } = useSession();

  // have state regarding user's role. this will determine what navbar to show

  const publicNav = [
    { label: "Home", icon: HomeIcon, link: "/home" },
    { label: "Report Event", icon: PlusCircleIcon, link: "/report-event" },
    { label: "Data Insights", icon: ChartPieIcon, link: "/data-insights" },
  ];

  const orgMemberNav = [
    ...publicNav, // might change if report and report event and data and data insights are different

    { label: "Organization Dashboard", icon: PlusCircleIcon, link: "/organization-dashboard" },
    { label: "Manage Events", icon: UserCircleIcon, link: "/manage-events" },
    { label: "Threads", icon: UserCircleIcon, link: "/threads" },
  ];

  const orgAdminNav = [
    ...orgMemberNav,
    { label: "My Organization", icon: PlusCircleIcon, link: "/my-organization" },
  ];

  const adminNav = [
    ...orgAdminNav,
    { label: "Manage Organizations", icon: PlusCircleIcon, link: "/manage-organizations" },
  ];

  // check role: "session && session.user.role === "org_admin" && "
  const NavContainer = () => (
    <ul className="menu p-5 w-80 min-h-full bg-base-200 pt-14">
      {!session && <NavContent nav={publicNav} />}
      {<NavContent nav={orgMemberNav} />}
      {<NavContent nav={orgAdminNav} />}
      {<NavContent nav={adminNav} />}
    </ul>
  );

  // TODO: change labels
  const AccountInfo = () => (
    <div className="flex gap-2 m-2">
      <UserCircleIcon className="h-12 w-12" />
      <div className="flex flex-col justify-center">
        <div>
          name
        </div>
        <div>
          org name
        </div>
      </div>

    </div>
  );

  // TODO: change naming?
  const UserInfo = () => <>{!session ? <AccountInfo /> : <MenuItem label={"Login"} link={"/login"} />}</>;

  const NavContent = ({ nav }) => (
    <>
      <UserInfo />
      {nav.map((navItem) => (
        <MenuItem label={navItem.label} icon={navItem.icon} link={navItem.link} />
      ))}
    </>
  );

  const MenuItem = ({ label, icon, link }) => {
    const IconElement = icon;
    const ICON_HEIGHT = 20;

    return (
      <li className="m-1">
        <Link href={link}>
          {icon && <IconElement height={ICON_HEIGHT} />}
          <span>{label}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      <div className="hidden lg:block w-60">
        <NavContainer />
      </div>
      <div className="drawer hidden md:block lg:hidden">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
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
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <NavContainer />
        </div>
      </div>
    </>
  );
};

export default Navbar;
