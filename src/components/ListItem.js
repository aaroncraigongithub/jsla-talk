import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  ListItem as UIListItem,
} from 'material-ui';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { yellow500 } from 'material-ui/styles/colors';
import { itemType } from '../propTypes';

const ListItem = ({ item, onListItemUpdate }) => (
  <UIListItem
    style={{
      maxWidth: 420,
    }}
    leftCheckbox={
      <Checkbox
        checked={item.status === 'done'}
        onCheck={(ev, isChecked) => {
          onListItemUpdate(item.id, {
            status: isChecked ? 'done' : 'pending',
          });
        }}
      />
    }
    rightIconButton={
      item.starred
        ? <Star
          color={yellow500}
          onClick={(e) => {
            e.preventDefault();

            onListItemUpdate(item.id, { starred: false });
          }}
        />
        : <StarBorder
          color={yellow500}
          onClick={(e) => {
            e.preventDefault();

            onListItemUpdate(item.id, { starred: true });
          }}
        />
    }
    primaryText={item.title}
  />
);

ListItem.propTypes = {
  item:             itemType.isRequired,
  onListItemUpdate: PropTypes.func.isRequired,
};

export default ListItem;
