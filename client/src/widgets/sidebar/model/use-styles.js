import { makeStyles } from '@material-ui/core/styles';
import { sidebarWidth } from '../lib/constants';

const useSidebarStyles = makeStyles({
  sidebarStyle: ({ visible }) => ({
    display: visible ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: sidebarWidth,
    padding: 20,
    maxHeight: '100vh',
    flexShrink: 0,
    backgroundColor: '#282c34'
  }),
  addButtonStyle: {
    marginTop: 10,
    width: '100%'
  },
  linkStyle: {
    width: '100%',
    marginTop: 10,
    flexShrink: 0,
    textDecoration: 'none'
  }
});

const useSidebarMobileStyles = makeStyles({
  sidebarStyle: {
    position: 'fixed',
    left: '0',
    width: '100%',
    padding: 24,
    height: '100px',
    backgroundColor: 'rgba(36, 36, 36, 1)',
    zIndex: '10'
  },
  sidebarHeader: {
    height: '24px',
    width: '24px',
    position: 'absolute',
    left: '16px',
    top: '36px'
  }
});

export { useSidebarStyles, useSidebarMobileStyles };
