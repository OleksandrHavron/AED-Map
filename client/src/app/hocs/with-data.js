import { connect } from 'react-redux';
import React, { Component } from 'react';

import { compose } from 'shared/utils';

const withData = Cmp => {
  class Wrapper extends Component {
    render() {
      return <Cmp {...this.props} />;
    }
  }

  return compose(
    connect(state => ({
      user: state.user.user,
      mapData: state.defs.mapData,
      searchInput: state.search.address
    }))
  )(Wrapper);
};

export default withData;
