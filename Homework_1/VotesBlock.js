var VotesBlock = React.createClass({

    displayName: 'VotesBlock',

    getDefaultProps: function () {
        return {shop: "Не удалось получить название магазина"}
    },

    render: function () {

        let goodsCode = [];
        this.props.goods.forEach(elem => {
            let goodCode =
                React.DOM.tr({key: elem.code, className: 'Good'},
                    React.DOM.td(null, elem.title),
                    React.DOM.td(null, elem.price + ' USD'),
                    React.DOM.td(null, elem.quantity),
                    React.DOM.td(null, React.DOM.img({src: elem.imgURL})),
                );
            goodsCode.push(goodCode)
        });

        return React.DOM.div({className: 'VotesBlock'},
            React.DOM.div({className: 'Shop'}, 'Магазин ' + this.props.shop),
            React.DOM.table({className: 'table'},
                React.DOM.tr(null,
                    React.DOM.th(null, 'Название'),
                    React.DOM.th(null, 'Цена'),
                    React.DOM.th(null, 'Остаток'),
                    React.DOM.th(null, 'Изображение'),
                ),
                ({className: 'Goods'}, goodsCode)
            ),
        );
    },
});

