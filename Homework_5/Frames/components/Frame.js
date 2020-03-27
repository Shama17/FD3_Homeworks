import React from 'react';


const frame = colors =>  props => {
    let frame = props.children;
    colors.map((color, i) =>
        frame = <div key={i} style={{border: "solid 3px " + color, padding: "10px"}}>{frame}</div>
    );
    return (
            <div>
                {frame}
            </div>
    )
};
export {frame};