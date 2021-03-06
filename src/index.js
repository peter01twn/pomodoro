import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureAppStore from "./configureStore";
import './scss/index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import saveDataFromStore from 'utils/saveDataFromStore'

const store = configureAppStore();
store.subscribe(saveDataFromStore(store)({
  todos: ({ todo }) => todo.todos,
  work_times: ({ record }) => record.workTimes,
  rings: ({ ring }) => ({ restRing: ring.restRing, workRing: ring.workRing }),
  clock: ({ clock }) => ({ mode: clock.mode, time: clock.time })
}))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
