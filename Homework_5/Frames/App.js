"use strict";
import './frame.css';
import React from 'react';
import ReactDOM from'react-dom';

import {frame} from './components/Frame';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let Frames = frame(colors);

ReactDOM.render(
    <Frames colors={colors}>
        Hello!
    </Frames>, document.getElementById('container')
);
