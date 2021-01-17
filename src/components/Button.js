import React from 'react';
import { useSpring, animated } from 'react-spring';

const Button = (props) => {
    
    const [state, toggle] = React.useState(true);
    const { x } = useSpring({ from: { x: 0 }, x: state ? 1 : 0, config: { duration: 600 } })
    
    return (
        <div className="buttonWrapper" onMouseOver={() => toggle(!state)}>
            <animated.button style={{transform: x
            .interpolate({
              range: [0, 0.25, 0.75, 1],
              output: [1, 0.97, 1.1, 1]
            })
            .interpolate(x => `scale(${x})`)}}>{props.label}</animated.button>
        </div>
    )
}

export default Button