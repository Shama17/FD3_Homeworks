var Goods = React.createClass({

    displayName: 'Goods',


    propTypes: {
        shop: React.PropTypes.string.isRequired,
    },

    getInitialState: function () {
        return {
            selectedItem: null,
        };
    },
    selectGood: function (eo) {
        this.setState({selectedItem: eo.currentTarget.id});

    },

    deleteGood: function () {

    },

    render: function () {
        console.log(this.state);
        let goodsCode = [];
        this.props.goods.forEach(elem => {
            let goodCode =
                React.DOM.tr({key: elem.code, id: elem.code, classNames: ( 'Goods' +this.state.selectedItem === elem.code ? 'selected': 'null'), onClick: this.selectGood},
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

