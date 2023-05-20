class AddRemoveTaskClass {
  handleInputAndEnter = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.addTask(event);
    }
  };

  addTaskEnterIcon = (event) => {
    const inputvalue = event.target.closest('.add_container').querySelector('#inputElement').value;
    if (inputvalue !== '') {
      this.addTask(event);
    }
  };

  addTask = (event) => {
    let inputvalue = event.target.closest('.add_container').querySelector('#inputElement').value;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = {
      description: inputvalue,
      index: tasks.length + 1,
      isCompleted: false,
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputvalue = '';
  };

  removeTask = (event) => {
    const index = event.target.closest('.tasks').querySelector('.tdLi_content').getAttribute('index');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTaskList = tasks.filter((task) => task.index !== parseInt(index, 10));
    this.reArrangeIndex(updatedTaskList);
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

  reArrangeIndex = (taskLists) => {
    let count = 1;
    taskLists.forEach((task) => {
      task.index = count;
      count += 1;
    });
  }
}

const addRemoveTask = new AddRemoveTaskClass();
export default addRemoveTask;