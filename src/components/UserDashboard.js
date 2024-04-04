import React from 'react';

const UserDashboard = ({ user }) => {
  return (
    <div className="user-dashboard">
      <h2>Account</h2>
      <div className="user-detail">
        <strong>Customer ID</strong>
        <div>{user.id}</div>
      </div>

      <div className="user-detail">
        <strong>Name</strong>
        <div>{user.firstName} {user.lastName} </div>
      </div>

      <div className="user-detail">
        <strong>Email address</strong>
        <div>{user.email} </div>
      </div>
    </div>
  );
};

export default UserDashboard;
