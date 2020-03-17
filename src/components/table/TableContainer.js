import React from 'react';
import { connect } from 'react-redux';
import {sortBy,shiftAction} from '../../store/actions'
import Table from './Table';

function TableContainer({head,data,sortBy,sortingFields,sortingDirections,shiftAction}) {
  return <Table
  head={head}
  data={data}
  onHeadClick={sortBy}
  sortingFields={sortingFields}
  sortingDirections={sortingDirections}
  shiftAction={shiftAction}>
  </Table>
}

const mapStateToProps = (state) =>{
return {
  head:state.head,
  data:state.data,
  sortingFields:state.sortableFields,
  sortingDirections:state.directions
};
}

const mapDispatchToProps = {
    sortBy, shiftAction
}

export default connect(mapStateToProps,mapDispatchToProps)(TableContainer);
