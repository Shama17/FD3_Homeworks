import React from 'react';


class Item extends React.Component {


    static  propTypes = {
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        quantity: React.PropTypes.number.isRequired,
        imgURL: React.PropTypes.string.isRequired,
        cbSelectItem: React.PropTypes.func.isRequired,
        selectedItem: React.PropTypes.string,

        cbDeleteItem: React.PropTypes.func.isRequired
    };


    selectItem = (eo) => {
        this.props.cbSelectItem(eo.currentTarget.id);
    };

    deleteItem = (eo) => {
        this.props.cbDeleteItem(eo.target.getAttribute('itemID'));
    };

    editItem = (eo) => {
        console.log(eo)
    };

    render() {
        return (<tr id={this.props.id}
                    className={'Goods ' + (+this.props.selectedItem === this.props.id ? 'selected' : '')}
                    onClick={this.selectItem}>
                <td>{this.props.price + ' USD'}</td>
                <td>{this.props.quantity}</td>
                <td><img alt='не загрузилась' src={this.props.imgURL}/></td>
                <td>{this.props.title}</td>
                <td><input type='button' itemID={this.props.id} value='Редактировать' onClick={this.editItem}/>
                    <input type='button' itemID={this.props.id} value='Удалить' onClick={this.deleteItem}/>
                </td>
            </tr>
        )
    }
}

export default Item;