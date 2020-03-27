"use strict";
import './frame.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Br2 from './components/Br2';

let text = "первый<br>второй<br/>третий<br />последний";

ReactDOM.render(
    <Br2 text={text}>
        Hello!
    </Br2>, document.getElementById('container')
);
