import React from 'react';

class Br2 extends React.Component {

    static  propTypes = {
        text: React.PropTypes.string.isRequired
    };


    render() {
        let strArr = this.props.text.match(/[а-я]+/g);
        let resArr = [];
        strArr.forEach((elem, i) => {
            resArr.push(elem);
            resArr.push(<br key={i}/>);
        });
        return (
            <div>
                {resArr}
            </div>
        )
    }
}
export default Br2