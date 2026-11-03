import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, toggleTask } from '../redux/actions.js';
export default function Task({ task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.description);
  const [error, setError] = useState('');
  function save(event) {
    event.preventDefault();
    if (!draft.trim()) { setError('The task description cannot be empty.'); return; }
    dispatch(editTask(task.id, draft)); setEditing(false); setError('');
  }
  return <li className={`task ${task.isDone ? 'done' : ''}`}>
    {editing ? <form className="edit-form" onSubmit={save}><label htmlFor={`edit-${task.id}`}>Edit description</label><input autoFocus id={`edit-${task.id}`} value={draft} onChange={event => { setDraft(event.target.value); setError(''); }} maxLength={200} /><div><button>Save</button><button className="secondary" type="button" onClick={() => { setEditing(false); setError(''); }}>Cancel</button></div>{error && <p className="error" role="alert">{error}</p>}</form> : <><label className="task-label"><input type="checkbox" checked={task.isDone} onChange={() => dispatch(toggleTask(task.id))} /><span>{task.description}</span></label><button className="secondary" aria-label={`Edit ${task.description}`} onClick={() => { setDraft(task.description); setEditing(true); }}>Edit</button></>}
  </li>;
}
