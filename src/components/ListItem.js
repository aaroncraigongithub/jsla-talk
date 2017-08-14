import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import {
  Checkbox,
  ListItem as UIListItem,
} from 'material-ui';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { yellow500 } from 'material-ui/styles/colors';
import { itemType } from '../propTypes';
import { updateListItem } from '../actions';

class ListItem extends Component {
  constructor() {
    super();

    this.updateStar = this.updateStar.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.itemId !== nextProps.itemId ||
      !isEqual(this.props.item, nextProps.item);
  }

  onCheck(ev, isChecked) {
    this.props.dispatch(updateListItem({
      itemId: this.props.itemId,
      status: isChecked ? 'done' : 'pending',
    }));
  }

  updateStar(starred) {
    this.props.dispatch(updateListItem({
      itemId: this.props.itemId,
      starred,
    }));
  }

  render() {
    return (
      <UIListItem
        style={{
          maxWidth: 420,
        }}
        leftCheckbox={
          <Checkbox
            checked={this.props.item.status === 'done'}
            onCheck={this.onCheck}
          />
        }
        rightIconButton={
          this.props.item.starred
            ? <Star
              color={yellow500}
              onClick={(e) => {
                e.preventDefault();

                this.updateStar(false);
              }}
            />
            : <StarBorder
              color={yellow500}
              onClick={(e) => {
                e.preventDefault();

                this.updateStar(true);
              }}
            />
        }
        primaryText={this.props.item.title}
      />
    );
  }
}

ListItem.propTypes = {
  itemId:   PropTypes.string.isRequired,
  item:     itemType.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state, ownProps) => ({
  item: state.items[ownProps.itemId],
}))(ListItem);
