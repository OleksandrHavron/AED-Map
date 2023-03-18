import React from 'react';

import { createItem, createImage } from 'shared/api/defs';
import MyForm from 'shared/ui/Form';

import INITIAL_VALUES from '../lib/constants';

const AddDefForm = () => {
  const hadleSubmit = async ({ images, ...data }) => {
    const body = {
      ...data,
      actual_date: data.actualDate,
      location: {
        type: 'Point',
        coordinates: data.coordinates
      },
      storage_place: `Поверх ${data.floor}, ${data.storage_place}`
    };

    const bodyFormData = new FormData();
    Object.values(images).forEach(image =>
      bodyFormData.append('images', image)
    );

    const respond = await createItem(body);

    await createImage(
      bodyFormData,
      respond.defibrillator._id
    );
  };

  return (
    <MyForm
      INITIAL_VALUES={INITIAL_VALUES}
      submitAction={hadleSubmit}
    />
  );
};

export default AddDefForm;
