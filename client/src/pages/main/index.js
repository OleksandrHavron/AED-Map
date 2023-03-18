import React, { Suspense, useState } from 'react';

const Sidebar = React.lazy(() => import('widgets/sidebar'));
const MapHolder = React.lazy(() =>
  import('widgets/map-holder')
);

const Main = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Suspense
      fallback={<div>Завантаження меню і мапи...</div>}
    >
      <Sidebar visible={visible} setVisible={setVisible} />
      <MapHolder
        visible={visible}
        setVisible={setVisible}
      />
    </Suspense>
  );
};

export { Main };
