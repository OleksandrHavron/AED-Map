import React from 'react';

import BaseButton from 'shared/ui/BaseButton';

import { useSearchNearestDevice } from '../model/use-search-nearest-device';

export default function SearchNextNearestDefButton() {
  const {
    getNextNearestDefibrillator
  } = useSearchNearestDevice();

  return (
    <BaseButton
      onClick={getNextNearestDefibrillator}
      styles={{
        backgroundColor: 'orange',
        bottom: 125,
        marginRight: 6
      }}
    >
      Знайти наступний
    </BaseButton>
  );
}
