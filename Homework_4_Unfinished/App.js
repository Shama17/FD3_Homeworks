"use strict";
import './isShop.css';
import React from 'react';
import ReactDOM from'react-dom';

import Goods from './components/Goods';

let shopName = 'SmartLife';
let goodsArr = require ('./GoodsArr');

ReactDOM.render(
    React.createElement(Goods, {shop: shopName, goods: goodsArr}),
    document.getElementById('container')
);
