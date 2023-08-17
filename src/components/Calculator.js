import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInput, clearInput, calculateResult,
} from '../redux/actions/calculatorActions';
import './Calculator.css';

function Calculator() {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.calculator.input);
  const result = useSelector((state) => state.calculator.result);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (key === 'Backspace' || key === 'Delete' || key === 'AC') {
        event.preventDefault();
        dispatch(clearInput());
      } else if (/[0-9]/.test(key)) {
        dispatch(setInput(input === '0' ? key : input + key));
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        dispatch(setInput(`${input}${key}`));
      } else if (key === '.' && !input.includes('.')) {
        dispatch(setInput(`${input}.`));
      } else if (key === 'Enter') {
        dispatch(calculateResult());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch, input]);

  const handleNumberClick = (number) => {
    dispatch(setInput(input === '0' ? number : input + number));
  };

  const handleOperatorClick = (operator) => {
    if (input.endsWith('=')) {
      dispatch(setInput(`${result}${operator}`));
    } else {
      dispatch(setInput(`${input}${operator}`));
    }
  };

  const handleDecimalClick = () => {
    if (!input.includes('.') && input !== '') {
      dispatch(setInput(`${input}.`));
    }
  };

  const handleClearClick = () => {
    dispatch(clearInput());
  };

  const handleEqualsClick = () => {
    if (input.endsWith('.')) {
      dispatch(setInput(input.slice(0, -1))); // Remove trailing decimal point
    }
    dispatch(calculateResult());
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        <div>{result || input || '0'}</div>
      </div>
      <div className="button-row">
        <button id="clear" type="button" onClick={handleClearClick} className="double red">AC</button>
        <button id="divide" type="button" onClick={() => handleOperatorClick('/')} className="operator">/</button>
        <button id="multiply" type="button" onClick={() => handleOperatorClick('*')} className="operator">*</button>
      </div>
      <div className="button-row">
        <button id="seven" type="button" onClick={() => handleNumberClick('7')}>7</button>
        <button id="eight" type="button" onClick={() => handleNumberClick('8')}>8</button>
        <button id="nine" type="button" onClick={() => handleNumberClick('9')}>9</button>
        <button id="subtract" type="button" onClick={() => handleOperatorClick('-')} className="operator">-</button>
      </div>
      <div className="button-row">
        <button id="four" type="button" onClick={() => handleNumberClick('4')}>4</button>
        <button id="five" type="button" onClick={() => handleNumberClick('5')}>5</button>
        <button id="six" type="button" onClick={() => handleNumberClick('6')}>6</button>
        <button id="add" type="button" onClick={() => handleOperatorClick('+')} className="operator">+</button>
      </div>
      <div className="button-row">
        <button id="one" type="button" onClick={() => handleNumberClick('1')}>1</button>
        <button id="two" type="button" onClick={() => handleNumberClick('2')}>2</button>
        <button id="three" type="button" onClick={() => handleNumberClick('3')}>3</button>
        <button id="equals" type="button" onClick={handleEqualsClick} className="double-row">=</button>
      </div>
      <div className="button-row last-row">
        <button id="zero" type="button" onClick={() => handleNumberClick('0')} className="double">0</button>
        <button id="decimal" type="button" onClick={handleDecimalClick}>.</button>
      </div>
    </div>
  );
}

export default Calculator;
