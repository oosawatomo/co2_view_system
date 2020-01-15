import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Co2Chart from './Co2Chart';
import Co2Now from './Co2Now';

ReactDOM.render(<Co2Chart />, document.getElementById('co2chart'));
ReactDOM.render(<Co2Now />, document.getElementById('co2now'));