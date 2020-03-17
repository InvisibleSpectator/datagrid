import React from 'react';

function TableHeadCell({ data, keyword, onHeadClick, style, className, direction }) {
  let arrow;
  switch (direction) {
    case 'asc':
      arrow = '▲';
      break;
    case 'desc':
      arrow = '▼';
      break;
    default:
      arrow = '';
      break;
  }

  return (
  <div className={className} style={style} onClick={() => onHeadClick(keyword)} >{data} {arrow}</div>
  );
}

export default TableHeadCell;
