import { makeStyles } from '@material-ui/core/styles';

const useButtonSignInStyles = makeStyles({
  personIcon: {
    color: '#00A654',
    fontSize: 50,
    marginTop: -8,

    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const useButtonSignOutStyles = makeStyles({
  button: {
    height: 50,
    marginTop: 15
  }
});

const useFooterStyles = makeStyles({
  message: {
    whiteSpace: 'pre-line',
    marginTop: 20
  },
  containerResetPassword: {
    textAlign: 'center',

    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const useFormStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const useHeaderStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

const useSignInModalStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export {
  useFormStyles,
  useHeaderStyles,
  useFooterStyles,
  useSignInModalStyles,
  useButtonSignInStyles,
  useButtonSignOutStyles
};
