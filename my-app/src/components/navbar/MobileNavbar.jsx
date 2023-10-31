import Link from 'next/link';
import styles from '../navbar/styles/MobileNavbar.module.css';
// import { useSession } from 'next-auth/react';

const MobileNavbar = () => {
  return (
    <div className={styles.mobileFooterStyle}>
      <ul class='flex'>
        <li class='flex-1 mr-2'>
          <Link
            href='/'
            className='text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4'>
            HOME
          </Link>
        </li>
        <li class='flex-1 mr-2'>
          <a
            class='text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4'
            href='#'>
            REPORT
          </a>
        </li>
        <li class='flex-1 mr-2'>
          <a
            class='text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4'
            href='#'>
            DATA
          </a>
        </li>
        <li class='flex-1 mr-2'>
          <a
            class='text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4'
            href='#'>
            LOGIN
          </a>
        </li>
      </ul>
    </div>
  );
};
export default MobileNavbar;
