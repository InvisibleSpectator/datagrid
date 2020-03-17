
import './Table.css'

import TableCell from './tableCell/TableCell'
import TableHeadCell from './tableHead/TableHeadCell'
import React from "react";

import { FixedSizeGrid as Grid } from "react-window";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.keys = props.data.map((o) => {
      return Object.keys(o)
    }).reduce((prev, curr) => {
      return prev.concat(curr)
    }).filter((col, i, array) => {
      return array.indexOf(col) === i
    });
  }
  Column = ({ index, style, data }) => (
    <TableHeadCell
      style={{
        ...style,
        left: style.left,
        top: style.top,
        width: style.width,
        height: 43
      }} className={'head'}
      data={data.head[data.keys[index]]} keyword={data.keys[index]} onHeadClick={data.onHeadClick}
      direction={data.sortingDirections[data.sortingFields.indexOf(data.keys[index])]}
    />);

  Cell = ({ columnIndex, rowIndex, style, data }) => {
    return (
      <TableCell
        style={{
          ...style,
          left: style.left,

          width: style.width,
          height: style.height
        }} className={'tableCell ' + (rowIndex % 2 ? "ListItemOdd" : "ListItemEven") + (columnIndex === 0 ? ' leftColumn' : '')} content={data.data[rowIndex][data.keys[columnIndex]]} />
    )
  };

  GUTTER_SIZE = 5;

  isShiftPressed = false;

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      const keyName = event.code;
      if (keyName === 'ShiftLeft')
        if (!this.isShiftPressed) {
          this.isShiftPressed = true;
          this.props.shiftAction(this.isShiftPressed);
        }
    });
    document.addEventListener('keyup', (event) => {
      const keyName = event.code;
      if (keyName === 'ShiftLeft') {
        this.isShiftPressed = false;
        this.props.shiftAction(this.isShiftPressed);
      }
    });
  }

  render() {

    const headSize = 50;
    return (
      <div className='contaner'>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <React.Fragment>
                <List
                  itemData={{
                    head: this.props.head,
                    keys: this.keys,
                    onHeadClick: this.props.onHeadClick,
                    sortingDirections: this.props.sortingDirections,
                    sortingFields: this.props.sortingFields
                  }}
                  className='headRow'
                  itemCount={this.keys.length}
                  height={headSize}
                  width={width - 5}
                  layout="horizontal"
                  itemSize={width / this.keys.length - 2}
                >
                  {this.Column}
                </List>
                <Grid
                  className='tableBody'
                  itemData={{ data: this.props.data, keys: this.keys }}
                  columnCount={this.keys.length}
                  height={height - headSize}
                  width={width}
                  rowCount={this.props.data.length}
                  rowHeight={100 + this.GUTTER_SIZE}
                  columnWidth={width / this.keys.length - 2}
                >
                  {this.Cell}
                </Grid>
              </React.Fragment>
            )
          }}
        </AutoSizer>
      </div>
    );
  }

}

export default Table;
