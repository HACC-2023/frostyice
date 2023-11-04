import Link from "next/link";
// import { useSession } from 'next-auth/react';

// TODO: use "active" class to highlight current page
// TODO: update links
const MobileNavbar = () => {
  return (
    <div className="btm-nav md:hidden">
      <Link href="/home">
        <button>
          <span className="btm-nav-label">Home</span>
        </button>
      </Link>
      <Link href="/report">
        <button>
          <span className="btm-nav-label">Report</span>
        </button>
      </Link>
      <Link href="/data">
        <button>
          <span className="btm-nav-label">Data</span>
        </button>
      </Link>
      <Link href="/login">
        <button>
          <span className="btm-nav-label">Login</span>
        </button>
      </Link>
    </div>
  );
};
export default MobileNavbar;
