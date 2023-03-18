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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const useResetPasswordStyles = makeStyles(theme => ({
  background: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paperOuter: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(8, 1.5)
  },
  paperInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export {
  useFormStyles,
  useFooterStyles,
  useHeaderStyles,
  useResetPasswordStyles
};
