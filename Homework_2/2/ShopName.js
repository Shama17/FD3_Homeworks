var ShopName = React.createClass({

    displayName: 'ShopName',

    propTypes: {
        shop: React.PropTypes.string.isRequired,
    },

    render: function() {
        return React.DOM.div( {className:'Shop'}, 'Магазин '+ this.props.shop );
    },

});