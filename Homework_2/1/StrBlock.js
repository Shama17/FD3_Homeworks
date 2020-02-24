var StrBlock = React.createClass({

    displayName: 'StrBlock',

    propTypes: {
        strArr: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    },

    getInitialState: function () {
        return {
            sorted: false,
            filtered: '',
        };
    },

    inputTxtChanged: function (eo) {
        this.setState({filtered: eo.target.value})
    },

    sorted: function (eo) {
        this.setState({sorted: eo.target.checked});
    },

    prepareArr: function () {
        resultArr = this.props.strArr.slice();
        if (this.state.filtered.length > 0) {
            resultArr = this.props.strArr.filter(elem => {
                if (elem.indexOf(this.state.filtered) !== -1) {
                    return elem
                }
            })
        }
        if (this.state.sorted) {
            resultArr = resultArr.sort()
        }
        return resultArr
    },

    reset() {
        this.setState({sorted: false});
        this.setState({filtered: ''})
    },


    render: function () {
        strings = this.prepareArr().map((elem, index) =>
            React.DOM.option({value: elem, key: index}, elem)
        );
        return React.DOM.div(null,
            React.DOM.input({type: 'checkbox', checked: this.state.sorted, onClick: this.sorted}),
            React.DOM.input({type: 'text', value: this.state.filtered, onChange: this.inputTxtChanged}),
            React.DOM.input({type: 'button', value: 'Сброс', onClick: this.reset}),
            React.DOM.select({name: 'select', size: 10, className: 'block'}, strings),
        )
    },
});

