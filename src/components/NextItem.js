import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui';
import { itemType } from '../propTypes';
import ListItem from './ListItem';

const NextItem = ({ item, onListItemUpdate }) => (
  <Card>
    <CardHeader title="Next item up" />
    <CardText>
      <ListItem item={item} onListItemUpdate={onListItemUpdate} />
    </CardText>
  </Card>
);

NextItem.propTypes = {
  item:             itemType.isRequired,
  onListItemUpdate: PropTypes.func.isRequired,
};

export default NextItem;
