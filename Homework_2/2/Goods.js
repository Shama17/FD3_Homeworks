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


    selectGood: function (eo) {
        this.setState({selectedItem: eo.currentTarget.id});

    },

    deleteGood: function (eo) {
        const deletedItem = eo.currentTarget.parentNode.parentNode.id;
        if (confirm('Вы действительно хотите удалить товар')) {
            let items = this.state.goodsArr.filter(elem => elem.code !== +deletedItem);
            this.setState({goodsArr: items, selectedItem: null,});
        }
    },


    render: function () {
        let goodsCode = [];
        this.state.goodsArr.forEach(elem => {
            let goodCode =
                React.DOM.tr({
                        key: elem.code,
                        id: elem.code,
                        className: ('Goods ' + (+this.state.selectedItem === elem.code ? 'selected' : '')),
                        onClick: this.selectGood
                    },
                    React.DOM.td(null, elem.title),
                    React.DOM.td(null, elem.price + ' USD'),
                    React.DOM.td(null, elem.quantity),
                    React.DOM.td(null, React.DOM.img({src: elem.imgURL})),
                    React.DOM.td(null, React.DOM.input({type: 'button', value: 'Удалить', onClick: this.deleteGood}))
                );
            goodsCode.push(goodCode)
        });
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

