import { makeStyles } from '@material-ui/core/styles';

const useSearchStyles = makeStyles(() => ({
  searchWrapper: {
    marginBottom: 20
  },
  searchInput: {
    width: '100%',
    paddingRight: '0.5rem'
  }
}));

const useSearchMobileStyles = makeStyles(() => ({
  searchWrapper: {
    marginBottom: 28,
    marginLeft: 30,
    marginRight: 10,
    width: '90%'
  },
  searchInput: {
    width: '100%',
    paddingRight: '0.5rem',
    paddingLeft: '16px',
    height: 48
  }
}));

export { useSearchStyles, useSearchMobileStyles };
