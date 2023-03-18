import { makeStyles } from '@material-ui/core/styles';
import { sidebarWidth } from 'widgets/sidebar/lib/constants';

const useMapHolderStyles = makeStyles(() => ({
  mapContainer: ({ visible }) => ({
    position: 'relative',
    height: '100vh',
    width: visible
      ? `calc(100vw - ${sidebarWidth})`
      : '100vw',
    overflow: 'hidden'
  }),
  map: {
    display: 'flex',
    height: '100vh',
    width: '100vw'
  },
  showIcon: {
    position: 'fixed',
    height: 64,
    margin: '10px 0 0 10px',
    zIndex: 1,
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    borderRadius: '50%'
  },
  contentButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'fixed',
    right: '8px',
    bottom: '5%',
    zIndex: '30'
  },
  contentSearchButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  showMenuIcon: ({ visible }) => ({
    height: 35,
    width: 35,
    transform: `${
      visible ? 'rotate(180deg)' : 'rotate(0)'
    }`,
    transition: 'transform 0.2s'
  })
}));

const useMapHolderMobileStyles = makeStyles(() => ({
  mapContainer: () => ({
    position: 'relative',
    height: '100vh',
    width: '100vw'
  }),
  map: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  showIcon: {
    position: 'fixed',
    height: 64,
    margin: '10px 0 0 10px',
    zIndex: 1,
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    borderRadius: '50%'
  },
  buttonContainer: () => ({
    position: 'fixed',
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    height: '80px',
    width: '100vw',
    backgroundColor: 'white',
    zIndex: 5,
    justifyContent: 'space-around',
    alignItems: 'center'
  }),
  buttonItem: () => ({
    paddingTop: '10px',
    width: '33%',
    alignSelf: 'center',
    color: '#1A73E8',
    fontSize: '12px',
    height: '80px',
    textAlign: 'center',
    cursor: 'pointer',
    minWidth: '70px'
  }),
  showMenuIcon: ({ visible }) => ({
    height: 35,
    width: 35,
    transform: `${
      visible ? 'rotate(180deg)' : 'rotate(0)'
    }`,
    transition: 'transform 0.2s'
  })
}));

export { useMapHolderStyles, useMapHolderMobileStyles };
