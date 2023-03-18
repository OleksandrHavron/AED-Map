import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useFilterStyles } from 'features/filter/model/use-styles';

import FilterButton from './FilterButton';
import FilterFormik from './FilterFormik';

const Filter = () => {
  const classes = useFilterStyles();
  const [isOpen, setIsOpen] = useState(false);

  const transitionClasses = {
    enter: classes.filterFadeTransitionEnter,
    exit: classes.filterFadeTransitionExit,
    exitActive: classes.filterFadeTransitionExitActive,
    enterActive: classes.filterFadeTransitionEnterActive
  };

  return (
    <div>
      <FilterButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <CSSTransition
        in={isOpen}
        timeout={1000}
        unmountOnExit
        classNames={transitionClasses}
      >
        <FilterFormik setIsOpen={setIsOpen} />
      </CSSTransition>
    </div>
  );
};

export default Filter;
