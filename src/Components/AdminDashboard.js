import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import AdminProductAdd from './AdminProductAdd';

const AdminDashboard = ({ isAdmin }) => {
  return (
    <Container className="mt-5">
      {isAdmin ? (
        <div>
          <h1>Admin Dashboard</h1>
          <p>Only admins can see this tool.</p>
          <AdminProductAdd />
        </div>
      ) : (
        <div>
          <h1>Access Denied</h1>
          <p>
            You do not have access to this tool. Try logging into an account
            with administrator privileges.
          </p>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isAdmin: !!state.auth.isAdmin,
  };
};

export default connect(mapStateToProps)(AdminDashboard);
