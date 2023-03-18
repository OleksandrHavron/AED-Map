import { makeStyles } from '@material-ui/core/styles';

const useRouteDetailsStyles = makeStyles(theme => ({
  type_icon: {
    backgroundColor: 'gray',
    width: '30px',
    height: '30px',
    position: 'relative',
    '&:hover': {
      backgroundColor: ' inherit',
      opacity: 0.4
    }
  },
  type_icon_selected: {
    backgroundColor: 'blue',
    width: '30px',
    height: '30px'
  }
}));

const createRouteDetailsStyles = () => {
  return {
    container: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(40, 44, 52, 1)',
      borderRadius: '5px',
      border: '2px solid rgba(0, 0, 0, 0.6)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '10px'
    },
    button: {
      backgroundColor: 'rgba(162, 165, 173, 1)',
      fontSize: '0.9rem',
      padding: '2px',
      marginTop: '5px',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    transportInput: {
      display: 'flex',
      flexDirection: 'row',
      gap: '20px'
    },
    containerIcon: {
      display: 'flex',
      gap: '10px',
      padding: '8px',
      justifyContent: 'center'
    },
    radio: {
      marginTop: '10px',
      visibility: 'hidden'
    },
    timer: {
      display: 'flex',
      justifyContent: 'center'
    },
    type_icon: {
      '&:hover': {
        backgroundColor: 'red'
      }
    },
    type_icon_selected: {
      backgroundColor: 'green'
    }
  };
}

const createRouteDetailsMobileStyles = () => {
  return {
    container: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 1)',
      position: 'fixed',
      bottom: '90px',
      right: '25px',
      zIndex: '30',
      backgroundColor: 'rgba(40, 44, 52, 1)',
      borderRadius: '5px',
      border: '2px solid rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      width: '160px'
    },
    logo: {
      width: '20px',
      marginRight: '3px'
    }
  };
}

export {
  useRouteDetailsStyles,
  createRouteDetailsStyles,
  createRouteDetailsMobileStyles
};
