/* global performance */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import {
  Card,
  CardText,
  CardHeader,
} from 'material-ui';
import NextItem from './NextItem';
import List from './List';

class ListPanel extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.listIds, nextProps.listIds);
  }

  render() {
    return (
      <div>
        <NextItem />
        <Card>
          <CardHeader title="Your lists" />
          <CardText>
            {this.props.listIds.map(listId => (
              <List
                key={listId}
                listId={listId}
              />
            ))}
          </CardText>
        </Card>
      </div>
    );
  }
}

ListPanel.propTypes = {
  listIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(state => ({
  listIds: Object.keys(state.lists),
}))(ListPanel);
