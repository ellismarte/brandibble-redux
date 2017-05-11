/* eslint no-shadow:1 */
import reduxCrud from 'redux-crud';
import generateUUID from 'utils/generateUUID';

const {
  fetchStart,
  fetchSuccess,
  fetchError,
  createStart,
  createSuccess,
  createError,
  updateStart,
  updateSuccess,
  updateError,
  deleteStart,
  deleteSuccess,
  deleteError,
} = reduxCrud.actionCreatorsFor('favorites', { key: 'favorite_item_id' });

export function fetchFavorites(brandibble) {
  return (dispatch) => {
    dispatch(fetchStart());
    return brandibble.favorites.all()
      .then(({ data }) => dispatch(fetchSuccess(data)))
      .catch(response => {
        const { errors } = response;
        return dispatch(fetchError(errors || response));
      });
  };
}

export function createFavorite(brandibble, name, lineItem) {
  return (dispatch) => {
    const id = generateUUID();
    dispatch(createStart({ record: { name, lineItem }, favorite_item_id: id }));
    return brandibble.favorites.create(name, lineItem)
      .then(({ data }) => dispatch(createSuccess({ favorite_item_id: id, ...data })))
      .catch(response => {
        const { errors } = response;
        return dispatch(createError(errors || response, { favorite_item_id: id, data: { name, lineItem } }));
      });
  };
}

export function updateFavorite(brandibble, id, name, lineItem) {
  return (dispatch) => {
    dispatch(updateStart({ favorite_item_id: id, record: { name, lineItem } }));
    return brandibble.favorites.update(id, name, lineItem)
      .then(({ data }) => dispatch(updateSuccess({ favorite_item_id: id, ...data })))
      .catch(response => {
        const { errors } = response;
        return dispatch(updateError(errors || response, { favorite_item_id: id, data: { name, lineItem } }))
      });
  };
}

export function deleteFavorite(brandibble, id) {
  return (dispatch) => {
    dispatch(deleteStart({ favorite_item_id: id }));
    return brandibble.favorites.delete(id)
      .then(() => dispatch(deleteSuccess({ favorite_item_id: id })))
      .catch(response => {
        const { errors } = response;
        return dispatch(deleteError(errors || response, { favorite_item_id: id }));
      });
  };
}
