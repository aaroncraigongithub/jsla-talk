/* global performance */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardText,
  CardHeader,
} from 'material-ui';
import { updateListItem } from '../actions';
import NextItem from './NextItem';
import List from './List';

class ListPanel extends Component {
  constructor() {
    super();

    this.onListItemUpdate = this.onListItemUpdate.bind(this);
  }

  onListItemUpdate(itemId, newData) {
    this.props.dispatch(updateListItem({
      itemId,
      ...newData,
    }));
  }

  render() {
    performance.mark('ListPanel start');

    const output = (
      <div>
        <NextItem
          item={this.props.items[this.props.nextToExpire]}
          onListItemUpdate={this.onListItemUpdate}
        />
        <Card>
          <CardHeader title="Your lists" />
          <CardText>
            {Object.keys(this.props.lists).map(listId => (
              <List
                key={listId}
                list={this.props.lists[listId]}
                items={this.props.items}
                onListItemUpdate={this.onListItemUpdate}
              />
            ))}
          </CardText>
        </Card>
      </div>
    );

    performance.mark('ListPanel end');
    performance.measure(
      'ListPanel rendered',
      'ListPanel start',
      'ListPanel end',
    );

    const measures = performance.getEntriesByName('ListPanel rendered');

    console.log(measures[0].duration);

    performance.clearMarks();
    performance.clearMeasures();

    return output;
  }
}

ListPanel.defaultProps = {
  nextToExpire: null,
};

ListPanel.propTypes = {
  dispatch:     PropTypes.func.isRequired,
  lists:        PropTypes.shape().isRequired,
  items:        PropTypes.shape().isRequired,
  nextToExpire: PropTypes.string,
};

export default connect(state => state)(ListPanel);
