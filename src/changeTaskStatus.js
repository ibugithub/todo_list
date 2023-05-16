import check from './images/check.png';

class ChangeTaskStatusClass {
    changeAsCompleted = (event) => {
      const index = event.target.closest('.tasks').querySelector('.tdLi_content').getAttribute('index');
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach((task) => {
        if (task.index === parseInt(index, 10)) {
          task.isCompleted = true;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    changeAsNotCompleted = (event) => {
      const index = event.target.closest('.tasks').querySelector('.tdLi_content').getAttribute('index');
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach((task) => {
        if (task.index === parseInt(index, 10)) {
          task.isCompleted = false;
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

    clearSelectedTask = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTask = tasks.filter((task) => !task.isCompleted);
      this.reArrangeIndex(updatedTask);
      localStorage.setItem('tasks', JSON.stringify(updatedTask));
    }

    checkIfSelected = () => {
      const selectedNodes = document.querySelectorAll('[isCompleted=true]');
      selectedNodes.forEach((node) => {
        const checkedImg = node.closest('.tasks').querySelector('.boxImg');
        checkedImg.src = check;
      });
    }
}

const changeTaskStatus = new ChangeTaskStatusClass();
export default changeTaskStatus;