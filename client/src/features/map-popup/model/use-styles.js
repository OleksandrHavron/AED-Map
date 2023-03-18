import { makeStyles } from '@material-ui/core/styles';

const usePopupHolderStyles = makeStyles({
  popupHolderContent: {
    willChange: 'auto !important'
  }
});

const useDefPopupContentStyles = makeStyles({
  popupContainer: {
    maxWidth: 400,
    maxHeight: 270,
    padding: '5px 15px',
    overflowY: 'auto',
    color: 'white',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.3)'
    },
    '& p': {
      marginBottom: 5
    }
  },
  title: {
    color: '#bbb',
    fontWeight: 'bold'
  },
  closeBtn: {
    position: 'fixed',
    zIndex: 1000,
    right: 20,
    top: 15,
    width: 20,
    height: 20,
    cursor: 'pointer',
    color: 'grey'
  },
  imagePreview: {
    display: 'block',
    maxWidth: 110,
    height: 'auto',
    marginBottom: 5,
    borderRadius: 5,
    boxShadow: '0 2px 10px rgba(255, 255, 255, .4)'
  }
});

export { usePopupHolderStyles, useDefPopupContentStyles };
