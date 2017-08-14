const createAction = action =>
  (payload = null, meta = {}) => {
    const isError = payload instanceof Error;

    return {
      type:  action,
      error: isError,
      payload,
      meta,
    };
  };

export const updateListItem = createAction('UPDATE_LIST_ITEM');
export default updateListItem;
