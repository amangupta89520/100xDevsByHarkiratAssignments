import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    const [sampleState, setSampleState] = useState(0);
    // Your solution starts here
    // Your solution ends here

    const expensiveValue = useMemo(() => {
        console.log('expensive calculation performed');
        let fact = 1;
        for(let i=1; i<=input; i++) {
            fact = fact * i;
        }
        return fact;
    }, [input]);

    console.log('component re-rendered')

    return (
        <div>
            <input 
                type="number" 
                value={sampleState} 
                onChange={(e) => setSampleState(Number(e.target.value))} 
                onBlur={e => setInput(+e.target.value)}
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}