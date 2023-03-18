import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  Badge,
  Tooltip,
  IconButton
} from '@material-ui/core';

const FilterButton = ({ isOpen, setIsOpen, filter }) => {
  const tooltipMessage = isOpen
    ? 'Закрити фільтр'
    : 'Відкрити фільтр';

  const toggleFilter = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <IconButton
      color="primary"
      aria-label="filter"
      onClick={toggleFilter}
    >
      {filter ? (
        <Badge color="secondary" variant="dot">
          <Tooltip title={tooltipMessage}>
            <FilterListIcon />
          </Tooltip>
        </Badge>
      ) : (
        <Tooltip title={tooltipMessage}>
          <FilterListIcon />
        </Tooltip>
      )}
    </IconButton>
  );
};

FilterButton.defaultProps = {
  filter: null
};
FilterButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.object])
};

export default connect(
  state => ({
    filter: state.filter
  }),
  null
)(FilterButton);
