export const addTask = description => ({ type: 'ADD_TASK', payload: { id: crypto.randomUUID(), description: description.trim(), isDone: false } });
export const toggleTask = id => ({ type: 'TOGGLE_TASK', payload: id });
export const editTask = (id, description) => ({ type: 'EDIT_TASK', payload: { id, description: description.trim() } });
export const setFilter = filter => ({ type: 'SET_FILTER', payload: filter });
