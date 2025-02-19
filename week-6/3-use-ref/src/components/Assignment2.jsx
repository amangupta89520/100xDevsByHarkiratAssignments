import React, { useState, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [, forceRender] = useState(0);

    const countRef = useRef(0);
    countRef.current++;

    console.log('No. of times component rendered: ', countRef.current)



    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
    };

    return (
        <div>
            <p>This component has rendered {countRef.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};