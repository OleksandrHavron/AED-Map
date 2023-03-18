import { makeStyles } from '@material-ui/core/styles';

const useBlockingButtonStyles = makeStyles({
  pointCardBlockButton: {
    minWidth: 'auto',
    marginLeft: 'auto',
  },
  pointCardBlockButtonBlocked: {
    minWidth: 'auto',
    marginLeft: 'auto',
    background: '#d50000'
  }
});

const useDeletingButtonStyles = makeStyles({
  pointCardDeleteButton: {
    marginLeft: 10
  }
});

const useDefItemStyles = makeStyles({
  pointCard: {
    position: 'relative',
    minHeight: 100,
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #fff',
      padding: 0
    },
    textDecoration: 'none',
    background: props =>
      props.isActive ? '#344870' : '#282c34',
    overflow: 'hidden',
    '&:hover': {
      background: '#686c7458',
      cursor: 'pointer'
    }
  },
  pointCardInfo: {
    padding: 15,
    outline: 'none'
  },
  pointCardButtons: {
    padding: props => (props.hasPermission ? 15 : 0),

    display: 'flex',
    height: props => (props.hasPermission ? 60 : 0),

    '& a': {
      textDecoration: 'none'
    }
  },
  titleStyle: {
    color: '#fff',
    paddingRight: 30,
    fontSize: 17,
    marginBottom: 10
  },
  descStyle: {
    color: '#bbb',
    fontSize: 13
  },
  routeIconContainer: {
    display: props => (props.isActive ? 'block' : 'none'),
    position: 'absolute',
    top: 5,
    right: 3
  },
  routeIcon: {
    fontSize: '40px',
    color: '#696969',
    '&:hover': {
      color: '#1976d2'
    }
  }
});

const useDefItemMobileStyles = makeStyles({
  pointCard: {
    color: 'rgba(36, 36, 36, 1)',
    textDecoration: 'none',
    background: 'rgba(197, 197, 197, 0.71)',
    height: '50px',
    overflow: 'hidden',
    '&:hover': {
      background: 'rgba(145,155,150,0.8)',
      cursor: 'pointer'
    }
  },
  pointCardInfo: {
    height: '50px',
    paddingLeft: 16,
    paddingTop: 8,
    outline: 'none',
    borderBottom: '1px solid rgba(178, 178, 178, 1)'
  },
  titleStyle: {
    fontSize: 13,
    textOverflow: 'ellipsis',
    '&::-ms-text-overflow': 'ellipsis',
    '&::-o-text-overflow': 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '90%'
  },
  descStyle: {
    fontSize: 10,
    textOverflow: 'ellipsis',
    '&::-ms-text-overflow': 'ellipsis',
    '&::-o-text-overflow': 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '90%'
  }
});

export {
  useBlockingButtonStyles,
  useDeletingButtonStyles,
  useDefItemStyles,
  useDefItemMobileStyles
}