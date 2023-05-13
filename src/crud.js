class AddRemoveTaskClass {
    handleInputAndEnter = (event) => {
      if (event.key === 'Enter' && event.target.value !== '') {
        this.addTask(event);
      }
    };

    addTask = (event) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const task = {
        description: event.target.value,
        index: tasks.length + 1,
        isCompleted: false,
      };
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    reArrangeIndex = (taskLists) => {
      let count = 1;
      taskLists.forEach((task) => {
        task.index = count;
        count += 1;
      });
      return taskLists;
    }

    removeTask = (event) => {
      const index = event.target.closest('.tasks').querySelector('.tdLi_content').getAttribute('index');
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      let updatedTaskList = tasks.filter((task) => task.index !== parseInt(index, 10));
      updatedTaskList = this.reArrangeIndex(updatedTaskList);
      localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
    }

    editTask = (event) => {
      const index = event.target.closest('.tasks').querySelector('.tdLi_content').getAttribute('index');
      const newDescription = event.target.closest('.tasks').querySelector('.tdLi_content').value;
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach((task) => {
        if (task.index === parseInt(index, 10)) {
          task.description = newDescription;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

const addRemoveTask = new AddRemoveTaskClass();
export default addRemoveTask;