import { makeStyles } from '@material-ui/core/styles';

const useAddedPinStyles = makeStyles(() => ({
  marker: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pin: {
    width: 40,
    height: 40
  }
}));

const useDefirilatorPinLayerStyles = makeStyles(() => ({
  clusterMarker: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(124, 124, 124, 0.9)',
    boxShadow: '1px 1px 3px rgba(124, 124, 124, 0.9)',
    color: 'white',
    fontWeight: 900,
    cursor: 'pointer'
  },
  marker: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '200px'
  },
  markerWrapper: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textShadow: '1px 1px 2px white',
    cursor: 'pointer'
  },
  title: {
    width: 200
  },
  pin: {
    width: 30,
    height: 30
  }
}));

export { useAddedPinStyles, useDefirilatorPinLayerStyles };
