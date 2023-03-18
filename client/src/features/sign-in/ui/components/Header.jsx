import React from 'react';
import { LockOutlined } from '@material-ui/icons';
import { Avatar, Typography } from '@material-ui/core';
import { useHeaderStyles } from 'features/sign-in/model/use-styles';

const Header = () => {
  const classes = useHeaderStyles();

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Увійти
      </Typography>
    </>
  );
};

export default Header;
