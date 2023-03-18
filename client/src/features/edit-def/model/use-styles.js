import { makeStyles } from '@material-ui/core/styles';
import { loaderPadding } from '../lib/constants';

const useLoaderStyles = makeStyles({
  loader: {
    padding: loaderPadding
  }
});

export { useLoaderStyles };
