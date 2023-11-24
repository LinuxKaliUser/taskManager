# TaskManager Mobile Application

TaskManager is a hybrid mobile application developed using the Ionic framework. It allows users to manage, create, and delete tasks with features such as push notifications for upcoming deadlines and seamless synchronization between various client systems, including mobile and web.

## Project Information

- **Supabase Database Name:** LinusKaliUser
- **GitHub Repository:** [TaskManager Repository](https://github.com/LinuxKaliUser/taskManager)

## User Stories

### 1. Add a New Task

#### Acceptance Criteria:

- Upon opening the app, there is a clear option to add a new task, displaying the task list.
- When adding a new task, I can input the title, description, due date, location, and images.
- The newly added task should appear in the task list.

### 2. Edit an Existing Task

#### Acceptance Criteria:

- In the task list on the homepage, tapping on a task navigates to the detail view.
- The detail view includes an editing option.
- After selecting the editing option, I can modify the title, description, due date, location, and images.
- After saving, the changes are reflected in the task list and detail view.

### 3. Delete a Task

#### Acceptance Criteria:

- In the task list on the homepage, tapping on a task navigates to the detail view.
- The detail view includes a deletion option.
- After selecting the deletion option, a confirmation is displayed.
- Upon confirmation, the task is removed from the list and the backend.

### 4. View Task Details

#### Acceptance Criteria:

- In the task list on the homepage, tapping on a task displays additional details.
- The detail view shows the title, description, due date, attached images, and task location.
- In the detail view, there are options to edit or delete the task.

### 5. Push Notifications

#### Acceptance Criteria:

- Receive a notification when a task is due.
- The notification includes the title of the task.

### 6. Location Details

#### Acceptance Criteria:

- In the task details, the location of the task is displayed.
- In the location view, specifying an address allows navigation to the next address.

## Entity-Relationship Model (ERM)

![Entity-Relationship Model](link-to-your-image)

## Getting Started

To run the TaskManager application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/LinuxKaliUser/taskManager.git`
2. Install dependencies: `npm install`
3. Run the application: `ionic serve`

## Dependencies

- Ionic Framework
- Supabase Database

## Contributing

If you would like to contribute to TaskManager, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
