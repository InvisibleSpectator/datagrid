import React from 'react';

function isDate(sDate) {
  return (new Date(sDate) !== "Invalid Date" && !isNaN(new Date(sDate)) ) ? true : false;
}

function TableCell({ content, style, className }) {

  switch (typeof content) {
    case 'string':
      if (isDate(content)) {
        let formatter = new Intl.DateTimeFormat()
        let date = new Date(content)
        return (
          <div className={className} style={style}>
            {formatter.format(date)}
          </div>
        );
      }
      else
        return (
          <div className={className + ' string'} style={style}>
            {content}
          </div>
        );
    case 'number':
      let formatter = new Intl.NumberFormat();
      return (
        <div className={className+ ' number'} style={style}>
          {formatter.format(content)}
        </div>
      );
    case 'object':
      if(content)
      return (
        <div className={className} style={style}>
          <div className="object">
          {JSON.stringify(content)}
          </div>
        </div>
      );
      else
      return (
        <div className={className} style={style}>
          --------
        </div>
      );
    case 'boolean':
      return (
        <div className={className} style={style}>
          <input type="checkbox" readOnly disabled="" checked={content} />
        </div>
      );
    default:
      return (
        <div className={className}  style={style}>
          --------
        </div>
      );
  }
}

export default TableCell;
