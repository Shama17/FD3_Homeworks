import React from 'react';

import Item from './Item';
import ShopName from './ShopName';

class Goods extends React.Component {

    static  propTypes = {
        goods: React.PropTypes.arrayOf(React.PropTypes.object),
        shop: React.PropTypes.string.isRequired,
    };

    state = {
        goodsArr: this.props.goods,
        selectedItem: null,
        deletedItem: null
    };

    selectItem = (selectItem) => {
        this.setState({selectedItem: selectItem});
    };

    deleteItem = (deleteItem) => {
        this.setState({deleteItem: deleteItem})
        if (confirm('Вы действительно хотите удалить товар')) {
            let items = this.state.goodsArr.filter(elem => elem.code !== +deleteItem);
            this.setState({goodsArr: items, selectedItem: null, deleteItem: null});
        }
    };

    newItem = () => {
        console.log(1)
    };


    render() {
        console.log(this.selectItem);
        var goodsCode = this.state.goodsArr.map(i =>
            <Item key={i.code}
                  id={i.code}
                  title={i.title}
                  price={i.price}
                  quantity={i.quantity}
                  imgURL={i.imgURL}
                  cbSelectItem={this.selectItem}
                  selectedItem={this.state.selectedItem}
                  cbDeleteItem={this.deleteItem}
            />
        );

        return (
            <div className='Goods'>
                <ShopName shop={this.props.shop}/>
                <table className='table'>
                    <tbody>
                    <tr>
                        <th>'Название'</th>
                        <th>'Цена'</th>
                        <th>'Остаток'</th>
                        <th>'Изображение'</th>
                        <th>'Control'</th>
                    </tr>
                    {goodsCode}
                    </tbody>
                </table>
                <input type='button' value='Новый товар' onClick={this.newItem}/>
            </div>
        )
    }
}

export default Goods;