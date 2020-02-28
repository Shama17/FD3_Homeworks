var Goods = React.createClass({

    displayName: 'Goods',


    propTypes: {
        goods: React.PropTypes.arrayOf(React.PropTypes.object),
        shop: React.PropTypes.string.isRequired,
    },

    getInitialState: function () {
        return {
            goodsArr: this.props.goods,
            selectedItem: null,
            deletedItem: null
        };
    },


    selectItem: function (selectItem) {
        this.setState({selectedItem: selectItem});
    },

    deleteItem: function (deleteItem) {
        this.setState({deleteItem: deleteItem})
        if (confirm('Вы действительно хотите удалить товар')) {
            let items = this.state.goodsArr.filter(elem => elem.code !== +deleteItem);
            this.setState({goodsArr: items, selectedItem: null, deleteItem: null});
        }
    },

    render: function () {
        var goodsCode = this.state.goodsArr.map(item =>
            React.createElement(Item, {
                key: item.code,
                id: item.code,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                imgURL: item.imgURL,
                cbSelectItem: this.selectItem,
                selectedItem: this.state.selectedItem,
                cbDeleteItem: this.deleteItem,
            })
        );

        return React.DOM.div({className: 'Goods'},
            React.createElement(ShopName, {shop: this.props.shop}),
            React.DOM.table({className: 'table'},
                React.DOM.tbody(null,
                    React.DOM.tr(null,
                        React.DOM.th(null, 'Название'),
                        React.DOM.th(null, 'Цена'),
                        React.DOM.th(null, 'Остаток'),
                        React.DOM.th(null, 'Изображение'),
                        React.DOM.th(null, 'Control'),
                    ),
                    ({className: 'Goods'}, goodsCode)
                )
            ),
        );
    },
});

