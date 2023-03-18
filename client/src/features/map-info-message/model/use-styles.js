import { makeStyles } from '@material-ui/core/styles';

const useMapInfoMessageStyles = makeStyles({
  infoMessage: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    zIndex: 10
  }
});

const useMapInfoMessageMobileStyles = makeStyles({
  infoMessage: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'center',
    zIndex: 10
  }
});

export {
  useMapInfoMessageStyles,
  useMapInfoMessageMobileStyles
};
