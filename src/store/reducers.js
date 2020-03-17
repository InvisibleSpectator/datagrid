import _ from 'lodash'
import { SORT_BY, SHIFT_ACTION } from './actions'
import Data from '../data/data2.json';

const defaultState = {
  isShiftPressed: false,
  head: Data.head,
  data: Data.data,
  sortableFields: [],
  directions: []

}

export default function sortingReducer(state = defaultState, action) {
  console.log(action)
  switch (action.type) {
    case SORT_BY:
      if (!state.sortableFields.includes(action.payload)) {
        let stbf = state.sortableFields;
        let dir = state.directions;
        if(!state.isShiftPressed){
          stbf=[];
          dir=[];
        }
        stbf.push(action.payload);
        dir.push('asc');
        let sortedData = _.orderBy(state.data, stbf, dir);
        return ({
          ...state,
          data: sortedData,
          sortableFields: stbf,
          directions: dir
        })
      }
      else {
        let index = state.sortableFields.findIndex((v) => v === action.payload);
        let stbf = state.sortableFields;
        let dir = state.directions;
        let deleted = dir.splice(index, 1)[0];
        stbf.splice(index, 1)
        if (deleted === 'asc') {
          stbf.push(action.payload);
          dir.push('desc');
        }
        let sortedData = _.orderBy(state.data, stbf, dir);
        return ({
          ...state,
          data: sortedData,
          sortableFields: stbf,
          directions: dir
        })
      }
      case SHIFT_ACTION:
        return ({
          ...state,
          isShiftPressed: action.payload
        })
    default: return state
  }
}

