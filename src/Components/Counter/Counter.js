import React, { useState } from 'react';
import CounterValue from '../CounterValue/CounterValue';
import axios from 'axios';
import './Counter.css';

const Counter = () => {
  const [counterValue, setCounterValue] = useState(1);
  const [newCounterValue, setNewCounterValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const maximumValue = process.env.REACT_APP_MAX_VALUE || 1000;  //Taking value of maximumValue from environment variable if present else initialising it to 1000
  const getURL =
    'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json';
  const putURL =
    'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json';

  React.useEffect(() => {
    axios.get(getURL).then(response => {
      setCounterValue(response.data ? response.data : 1);
      setNewCounterValue(response.data ? response.data : 1);
    });
  }, []);  //For initialising counterValue from getURL if any number is returned else equals to 1

  React.useEffect(() => {
    handleChange(counterValue);
  }, [counterValue]); //For making PUT request each time counterValue changes

  const handleChange = value => {
    setCounterValue(value);
    axios
      .put(
        putURL,
        {
          ShivamDwivedi: value,
        },
        setLoading(true),
      )
      .then(response => {
        setNewCounterValue(response.data?.ShivamDwivedi);
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        {loading ? (
          <div className="loader-container">
            <div className="loader"> </div>{' '}
            <div style={{ fontSize: '12px' }}> Saving counter value </div>{' '}
          </div>
        ) : (
          ' '
        )}
      </div>
      <div className="main-container">
        <div className="container">
          <button
            className="decButton"
            onClick={() => setCounterValue(prev => prev - 1)}
          >
            -
          </button>
          <div className="countContainer">
            <input
              type="number"
              value={counterValue}
              onChange={e =>
                e.target.value <= maximumValue
                  ? setCounterValue(+e.target.value)
                  : null
              }  //For initialising a maximimum value  too
            />
          </div>
          <button
            className="incButton"
            onClick={() =>
              setCounterValue(prev =>
                prev + 1 <= maximumValue ? prev + 1 : prev,
              )
            }   //For initialising a maximimum value  too
          >
            +
          </button>
        </div>
        <CounterValue value={newCounterValue} />
      </div>
    </div>
  );
};

export default Counter;
