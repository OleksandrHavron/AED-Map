import { makeStyles } from '@material-ui/core/styles';

const useButtonSignUpSendMailStyles = makeStyles({
  button: {
    height: 50,
    marginTop: 25
  }
});

const useFooterStyles = makeStyles({
  message: {
    whiteSpace: 'pre-line'
  }
});

const useFormStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(4, 0, 2)
  }
}));

const useHeaderStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

const useSignUpSendMailModalStyles = makeStyles(() => ({
  container: {
    width: 444
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export {
  useFormStyles,
  useFooterStyles,
  useHeaderStyles,
  useSignUpSendMailModalStyles,
  useButtonSignUpSendMailStyles
};
