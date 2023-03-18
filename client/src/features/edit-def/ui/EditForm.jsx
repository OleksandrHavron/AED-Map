import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { cancelToken } from 'shared/utils';
import { getReverseGeocoding } from 'shared/api/gmap';
import { setMapCenter } from 'shared/store/map/actions';
import {
  editItem,
  createImage,
  fetchSingleDefById
} from 'shared/api/defs';

import MyForm from 'shared/ui/Form';
import Loader from 'shared/ui/Loader';

import { useLoaderStyles } from '../model/use-styles';

const defCancelToken = cancelToken();

const EditForm = ({ setMapCenter }) => {
  const classes = useLoaderStyles();
  const [def, setDef] = useState(null);

  const { href } = window.location;
  const id = href.slice(href.lastIndexOf('/') + 1);

  const prepareData = async ({ defibrillator }) => {
    const [lng, lat] = defibrillator.location.coordinates;
    const correctAddress = await getReverseGeocoding({
      lng,
      lat
    });

    setDef({
      title: defibrillator.title,
      address:
        correctAddress.results[0] &&
        correctAddress.results[0].formatted_address,
      informational_plates:
        defibrillator.informational_plates,
      phone: defibrillator.phone,
      language: defibrillator.language,
      additional_information:
        defibrillator.additional_information,
      floor: defibrillator.storage_place.match(/\d/)[0],
      storage_place: defibrillator.storage_place.match(
        /, (.*)/
      )[1],
      coordinates: defibrillator.location.coordinates,
      availableFrom: defibrillator.availableFrom,
      images: defibrillator.images
    });
    setMapCenter({ lng, lat, zoom: 17 });
  };

  useEffect(() => {
    (async () => {
      setDef(null);

      const res = await fetchSingleDefById(id);

      prepareData(res);
    })();

    return () => {
      defCancelToken.cancel();
    };
    // eslint-disable-next-line
  }, []);

  const hadleSubmit = async ({ images, ...data }) => {
    const body = {
      ...data,
      _id: id,
      actual_date: data.actualDate,
      location: {
        type: 'Point',
        coordinates: data.coordinates
      },
      storage_place: `Поверх ${data.floor}, ${data.storage_place}`
    };

    const respond = await editItem(body);

    const bodyFormData = new FormData();
    Object.values(images).forEach(image =>
      bodyFormData.append('images', image)
    );

    await createImage(
      bodyFormData,
      respond.defibrillator._id
    );
  };

  return def ? (
    <MyForm
      INITIAL_VALUES={def}
      submitAction={hadleSubmit}
    />
  ) : (
    <div className={classes.loader}>
      <Loader />
    </div>
  );
};

EditForm.propTypes = {
  setMapCenter: PropTypes.func.isRequired
};

export default connect(null, dispatch => ({
  setMapCenter: newPoint => dispatch(setMapCenter(newPoint))
}))(EditForm);
