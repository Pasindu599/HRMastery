import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Logo from '../../assets/logos/Prepee logo SVG-02.svg'
import './style.css';

export default function Menu() {
  return (
    <div className="dashboard-item dashboard-menu">
      <img className="menu-logo" alt="HRMastery" />
      <div className="menu-buttons">
        <div className="menu-button menu-button-selected">User Profile</div>
        <div className="menu-button">Employee</div>
        <div className="menu-button">Organization</div>
        <div className="menu-button">Get Leave</div>
        <div className="menu-button">Give Leave</div>
        <div className="menu-button">Report Center</div>
      </div>

      <div className="menu-button">Log Out</div>
    </div>
  );
}
