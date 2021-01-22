import React from 'react'
import {useSpring, animated} from 'react-spring';

const Spinner = () => {
    
    const [leftPos, setLeftPos] = React.useState(false);
    const spring = useSpring({
        from: { left: "0px" },
        to: { left: "50px" },
        config: {duration: 500},
        onRest: () => setLeftPos(state => !state),
        reset: leftPos
        })
    return (
        <div className="spinner">
            <animated.span style={spring}></animated.span>
        </div>
    )
}

export default Spinner;