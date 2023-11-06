import { Fragment } from "react";
import { useSession } from "next-auth/react";
import {
  HomeIcon,
  PlusCircleIcon,
  ChartPieIcon,
  RectangleGroupIcon,
  InboxIcon,
  RectangleStackIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [orgName, setOrgName] = useState("");

  useEffect(() => {
    const fetchOrgName = async () => {
      const res = await fetch("/api/mongo/organization/id/" + session.user.orgId);
      const data = await res.json();
      setOrgName(data.name);
    };

    if (session) {
      fetchOrgName();
    }
  }, [session]);

  const publicNav = [
    { label: "Home", icon: HomeIcon, link: "/home" },
    { label: "Report Event", icon: PlusCircleIcon, link: "/report-form" },
    { label: "Data Insights", icon: ChartPieIcon, link: "/data-insights" },
  ];

  const orgMemberNav = [
    ...publicNav,
    { label: "Organization Dashboard", icon: RectangleGroupIcon, link: "/dashboard" },
    { label: "Manage Events", icon: InboxIcon, link: "/manage-events" },
    { label: "Threads", icon: RectangleStackIcon, link: "/threads" },
  ];

  const orgAdminNav = [
    ...orgMemberNav,
    { label: "My Organization", icon: BuildingOfficeIcon, link: "/my-organization" },
  ];

  const adminNav = [
    ...orgAdminNav,
    { label: "Manage Organizations", icon: BuildingOffice2Icon, link: "/manage-organizations" },
  ];

  const NavContainer = () => (
    <ul className="menu p-5 w-72 h-screen sticky top-0 bg-base-200 pt-10 font-medium">
      {!session && <NavContent nav={publicNav} />}
      {session && session.user.role === "org_member" && <NavContent nav={orgMemberNav} />}
      {session && session.user.role === "org_admin" && <NavContent nav={orgAdminNav} />}
      {session && session.user.role === "admin" && <NavContent nav={adminNav} />}
      {session && <div className="divider m-0" />}
      {session && <MenuItem label="Sign out" icon={ArrowLeftCircleIcon} link="/api/auth/signout" />}
    </ul>
  );

  const AccountInfo = () => (
    <>
      {session ? (
        <div className="flex gap-4 m-4">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
              <span className="text-2xl">{session.user.firstName.charAt(0)}</span>
              <span className="text-2xl">{session.user.lastName.charAt(0)}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div>
              {session.user.firstName} {session.user.lastName}
            </div>
            <div>{orgName}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-5">
          <Link href={"/register"} className="bg-primary rounded-full p-3 text-center">
            Create an account
          </Link>
          <Link
            href={"/auth/credentials-signin"}
            className="rounded-full p-3 text-center border-slate-800 border-solid border"
          >
            Log in
          </Link>
        </div>
      )}
    </>
  );

  const NavContent = ({ nav }) => (
    <>
      <AccountInfo />
      {nav.map((navItem) => (
        <MenuItem key={navItem.label} label={navItem.label} icon={navItem.icon} link={navItem.link} />
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
      <div className="hidden lg:block w-min">{status !== "loading" && <NavContainer />}</div>
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
          {status !== "loading" && <NavContainer />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
