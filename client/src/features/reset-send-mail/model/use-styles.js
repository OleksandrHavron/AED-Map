import { makeStyles } from '@material-ui/core/styles';

const useFooterStyles = makeStyles({
  message: {
    whiteSpace: 'pre-line'
  }
});

const useHeaderStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

const useFormStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(4, 0, 2)
  }
}));

const useResetSendMailModalStyles = makeStyles(() => ({
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
  useHeaderStyles,
  useFooterStyles,
  useResetSendMailModalStyles
};
