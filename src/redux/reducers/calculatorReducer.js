import { createReducer } from '@reduxjs/toolkit';
import * as math from 'mathjs';
import {
  setInput, setResult, clearInput, calculateResult,
} from '../actions/calculatorActions';

const initialState = {
  input: '0',
  result: '',
};

const calculatorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setInput, (state, action) => ({ ...state, input: action.payload }))
    .addCase(setResult, (state, action) => ({ ...state, result: action.payload }))
    .addCase(clearInput, (state) => ({ ...state, input: '0', result: '' }))
    .addCase(calculateResult, (state) => {
      try {
        let evaluated = math.evaluate(state.input.replace(/‑/g, '-'));
        evaluated = parseFloat(evaluated.toFixed(4)); // Limit to 4 decimal places
        return { ...state, result: evaluated.toString(), input: '' };
      } catch (error) {
        return { ...state, result: 'Error', input: '' };
      }
    });
});

export default calculatorReducer;
