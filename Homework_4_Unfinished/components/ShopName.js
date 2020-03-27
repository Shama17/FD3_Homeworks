import React from 'react';

class ShopName extends React.Component {

    static propTypes = {
        shop: React.PropTypes.string.isRequired,
    };

    render() {
        return React.DOM.div({className: 'Shop'}, 'Магазин ' + this.props.shop);
    }

}

export default ShopName;