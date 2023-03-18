import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';

import { cancelToken } from 'shared/utils';
import { fetchDefs } from 'shared/store/defs/actions';
import { BASE_ZOOM_VALUE } from 'shared/store/defs/constants';
import {
  setMapZoom,
  setMapCenter
} from 'shared/store/map/actions';

import { DefItem } from 'features/def-item';
import { InfoMessage } from 'features/map-info-message';
import HorizontalLoader from 'shared/ui/Loader/HorizontalLoader';

import { useItemsListMobileStyles } from '../model/use-styles';

const defsCancelToken = cancelToken();

const DefsListMobile = ({
  isLoading,
  defibrillators,
  activeDef,
  fetchDefItems,
  filter,
  totalCount,
  page,
  search,
  setMapCenterCoords,
  setMapZoomParam
}) => {
  const classes = useItemsListMobileStyles();
  const noData = !isLoading && !defibrillators.length;
  const showMessage =
    (isLoading && !defibrillators.length) || noData;
  const showHorizontalLoader =
    isLoading && !!defibrillators.length;
  let message;

  switch (true) {
    case isLoading:
      message = 'Завантаження...';
      break;
    case noData:
      message = 'Даних не знайдено...';
      break;
    default:
      message = '';
  }

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  });

  const handleScroll = event => {
    const { scrollHeight, scrollTop, clientHeight } = event;

    if (
      totalCount >= page &&
      scrollHeight - Math.ceil(scrollTop) <= clientHeight
    ) {
      fetchDefItems({ page, ...filter, ...search });
    }
  };

  // eslint-disable-next-line react/prop-types
  const rowRenderer = ({ key, index, style, parent }) => {
    return (
      <CellMeasurer //  dynamically calculates the height of every item
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <DefItem
          styleParam={style}
          defItemInfo={defibrillators[index]}
        />
      </CellMeasurer>
    );
  };

  useEffect(() => {
    if (!defibrillators.length) {
      fetchDefItems();
    }
    return () => {
      defsCancelToken.cancel();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activeDef) {
      const [lng, lat] = activeDef.location.coordinates;
      setMapCenterCoords({
        lng,
        lat
      });
      setMapZoomParam(BASE_ZOOM_VALUE);
    }
    // eslint-disable-next-line
  }, [activeDef]);

  return (
    <div className={classes.listOuterStyle}>
      <AutoSizer>
        {({ width, height }) => {
          //  AutoSizer expands list to width and height of parent automatically
          return (
            <List
              onScroll={handleScroll}
              className={classes.listStyle}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowCount={defibrillators.length}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              overscanRowCount={10}
            />
          );
        }}
      </AutoSizer>
      {showMessage && <InfoMessage>{message}</InfoMessage>}
      {showHorizontalLoader && <HorizontalLoader />}
    </div>
  );
};

DefsListMobile.defaultProps = {
  activeDef: null,
  setMapCenterCoords: () => null,
  setMapZoomParam: () => null,
  fetchDefItems: () => null,
  filter: null,
  user: null
};

DefsListMobile.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  defibrillators: PropTypes.arrayOf(PropTypes.object)
    .isRequired,
  activeDef: PropTypes.oneOfType([PropTypes.object]),
  fetchDefItems: PropTypes.func,
  filter: PropTypes.oneOfType([PropTypes.object]),
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  search: PropTypes.shape({
    address: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  setMapCenterCoords: PropTypes.func,
  setMapZoomParam: PropTypes.func
};

export default connect(
  state => ({
    isLoading: state.defs.loading,
    defibrillators: state.defs.listData,
    filter: state.filter,
    activeDef: state.defs.listData.find(
      def => def._id === state.defs.active
    ),
    totalCount: state.defs.totalCount,
    page: state.defs.page,
    search: state.search,
    user: state.user.user
  }),
  dispatch => ({
    fetchDefItems: params => dispatch(fetchDefs(params)),
    setMapCenterCoords: mapState =>
      dispatch(setMapCenter(mapState)),
    setMapZoomParam: mapState =>
      dispatch(setMapZoom(mapState))
  })
)(DefsListMobile);
