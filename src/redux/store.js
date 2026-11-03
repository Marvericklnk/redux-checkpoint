import { legacy_createStore as createStore } from 'redux';
import reducer from './reducer.js';
// The alias keeps the createStore approach taught in this checkpoint.
export const makeStore = () => createStore(reducer);
const store = makeStore();
export default store;
