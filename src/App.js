import React from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import sortingReducer from './store/reducers'
import TableContainer from './components/table/TableContainer';

const store = createStore(sortingReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
      <TableContainer />
    </Provider>
  );
}

export default App;
