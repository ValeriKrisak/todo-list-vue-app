# Vue Todo List Application

## Overview

This is a Vue.js Todo List application using the Composition API, Pinia for state management, Vite for build tooling, TypeScript for type safety, and Tailwind CSS for styling. The application supports multiple todo lists, allowing users to view, add, toggle, and delete tasks within these lists.

## Features

- **Multiple Todo Lists**: View and manage multiple todo lists.
- **Task Management**: Add, toggle, and delete tasks within each list.
- **Persistence**: Save changes locally and sync with the backend API.
- **Dark Mode**: Toggle between light and dark themes.
- **Validation**: Input validation to ensure valid task entries.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ValeriKrisak/todo-list-vue-app.git
   ```

2. **Navigate to the Project Directory**

```bash
cd todo-list-vue-app
```

3. **Install Dependencies**

```bash
npm install
```

4.**Run the Development Server**

```bash
    npm run dev
```

Open your browser and navigate to http://localhost:[port check in your terminal].

## Project Structure

    src/
        components/: Contains Vue components for the application (e.g., Task.vue, ListDetail.vue).
        store/: Contains Pinia stores for state management (todoStore.ts).
        types/: TypeScript interfaces and types (types.ts).
        utils/: Setup for dark/light theme and validation for input.
        App.vue: Main application component.
        main.ts: Application entry point.

## Usage

- Viewing Todo Lists

  All Lists: Displays all todo lists in a grid.
  List Details: Click on a list to view and manage tasks within that list.

- Managing Tasks

  Add Task: Enter a task description and click the "Add" button (plus icon).
  Toggle Task Status: Click the checkbox next to a task to mark it as complete or incomplete.
  Delete Task: Click the "Delete" button for choosen task to remove it (trashcan icon).

- Dark Mode

  Toggle Dark Mode: Use the button in the top right corner to switch between light and dark themes.

- Local Storage and API Integration

  Local Storage: Changes are saved to local storage and synchronized with the API when the user navigates away from the page or reloads.
  API Integration: The application communicates with a backend API to fetch and update todo lists and tasks.

- License

This project is licensed under the MIT License. See the LICENSE file for details.

- Acknowledgments

  Vue.js: Framework used for building the user interface.
  Pinia: State management library.
  Vite: Build tool and development server.
  TypeScript: Type-safe programming language.
  Tailwind CSS: Utility-first CSS framework.
  Font Awesome: Icon library for the UI.
