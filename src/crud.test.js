import AddRemoveTaskClass from './crud.js';
import changeTaskStatus from './changeTaskStatus.js';

describe('AddRemoveTaskClass', () => {
  let addRemoveTask;
  let updateStatus;
  beforeEach(() => {
    addRemoveTask = AddRemoveTaskClass;
    updateStatus = changeTaskStatus;
  });

  describe('addTask', () => {
    test('should add a task to the localStorage', () => {
      // Set up the initial state
      localStorage.setItem('tasks', '[]');

      // Create a mock event object with a target value
      const event = {
        target: {
          closest: () => ({
            querySelector: () => ({
              value: 'test task',
            }),
          }),
        },
      };

      // Call the addTask method
      addRemoveTask.addTask(event);

      // Retrieve the tasks from localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks'));

      // Expect the tasks to have one item
      expect(tasks.length).toBe(1);

      // Expect the added task to have the correct description
      expect(tasks[0].description).toBe('test task');
    });
  });

  describe('removeTask', () => {
    test('should remove a task from the localStorage', () => {
      // Set up the initial state
      const tasks = [
        { description: 'task 1', index: 1, isCompleted: false },
        { description: 'task 2', index: 2, isCompleted: false },
        { description: 'task 3', index: 3, isCompleted: false },
      ];
      localStorage.setItem('tasks', JSON.stringify(tasks));

      // Create a mock event object
      const event = {
        target: {
          closest: () => ({
            querySelector: () => ({
              getAttribute: () => '2',
            }),
          }),
        },
      };

      // Call the removeTask method
      addRemoveTask.removeTask(event);

      // Retrieve the tasks from localStorage
      const updatedTasks = JSON.parse(localStorage.getItem('tasks'));

      // Expect the tasks to have two items after removal
      expect(updatedTasks.length).toBe(2);
    });
  });

  describe('editTask', () => {
    test('editTask should update the description of a task in localStorage', () => {
      // Arrange
      const initialTasks = [
        { description: 'Task 1', index: 1, isCompleted: false },
        { description: 'Task 2', index: 2, isCompleted: false },
      ];
      localStorage.setItem('tasks', JSON.stringify(initialTasks));

      // Create a mock event object with the required properties
      const event = {
        target: {
          closest: () => ({
            querySelector: () => ({
              getAttribute: () => '2',
              value: 'Updated Task 2',
            }),
          }),
        },
      };

      // Act
      addRemoveTask.editTask(event);

      // Assert

      // Retrieve the updated tasks from localStorage
      const updatedTasks = JSON.parse(localStorage.getItem('tasks'));

      // Expect the description of task with index 2 to be updated
      expect(updatedTasks).toEqual([
        { description: 'Task 1', index: 1, isCompleted: false },
        { description: 'Updated Task 2', index: 2, isCompleted: false },
      ]);
    });
  });

  describe('update complete status', () => {
    test('changeAsCompleted should mark a task as completed in localStorage', () => {
      const initialTasks = [
        { description: 'Task 1', index: 1, isCompleted: false },
        { description: 'Task 2', index: 2, isCompleted: false },
      ];
      localStorage.setItem('tasks', JSON.stringify(initialTasks));

      // Create a mock event object with the required properties
      const event = {
        target: {
          closest: () => ({
            querySelector: () => ({
              getAttribute: () => '2',
            }),
          }),
        },
      };
      updateStatus.changeAsCompleted(event);

      // Retrieve the updated tasks from localStorage
      const updatedTasks = JSON.parse(localStorage.getItem('tasks'));

      // Expect the task with index 2 to be marked as completed
      expect(updatedTasks).toEqual([
        { description: 'Task 1', index: 1, isCompleted: false },
        { description: 'Task 2', index: 2, isCompleted: true },
      ]);
    });
  });

  describe('clearSelectedTask', () => {
    test('should clear completed tasks from localStorage', () => {
      // Set up the initial state with some completed and incomplete tasks
      const tasks = [
        { description: 'Task 1', index: 1, isCompleted: true },
        { description: 'Task 2', index: 2, isCompleted: false },
        { description: 'Task 3', index: 3, isCompleted: true },
        { description: 'Task 4', index: 4, isCompleted: false },
      ];
      localStorage.setItem('tasks', JSON.stringify(tasks));

      // Call the clearSelectedTask method
      changeTaskStatus.clearSelectedTask();

      // Retrieve the updated tasks from localStorage
      const updatedTasks = JSON.parse(localStorage.getItem('tasks'));

      // Expect the completed tasks to be cleared
      expect(updatedTasks.length).toBe(2);
      expect(updatedTasks).toEqual([
        { description: 'Task 2', index: 1, isCompleted: false },
        { description: 'Task 4', index: 2, isCompleted: false },
      ]);
    });

    test('should handle empty localStorage', () => {
      // Clear localStorage
      localStorage.clear();

      // Call the clearSelectedTask method
      changeTaskStatus.clearSelectedTask();

      // Retrieve the updated tasks from localStorage
      const updatedTasks = JSON.parse(localStorage.getItem('tasks'));

      // Expect the updated tasks to be an empty array
      expect(updatedTasks).toEqual([]);
    });
  });
});
