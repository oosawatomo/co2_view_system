import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Co2Chart from './Co2Chart';
import Co2Now from './Co2Now';

ReactDOM.render(<Co2Chart />, document.getElementById('root'));
ReactDOM.render(<Co2Now />, document.getElementById('co2now'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
