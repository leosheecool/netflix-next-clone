import React from 'react';
import NavbarItem from './NavbarItem/NavbarItem';
import AccountMenu from './AccountMenu/AccountMenu';
import { getCurrentUser } from '@/apiCallFns/User';
import { useQuery } from '@tanstack/react-query';
import cn from 'classnames';

import styles from './Navbar.module.scss';
import { AiOutlineSearch, AiOutlineBell } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';

const Navbar = () => {
  const { data: user } = useQuery(['currentUser'], {
    queryFn: getCurrentUser
  });

  const [isAccountMenuShown, setIsAccountMenuShown] = React.useState(false);

  return (
    <nav className={styles.container}>
      <div className={styles.linksContainer}>
        <img
          src="/images/logos/Netflix_2015_logo.svg"
          alt="logo"
          className={styles.logo}
        />
        <NavbarItem label="Home" />
        <NavbarItem label="Films" />
        <NavbarItem label="Series" />
        {/* <NavbarItem label="Series" /> */}
      </div>
      <div className={styles.profileSection}>
        <AiOutlineSearch className={styles.icon} />
        <AiOutlineBell className={styles.icon} />
        <div
          className={styles.profileIconContainer}
          onClick={() => setIsAccountMenuShown(!isAccountMenuShown)}
        >
          <img
            src="/images/default-blue.png"
            alt="hea"
            className={styles.profilePicture}
          />
          <BsChevronDown
            className={cn(styles.icon, {
              [styles.reverse]: isAccountMenuShown
            })}
          />
        </div>
        {isAccountMenuShown && (
          <AccountMenu
            user={{
              name: user?.data.name || '',
              profilePicture: '/images/default-blue.png'
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
