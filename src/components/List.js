import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardText,
  List as UIList,
} from 'material-ui';
import { listType } from '../propTypes';
import ListItem from './ListItem';

class List extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.listId !== nextProps.listId;
  }

  render() {
    return (
      <Card>
        <CardHeader title={this.props.list.name} />
        <CardText>
          <UIList>
            {
              this.props
                .list
                .items
                .map(item => (
                  <ListItem
                    key={item.id}
                    itemId={item.id}
                  />
                ))
            }
          </UIList>
        </CardText>
      </Card>
    );
  }
}

List.propTypes = {
  listId: PropTypes.string.isRequired,
  list:   listType.isRequired,
};

export default connect(
  (state, ownProps) => ({ list: state.lists[ownProps.listId] }),
)(List);
