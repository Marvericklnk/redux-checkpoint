# Redux Checkpoint — ToDo Application

A React ToDo app using Redux to manage global state for the GoMyCode checkpoint.

## Features

- Add a task.
- Mark tasks done or not done with a checkbox.
- Filter by All, Done or Not done.
- Edit a task, save changes, or cancel.
- Reject empty task descriptions.

Each task contains `id`, `description` and `isDone`.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal. Use Node.js 22.12+ or a supported newer LTS version.

```bash
npm test
npm run build
```

## Components

- `Addtask`: adds a task by dispatching an action.
- `ListTask`: reads tasks and the selected filter from Redux, filters the list and renders tasks.
- `Task`: displays one task and dispatches completion and edit actions.

`Provider` gives the components access to the store. `useSelector` reads the store and `useDispatch` sends actions. The reducer creates updated arrays and objects instead of changing the old state directly. Input drafts and edit visibility use local React state; saved tasks and filtering use Redux.

The store uses Redux's `legacy_createStore` exported under the name `createStore`, keeping the reducer/action/store approach covered in the course. Redux Toolkit is another approach, but is not required for this exercise.

Adding a task switches the filter to All so the new task is visible. A new task starts with `isDone: false`. Editing keeps its ID and completion status.

## Checks

Tests cover adding tasks, validation, completion, filtering, editing, cancelling edits and reducer immutability. The production build is checked with Vite.

Tasks are stored in memory and reset after a page reload. No backend, API key or external images are needed. This repository contains the source code; it is not a deployed website.
