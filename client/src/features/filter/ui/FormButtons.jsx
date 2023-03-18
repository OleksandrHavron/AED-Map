import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connect as connectFormik } from 'formik';

import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import { resetFilter } from 'shared/store/filter/actions';
import { useFormButtonsStyles } from 'features/filter/model/use-styles';

import { hidePopup } from 'shared/store/popup/actions';
import {
  fetchDefs,
  setPage,
  setData
} from 'shared/store/defs/actions';

const FormButtons = ({
  formik: {
    dirty,
    handleReset,
    isSubmitting,
    errors: { title: titleError }
  },
  resetFilterValue,
  fetchDefItems,
  filter,
  popupData,
  hidePopup,
  resetPage,
  resetData
}) => {
  const classes = useFormButtonsStyles();

  const resetPagination = (page, data) => {
    resetPage(page);
    resetData(data);
  };

  const onClear = () => {
    if (filter) {
      if (popupData) {
        hidePopup();
      }

      resetPagination(1, []);
      fetchDefItems();
    }
    resetFilterValue();
    handleReset();
  };

  return (
    <div className={classes.buttonContainer}>
      <Button
        type="reset"
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<ClearIcon />}
        onClick={onClear}
      >
        Очистити
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<DoneIcon />}
        disabled={
          Boolean(titleError) || !dirty || isSubmitting
        }
      >
        Застосувати
      </Button>
    </div>
  );
};

FormButtons.defaultProps = {
  filter: null,
  popupData: null
};
FormButtons.propTypes = {
  formik: PropTypes.shape({
    handleReset: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    dirty: PropTypes.bool,
    errors: PropTypes.shape({
      title: PropTypes.string
    })
  }).isRequired,
  resetFilterValue: PropTypes.func.isRequired,
  fetchDefItems: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.object]),
  popupData: PropTypes.oneOfType([PropTypes.object]),
  hidePopup: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired
};

export default connect(
  state => ({
    filter: state.filter,
    popupData: state.popupData
  }),
  {
    resetFilterValue: resetFilter,
    fetchDefItems: fetchDefs,
    resetPage: page => setPage(page),
    resetData: data => setData(data),
    hidePopup
  }
)(connectFormik(FormButtons));
