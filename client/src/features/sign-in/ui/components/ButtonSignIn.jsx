import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useButtonSignInStyles } from 'features/sign-in/model/use-styles';

const ButtonSignIn = ({ user }) => {
  const classes = useButtonSignInStyles();

  return (
    <>
      {user && (
        <Link to="/account">
          <Tooltip title="Особистий кабінет">
            <PersonIcon
              fontSize="large"
              className={classes.personIcon}
            />
          </Tooltip>
        </Link>
      )}
    </>
  );
};

ButtonSignIn.defaultProps = {
  user: null
};

ButtonSignIn.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

export default connect(state => ({
  user: state.user.user
}))(ButtonSignIn);
