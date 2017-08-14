import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui';
import ListItem from './ListItem';

class NextItem extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.nextToExpire !== nextProps.nextToExpire;
  }

  render() {
    if (!this.props.nextToExpire) {
      return null;
    }

    return (
      <Card>
        <CardHeader title="Next item up" />
        <CardText>
          <ListItem itemId={this.props.nextToExpire} />
        </CardText>
      </Card>
    );
  }
}

NextItem.defaultProps = {
  nextToExpire: null,
};

NextItem.propTypes = {
  nextToExpire: PropTypes.string,
};

export default connect(({ nextToExpire }) => ({ nextToExpire }))(NextItem);
