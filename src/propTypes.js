import PropTypes from 'prop-types';

export const itemType = PropTypes.shape({
  id:      PropTypes.string.isRequired,
  listId:  PropTypes.string.isRequired,
  title:   PropTypes.string.isRequired,
  status:  PropTypes.string.isRequired,
  starred: PropTypes.bool.isRequired,
  dueBy:   PropTypes.string.isRequired,
});

export const listType = PropTypes.shape({
  id:    PropTypes.string.isRequired,
  name:  PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id:       PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
  })).isRequired,
});

