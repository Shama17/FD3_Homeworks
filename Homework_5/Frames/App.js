"use strict";
import './frame.css';
import React from 'react';
import ReactDOM from'react-dom';

import Frames from './components/Frame';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

ReactDOM.render(
    <Frames colors={colors}>
        Hello!
    </Frames>, document.getElementById('container')
)
