var Item = React.createClass({

    displayName: 'Item',

    propTypes: {
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        quantity: React.PropTypes.number.isRequired,
        imgURL: React.PropTypes.string.isRequired,
        cbSelectItem: React.PropTypes.func.isRequired,
        selectedItem: React.PropTypes.string,

        cbDeleteItem: React.PropTypes.func.isRequired
    },


    selectItem: function (eo) {
        this.props.cbSelectItem(eo.currentTarget.id);
    },

    deleteItem: function (eo) {
        this.props.cbDeleteItem(eo.target.getAttribute('itemID'));

    },

    render: function () {
        return React.DOM.tr({
                id: this.props.id,
                className: ('Br2 ' + (+this.props.selectedItem === this.props.id ? 'selected' : '')),
                onClick: this.selectItem

            },
            React.DOM.td(null, this.props.title),
            React.DOM.td(null, this.props.price + ' USD'),
            React.DOM.td(null, this.props.quantity),
            React.DOM.td(null, React.DOM.img({src: this.props.imgURL})),
            React.DOM.td(null, React.DOM.input({
                type: 'button',
                itemID: this.props.id,
                value: 'Удалить',
                onClick: this.deleteItem
            }))
        );

    }
});
