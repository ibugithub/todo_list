import check from './images/check.png';
import checkBox from './images/checkBox.png';
import dotVertical from './images/dotVertical.png';
import bin from './images/bin.png';
import changeTaskStatus from './changeTaskStatus.js';
import crud from './crud.js';
import enter from './images/enter.png';
import refresh from './images/refresh.svg';

class EventHandlarClass {
  constructor() {
    document.querySelector('.ref').src = refresh;
    document.querySelector('.dth').src = enter;
    this.generateTodoStructure();
  }

  //  ** This function will generate the todo list structure
    generateTodoStructure = () => {
      this.todoListContainer = document.querySelector('#todoList_container');
      this.taskData = JSON.parse(localStorage.getItem('tasks')) || [];
      this.todoListContainer.textContent = '';
      this.taskData.forEach((data) => {
        const tdulLi = document.createElement('li');
        tdulLi.classList.add('lsNone', 'tasks');
        const tdulLiBox = document.createElement('div');
        tdulLiBox.classList.add('box');
        const tdBoxImg = document.createElement('img');
        tdBoxImg.classList.add('boxImg');
        tdBoxImg.src = checkBox;
        const tdLiContent = document.createElement('input');
        tdLiContent.classList.add('tdLi_content');
        tdLiContent.value = data.description;
        tdLiContent.setAttribute('index', data.index);
        tdLiContent.setAttribute('isCompleted', data.isCompleted);
        const tdLeft = document.createElement('div');
        tdLeft.classList.add('tdLeft');
        const tdLiOption = document.createElement('div');
        tdLiOption.classList.add('tdLi_option');
        const tdOptionImg = document.createElement('img');
        tdOptionImg.classList.add('imgw40');
        tdOptionImg.src = dotVertical;

        this.todoListContainer.appendChild(tdulLi);
        tdulLi.appendChild(tdLeft);
        tdLeft.appendChild(tdulLiBox);
        tdLeft.appendChild(tdLiContent);
        tdulLi.appendChild(tdLiOption);
        tdulLiBox.appendChild(tdBoxImg);
        tdulLi.appendChild(tdLiOption);
        tdLiOption.appendChild(tdOptionImg);
      });
    };

    // ** This function will toogle between the  white and yellow background for tasklist
    showBinIconAndYellowBg = (event) => {
      const optionContainer = event.target.closest('.tasks').querySelector('.tdLi_option');
      const binImg = event.target.closest('.tasks').querySelector('.imgw40');
      document.querySelectorAll('.tasks').forEach((task) => {
        task.classList.remove('yellowBg');
        const binImg2 = task.querySelector('.tdLi_option').querySelector('.imgw40');
        binImg2.src = dotVertical;
        binImg2.classList.remove('binImg');
        task.querySelector('.tdLi_option').classList.remove('padding_right10');
      });
      event.target.closest('.tasks').classList.add('yellowBg');
      binImg.src = bin;
      binImg.classList.add('binImg');
      optionContainer.classList.add('padding_right10');
      this.handleRemoveClick();
    }

    // ** This function will toogle between check and box icon
    toggleCheckAndBoxIcon = (event) => {
      const binIcon = event.target.closest('.tasks').querySelector('.imgw40');
      const optionContainer = event.target.closest('.tasks').querySelector('.tdLi_option');
      if (event.target.src.includes('checkBox')) {
        event.target.src = check;
        changeTaskStatus.changeAsCompleted(event);
      } else {
        event.target.src = checkBox;
        changeTaskStatus.changeAsNotCompleted(event);
      }
      binIcon.src = dotVertical;
      binIcon.classList.add('binImg');
      optionContainer.classList.add('padding_right10');
    }

    // * this funciton will send the list adding request to the listAdding funciton to
    // * the crud module
    sendToAdd = (event) => {
      crud.handleInputAndEnter(event);
      this.reset();
    }

    // * this function will send adding request for the enter icon
    sendToAddEnterIcon = (event) => {
      crud.addTaskEnterIcon(event);
      this.reset();
    }

    // * this funciton will send request for removing
    sendToRemove = (event) => {
      crud.removeTask(event);
      this.reset();
    }

    // *This function will send request for removing
    sendToEdit = (event) => {
      crud.editTask(event);
    }

    // *This function will send request for clearing all selected list
    sendToClear = () => {
      changeTaskStatus.clearSelectedTask();
      this.reset();
      this.handleClearSelectedButton();
    }

    // * This funciton will regenerate the todo list structure and reassign the
    //  * addEventListener
    reset = () => {
      this.generateTodoStructure();
      this.handleTaskList();
      this.handleCheckClick();
    }

    // * This function will spin te refresh icon
    spinRefreshIcon = (event) => {
      event.target.classList.add('spin');
      setTimeout(() => {
        event.target.classList.remove('spin');
      }, 2000);
    }

    // Handling the the click in task
    handleTaskList = () => {
      const taskLists = document.querySelectorAll('.tdLi_content');
      taskLists.forEach((task) => {
        task.addEventListener('click', this.showBinIconAndYellowBg);
        task.addEventListener('input', this.sendToEdit);
      });
    };

    // Handling the check button click
    handleCheckClick = () => {
      const checkBoxs = document.querySelectorAll('.boxImg');
      checkBoxs.forEach((checkbox) => {
        checkbox.addEventListener('click', this.toggleCheckAndBoxIcon);
      });
    };

    // handling the bin icon click
    handleRemoveClick = () => {
      const removeElement = document.querySelectorAll('.binImg');
      removeElement.forEach((binIcon) => {
        binIcon.addEventListener('click', this.sendToRemove);
      });
    };

    // handling the input of add task input
    handleAddInputElement = () => {
      const inputElement = document.querySelector('#inputElement');
      inputElement.addEventListener('keypress', this.sendToAdd);
    }

    // Handling the refresh interaction
    handleRefressIcon = () => {
      document.querySelector('.ref').addEventListener('click', this.spinRefreshIcon);
    }

    // Handling clear selected button
    handleClearSelectedButton = () => {
      document.querySelector('#clear_selected').addEventListener('click', this.sendToClear);
    }

    // Handling If a task selected or unselected after refreshing the window
    handlingSelectedonRef = () => {
      window.addEventListener('load', () => { changeTaskStatus.checkIfSelected(); });
    }

    // Handling when clicking on enter icon
    handlingEnterIconClick = () => {
      document.querySelector('.dotHorizontal').addEventListener('click', this.sendToAddEnterIcon);
    }
}

const event = new EventHandlarClass();
export default event;