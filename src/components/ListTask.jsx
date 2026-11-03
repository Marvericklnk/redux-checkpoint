import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/actions.js';
import Task from './Task.jsx';
export default function ListTask() {
  const { tasks, filter } = useSelector(state => state);
  const dispatch = useDispatch();
  const visible = tasks.filter(task => filter === 'all' || (filter === 'done' ? task.isDone : !task.isDone));
  return <section aria-label="Task list"><div className="list-heading"><h2>Your tasks</h2><span aria-live="polite">{visible.length} shown · {tasks.length} total</span></div>
    <div className="filters" aria-label="Task filters">{[['all','All'],['notDone','Not done'],['done','Done']].map(([value,label]) => <button key={value} aria-pressed={filter === value} className={filter === value ? 'active' : ''} onClick={() => dispatch(setFilter(value))}>{label}</button>)}</div>
    {visible.length ? <ul>{visible.map(task => <Task key={task.id} task={task} />)}</ul> : <div className="empty" role="status"><h3>{tasks.length ? 'No tasks in this view.' : 'A little space for a fresh start.'}</h3><p>{tasks.length ? 'Choose another filter to see your other tasks.' : 'Add your first task above, then take it one step at a time.'}</p></div>}
  </section>;
}
