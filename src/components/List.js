import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardText,
  List as UIList,
} from 'material-ui';
import { listType } from '../propTypes';
import ListItem from './ListItem';

const List = ({ list, items, onListItemUpdate }) => (
  <Card>
    <CardHeader title={list.name} />
    <CardText>
      <UIList>
        {
          list
            .items
            .map(item => (
              <ListItem
                key={item.id}
                item={items[item.id]}
                onListItemUpdate={onListItemUpdate}
              />
            ))
        }
      </UIList>
    </CardText>
  </Card>
);

List.propTypes = {
  list:             listType.isRequired,
  items:            PropTypes.shape().isRequired,
  onListItemUpdate: PropTypes.func.isRequired,
};

export default List;
