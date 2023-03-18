import { makeStyles } from '@material-ui/core/styles';

const useModalPhotoContentStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 600,
    height: 550
  }
}));

export { useModalPhotoContentStyles };
