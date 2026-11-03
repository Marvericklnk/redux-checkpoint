import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, setFilter } from '../redux/actions.js';
export default function Addtask() {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  function submit(event) {
    event.preventDefault();
    if (!description.trim()) { setError('Write a task before adding it.'); return; }
    dispatch(addTask(description));
    dispatch(setFilter('all'));
    setDescription(''); setError('');
  }
  return <form className="add-form" onSubmit={submit}>
    <label htmlFor="new-task">What do you need to do?</label>
    <div className="add-row"><input id="new-task" value={description} onChange={event => { setDescription(event.target.value); setError(''); }} placeholder="e.g. Practise Redux actions" maxLength={200} /><button>Add task +</button></div>
    {error && <p role="alert" className="error">{error}</p>}
  </form>;
}
