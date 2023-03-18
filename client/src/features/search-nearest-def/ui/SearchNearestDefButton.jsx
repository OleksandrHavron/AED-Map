import React from 'react';

import BaseButton from 'shared/ui/BaseButton';

import { useSearchNearestDevice } from '../model/use-search-nearest-device';

export default function SearchNearestDefButton() {
  const {
    getNearestDefibrillators
  } = useSearchNearestDevice();

  return (
    <BaseButton onClick={getNearestDefibrillators}>
      Знайти пристрій
    </BaseButton>
  );
}
