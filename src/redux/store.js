import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './reducers/calculatorReducer';

const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
  },
});

export default store;
