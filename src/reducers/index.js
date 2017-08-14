import { cloneDeep, first, merge } from 'lodash';
import faker from 'faker';

function fakeItem(index) {
  return {
    id:     `item-${index + 1}`,
    listId: `list-${faker.random.number(2)}`,
    title:  faker.fake(
      '{{hacker.verb}} {{hacker.adjective}} {{hacker.abbreviation}}',
    ),
    status:  faker.random.arrayElement(['pending', 'done']),
    starred: faker.random.number(10) > 8,
    dueBy:   faker.date.future().toISOString(),
  };
}

function listToMap(arr) {
  return arr.reduce((h, i) => {
    // eslint-disable-next-line no-param-reassign
    h[i.id] = i;

    return h;
  }, {});
}

const items = Array.from(new Array(15), (val, i) => fakeItem(i));
const lists = Array.from(new Array(2), (val, i) => ({
  id:    `list-${i + 1}`,
  name:  i === 0 ? 'Priority todos' : 'Follow up todos',
  items: [],
}));
const next = first(items.sort((a, b) => a.dueBy - b.dueBy));

items.forEach((item, i) => {
  const listIndex = item.listId === 'list-1' ? 0 : 1;

  lists[listIndex].items.push({
    id:       item.id,
    position: i,
  });
});

const defaultState = {
  nextToExpire: next.id,
  items:        listToMap(items),
  lists:        listToMap(lists),
};

export default function reducer(state = defaultState, action) {
  const copy = cloneDeep(state);

  if (action.type === 'UPDATE_LIST_ITEM') {
    const {
      itemId,
      ...data
    } = action.payload;

    const item = copy.items[itemId];

    merge(item, data);
  }

  return copy;
}
