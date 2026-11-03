import { useSelector } from 'react-redux';
import Addtask from './components/Addtask.jsx';
import ListTask from './components/ListTask.jsx';
import './index.css';
export default function App() {
  const tasks = useSelector(state => state.tasks);
  const done = tasks.filter(task => task.isDone).length;
  return <main><header><a href="./" className="brand">MARVIN / TASKS</a><span>ONE THING AT A TIME</span></header>
    <section className="intro"><p className="eyebrow">LESS CLUTTER. MORE PROGRESS.</p><h1>Make space for<br /><em>what matters.</em></h1><p>Write it down, work through it, and enjoy the small wins.</p></section>
    <div className="summary" aria-live="polite"><span><strong>{tasks.length}</strong> Total tasks</span><span><strong>{tasks.length-done}</strong> Not done</span><span><strong>{done}</strong> Done</span></div>
    <Addtask /><ListTask /><footer>React + Redux · Tasks reset when you reload the page.</footer></main>;
}
