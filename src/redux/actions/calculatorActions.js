import { createAction } from '@reduxjs/toolkit';

export const setInput = createAction('SET_INPUT');
export const setResult = createAction('SET_RESULT');
export const clearInput = createAction('CLEAR_INPUT');
export const calculateResult = createAction('CALCULATE_RESULT');
export const handleKeyboardInput = createAction('HANDLE_KEYBOARD_INPUT');
