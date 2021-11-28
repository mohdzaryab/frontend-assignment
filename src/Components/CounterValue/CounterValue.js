import React from "react";
import './CounterValue.css'

const CounterValue = (props) => {
    return(
        <div className="value">Counter Value: {props.value}</div>
    )
}

export default CounterValue;