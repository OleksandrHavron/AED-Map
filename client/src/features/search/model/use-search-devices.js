import { useDispatch, useSelector } from 'react-redux';

import { setSearch } from 'shared/store/search/actions';
import {
  fetchDefs,
  setPage,
  setData
} from 'shared/store/defs/actions';

const useSearchDevices = () => {
  const dispatch = useDispatch();
  const address = useSelector(
    state => state.search.address
  );

  const onSearch = ({ target: { value } }) => {
    const val = value.trim();
    const resetPagination = (page, data) => {
      dispatch(setPage(page));
      dispatch(setData(data));
    };

    dispatch(setSearch({ title: val, address: val }));

    if (val) {
      resetPagination(1, []);
      dispatch(fetchDefs({ title: val, address: val }));
    } else {
      resetPagination(1, []);
      dispatch(fetchDefs());
    }
  };

  return {
    address,
    onSearch
  };
};

export { useSearchDevices };
