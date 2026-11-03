import React from 'react';
import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { makeStore } from './redux/store.js';
import reducer from './redux/reducer.js';
import App from './App.jsx';
afterEach(cleanup);
function setup(){ const store=makeStore();render(<Provider store={store}><App/></Provider>);return {store,user:userEvent.setup()}; }
async function add(user,text){await user.type(screen.getByLabelText('What do you need to do?'),text);await user.click(screen.getByRole('button',{name:'Add task +'}));}
test('adds trimmed task to Redux with id, description and isDone',async()=>{
 const {store,user}=setup();await add(user,'  Learn Redux  ');
 expect(store.getState().tasks[0]).toEqual({id:expect.any(String),description:'Learn Redux',isDone:false});
 expect(screen.getByText('Learn Redux')).toBeTruthy();
 expect(screen.getByLabelText('What do you need to do?').value).toBe('');
});
test('rejects empty task',async()=>{const {store,user}=setup();await user.click(screen.getByRole('button',{name:'Add task +'}));expect(screen.getByRole('alert')).toBeTruthy();expect(store.getState().tasks).toHaveLength(0);});
test('toggles task and filters by done and not done',async()=>{
 const {user}=setup();await add(user,'Learn Redux');await add(user,'Practise React');
 await user.click(screen.getByRole('checkbox',{name:'Learn Redux'}));
 await user.click(screen.getByRole('button',{name:'Done',exact:true}));
 expect(screen.getByText('Learn Redux')).toBeTruthy();expect(screen.queryByText('Practise React')).toBeNull();
 await user.click(screen.getByRole('button',{name:'Not done',exact:true}));
 expect(screen.queryByText('Learn Redux')).toBeNull();expect(screen.getByText('Practise React')).toBeTruthy();
 await user.click(screen.getByRole('checkbox',{name:'Practise React'}));expect(screen.getByText('No tasks in this view.')).toBeTruthy();
 await user.click(screen.getByRole('button',{name:'All',exact:true}));expect(screen.getAllByRole('checkbox')).toHaveLength(2);
});
test('edits, validates empty edit, and cancels without changing Redux',async()=>{
 const {store,user}=setup();await add(user,'Old task');await user.click(screen.getByRole('button',{name:'Edit Old task'}));
 await user.clear(screen.getByLabelText('Edit description'));await user.click(screen.getByRole('button',{name:'Save'}));expect(screen.getByRole('alert')).toBeTruthy();
 await user.type(screen.getByLabelText('Edit description'),'Updated task');await user.click(screen.getByRole('button',{name:'Save'}));
 expect(store.getState().tasks[0].description).toBe('Updated task');
 await user.click(screen.getByRole('button',{name:'Edit Updated task'}));await user.type(screen.getByLabelText('Edit description'),' discarded');await user.click(screen.getByRole('button',{name:'Cancel'}));
 expect(store.getState().tasks[0].description).toBe('Updated task');
});
test('adding while Done filter is active reveals the new task',async()=>{const {user}=setup();await user.click(screen.getByRole('button',{name:'Done',exact:true}));await add(user,'New task');expect(screen.getByText('New task')).toBeTruthy();expect(screen.getByRole('button',{name:'All',exact:true}).getAttribute('aria-pressed')).toBe('true');});
test('reducer updates do not mutate existing state',()=>{
 const task=Object.freeze({id:'1',description:'Original',isDone:false});const state=Object.freeze({tasks:Object.freeze([task]),filter:'all'});
 const next=reducer(state,{type:'EDIT_TASK',payload:{id:'1',description:'Edited'}});expect(next.tasks[0].description).toBe('Edited');expect(state.tasks[0].description).toBe('Original');expect(reducer(state,{type:'UNKNOWN'})).toBe(state);
});
