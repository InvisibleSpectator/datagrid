export const SORT_BY = 'SORT_BY';
export const SHIFT_ACTION = 'SHIFT_ACTION';

export const sortBy = (field) => ({
  type: SORT_BY,
  payload: field
});

export const shiftAction = (isShiftPressed) => ({
type:SHIFT_ACTION,
payload: isShiftPressed
});
