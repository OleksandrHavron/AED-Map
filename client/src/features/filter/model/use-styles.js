import { makeStyles } from '@material-ui/core/styles';
import {
  filterWidth,
  sidebarWidth
} from '../lib/constants';

const useFilterStyles = makeStyles({
  filterFadeTransitionEnter: {
    opacity: 0,
    transform: 'translateX(-150px)'
  },
  filterFadeTransitionEnterActive: {
    opacity: 1,
    transform: 'translateX(0)',
    transition:
      'opacity 0.5s ease, transform 0.5s ease-in-out'
  },
  filterFadeTransitionExit: {
    opacity: 1
  },
  filterFadeTransitionExitActive: {
    opacity: 0,
    transform: 'translateX(-150px)',
    transition:
      'opacity 0.5s ease, transform 0.5s ease-in-out'
  }
});

const useFilterFormHeaderStyles = makeStyles(theme => ({
  avatar: {
    margin: `${theme.spacing(1)}px auto`,
    backgroundColor: '#7986cb'
  }
}));

const useFormStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0 25px',
    marginTop: 30,
    overflowY: 'auto'
  },
  inputs: {
    margin: theme.spacing(1),
    width: '100%'
  }
}));

const useFormButtonsStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const useFilterFormikStyles = makeStyles({
  container: {
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    left: sidebarWidth,
    width: filterWidth,
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '5px 0 10px -2px black',
    zIndex: 20
  }
});

export {
  useFormStyles,
  useFilterStyles,
  useFormButtonsStyles,
  useFilterFormikStyles,
  useFilterFormHeaderStyles
};
