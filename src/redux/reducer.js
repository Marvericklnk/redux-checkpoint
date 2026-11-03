export const initialState = { tasks: [], filter: 'all' };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      if (!action.payload.description) return state;
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      return { ...state, tasks: state.tasks.map(task => task.id === action.payload ? { ...task, isDone: !task.isDone } : task) };
    case 'EDIT_TASK':
      if (!action.payload.description) return state;
      return { ...state, tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, description: action.payload.description } : task) };
    case 'SET_FILTER':
      return ['all', 'done', 'notDone'].includes(action.payload) ? { ...state, filter: action.payload } : state;
    default:
      return state;
  }
}
