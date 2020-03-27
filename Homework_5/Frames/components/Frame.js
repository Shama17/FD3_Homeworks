import React from 'react';

class Frame extends React.Component {

    static  propTypes = {
        colors: React.PropTypes.array.isRequired
    };


    render() {
        let frame = this.props.children;
        this.props.colors.map((color, i) =>
            frame = <div key={i} style={{border: "solid 3px " + color, padding: "10px"}}>{frame}</div>
        );
        return (
            <div>
                {frame}
            </div>
        )
    }
}

export default Frame;