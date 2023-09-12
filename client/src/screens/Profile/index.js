import React from 'react';

import Menu from '../../components/Menu';
import ProfileDetails from './ProfileDetails';
import Header from '../../components/Header';

import './style.css';

export default function ProfileScreen() {
  return (
    <div className="profile">
      <Menu />
      <div className="dashboard-item-header dashboard-search">Austin Haley</div>
      <ProfileDetails />
    </div>
  );
}
