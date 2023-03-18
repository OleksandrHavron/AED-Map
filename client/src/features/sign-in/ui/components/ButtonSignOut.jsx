import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { socketAuthClose } from 'shared/websocket';
import { signOut } from 'shared/store/user/actions';
import { useButtonSignOutStyles } from 'features/sign-in/model/use-styles';
import {
  fetchDefs,
  clearData
} from 'shared/store/defs/actions';

import ConfirmationModalWrapper from 'shared/ui/ConfirmationModalWrapper';

const CustomButton = ({ handleOpen }) => {
  const classes = useButtonSignOutStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={handleOpen}
    >
      Вийти з особистого кабінету
    </Button>
  );
};

CustomButton.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

const ButtonSignOut = ({
  signOutSubmit,
  fetchDefItems,
  clearDefItems
}) => {
  const handleSignOut = () => {
    signOutSubmit();
    socketAuthClose();
    clearDefItems();
    fetchDefItems();
  };

  return (
    <ConfirmationModalWrapper
      ButtonOpen={CustomButton}
      confirmHandle={handleSignOut}
      message="Дійсно бажаєте вийти з особистого кабінету?"
      messageAlert="Вихід успішно здійснено"
    />
  );
};

ButtonSignOut.propTypes = {
  signOutSubmit: PropTypes.func.isRequired,
  fetchDefItems: PropTypes.func.isRequired,
  clearDefItems: PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
  signOutSubmit: () => dispatch(signOut()),
  fetchDefItems: () => dispatch(fetchDefs()),
  clearDefItems: () => dispatch(clearData())
}))(ButtonSignOut);
