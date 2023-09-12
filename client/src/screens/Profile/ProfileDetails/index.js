import React, { useState, useRef } from 'react';

import './style.css';

export default function ProfileDetails() {
  return (
    <div className="dashboard-item-right-section profile-details">
      <div className="profile-section profile-right">
        <div className="profile-right-section">
          <img
            src="https://unsplash.it/100"
            className="profile-picture"
            alt=""
          />
          <div className="profile-name-job">
            <p className="profile-name">Austin Haley</p>
            <p className="profile-job">Software Engineer</p>
          </div>
          <div className="profile-edit-button">Edit</div>
        </div>
        {/* <div className="profile-right-section flex-column">
          <div className="profile-right-top">
            <p className="profile-right-top-text">Personal Information</p>
            <div className="profile-edit-button">Edit</div>
          </div>
          <div className="personal-information">
            <div className="information-block">
              <p className="information-label">First Name</p>
              <p className="information-data">Austin</p>
            </div>
            <div className="information-block">
              <p className="information-label">Last Name</p>
              <p className="information-data">Hayley</p>
            </div>
            <div className="information-block">
              <p className="information-label">Email</p>
              <p className="information-data">hello@austinhayley.com</p>
            </div>
            <div className="information-block">
              <p className="information-label">First Name</p>
              <p className="information-data">Hayley</p>
            </div>
            <div className="information-block">
              <p className="information-label">First Name</p>
              <p className="information-data">Hayley</p>
            </div>
          </div>
        </div> */}
        <div className="profile-right-section">
          <div className="personal-information">
            <div className="frame">
              <div className="topic-wrapper">
                <div className="topic">
                  <div className="text-wrapper">Personal Information</div>
                </div>
              </div>
              <div className="div">
                <div className="frame-2">
                  <div className="div-2">
                    <div className="text-wrapper-2">First Name</div>
                    <div className="text-wrapper-3">Austin</div>
                  </div>
                  <div className="div-2">
                    <div className="text-wrapper-2">Email</div>
                    <div className="text-wrapper-3">austin_hay@gmail.com</div>
                  </div>
                  <div className="div-2">
                    <div className="text-wrapper-2">Supervisor Name</div>
                    <div className="text-wrapper-3">Pasindu Sankalpa</div>
                  </div>

                  <div className="div-2">
                    <div className="text-wrapper-2">Nationality</div>
                    <div className="text-wrapper-3">Sinhala</div>
                  </div>
                </div>
                <div className="frame-2">
                  <div className="div-2">
                    <div className="text-wrapper-2">Last Name</div>
                    <div className="text-wrapper-3">Haley</div>
                  </div>
                  <div className="div-2">
                    <div className="text-wrapper-2">level</div>
                    <div className="text-wrapper-3">level 1</div>
                  </div>
                  <div className="div-2">
                    <div className="text-wrapper-2">Supervisor Id</div>
                    <div className="text-wrapper-3">003</div>
                  </div>

                  <div className="div-2">
                    <div className="text-wrapper-2">Role</div>
                    <div className="text-wrapper-3">HR Manager</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-more-button">More</div>
          </div>
        </div>
        <div className="profile-right-section-bottom">
          <div className="profile-right-top">
            <p className="profile-right-top-text">Custom Attribute</p>
          </div>
          <div className="professional-information">
            <div className="information-block">
              <p className="information-label">Attribute Name</p>
              <p className="information-data">Nationality</p>
            </div>
            <div className="information-block">
              <p className="information-label">Attribute Value</p>
              <p className="information-data">Sinhala</p>
            </div>
          </div>
          <div className="profile-set-button">Set</div>
        </div>
      </div>
    </div>
  );
}
