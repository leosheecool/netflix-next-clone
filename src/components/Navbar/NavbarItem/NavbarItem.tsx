import React from 'react';
import styles from './NavbarItem.module.scss';

type Props = {
  label: string;
};

const NavbarItem = ({ label }: Props) => {
  return <div className={styles.container}>{label}</div>;
};

export default NavbarItem;
