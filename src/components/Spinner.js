import React from 'react'


const Spinner = () => {
    
    const [l, setL] = React.useState(0);
   
    React.useEffect(() => {
        var t = setInterval(() => {
            if (l === 0) {
                setL(50);
            } else {
                setL(0);
            }
        }, 1000);
    }, [l]);
    
    return (
        <div className="spinner">
            <span style={{left: l + 'px'}}></span>
        </div>
    )
}

export default Spinner;