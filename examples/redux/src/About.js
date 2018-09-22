import React from 'react';
import { connect } from 'react-redux';
import { actions } from './reducers';

class About extends React.Component {
  render() {
    return (
      <div
        onClick={() => {
          this.props.increment();
        }}
      >
        about {this.props.counter.count}
      </div>
    );
  }
}

export default connect(
  state => state,
  actions
)(About);
