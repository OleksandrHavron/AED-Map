import { isEqual } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import React, {
  useState,
  useEffect,
  Suspense
} from 'react';

import media from 'shared/consts/media';

const StartModal = React.lazy(() =>
  import('shared/ui/StartModal')
);

const useStyles = makeStyles({
  startModalFadeEnter: {
    opacity: 0,
    transform: 'translateY(-150px)'
  },
  startModalFadeEnterActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition:
      'opacity 0.5s ease, transform 0.5s ease-in-out'
  },
  startModalFadeExit: {
    opacity: 1
  },
  startModalFadeExitActive: {
    opacity: 0,
    transform: 'translateY(150px)',
    transition:
      'opacity 0.5s linear, transform 0.5s ease-in-out'
  },
  startModalFadeAppear: {
    opacity: 0,
    transform: 'translateY(150px)'
  },
  startModalFadeAppearActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition:
      'opacity 0.5s linear, transform 0.5s ease-in-out'
  }
});

const withStartModal = Cmp => ({
  location,
  searchInput,
  ...restProps
}) => {
  const classes = useStyles();
  const transitionClasses = {
    exit: classes.startModalFadeExit,
    enter: classes.startModalFadeEnter,
    appear: classes.startModalFadeAppear,
    exitActive: classes.startModalFadeExitActive,
    enterActive: classes.startModalFadeEnterActive,
    appearActive: classes.startModalFadeAppearActive
  };

  const closeModal =
    sessionStorage.getItem('startModal') === 'close';

  const [screenWidth, setScreenWidth] = useState();
  const [isStartModalOpen, setStartModal] = useState(
    !closeModal
  );

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [searchInput]);

  const isMobileView =
    !isEqual(window.orientation, 90) &&
    screenWidth < media.ipad;
  const fallbackMessage = isMobileView
    ? 'Завантаження модального вікна...'
    : 'Завантаження...';

  return (
    <Cmp
      location={location}
      searchInput={searchInput}
      setStartModal={setStartModal}
      {...restProps}
    >
      {isEqual(location.pathname, '/') ? (
        <CSSTransition
          appear
          unmountOnExit
          timeout={1000}
          in={isStartModalOpen}
          classNames={transitionClasses}
        >
          <Suspense fallback={<div>{fallbackMessage}</div>}>
            <StartModal setStartModal={setStartModal} />
          </Suspense>
        </CSSTransition>
      ) : null}
    </Cmp>
  );
};

export default withStartModal;
