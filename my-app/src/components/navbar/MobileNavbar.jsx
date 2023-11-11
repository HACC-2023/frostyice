import Link from "next/link";
import { useSession } from 'next-auth/react';

// TODO: use "active" class to highlight current page
// TODO switch to logout instead of events if logged in?
const MobileNavbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="btm-nav md:hidden">
      <Link href="/home" className="hover:brightness-125 hover:bg-accent/10 transition-all">
        <span className="btm-nav-label">Home</span>
      </Link>
      <Link href="/report" className="hover:brightness-125 hover:bg-accent/10 transition-all">
        <span className="btm-nav-label">Report</span>
      </Link>
      <Link href="/data-insights" className="hover:brightness-125 hover:bg-accent/10 transition-all">
        <span className="btm-nav-label">Data</span>
      </Link>
      {session
        ? <Link href="/events" className="hover:brightness-125 hover:bg-accent/10 transition-all">
          Events
        </Link>
        : <Link href="/auth/credentials-signin">
          <span className="btm-nav-label">Login</span>
        </Link>
      }
    </div>
  );
};
export default MobileNavbar;
