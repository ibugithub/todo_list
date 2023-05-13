import './style.css';
import crud from './crud.js';
import todoStructure from './todoStructure.js';
import check from './images/check.png';
import checkBox from './images/checkBox.png';
import dotVertical from './images/dotVertical.png';
import bin from './images/bin.png';
import changeTaskStatus from './changeTaskStatus.js';

class EventHandlarClass {
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

  sendToAdd = (event) => {
    crud.handleInputAndEnter(event);
    this.reset();
  }

  sendToAddEnterIcon = (event) => {
    crud.addTaskEnterIcon(event);
    this.reset();
  }

  sendToRemove = (event) => {
    crud.removeTask(event);
    this.reset();
  }

  sendToEdit = (event) => {
    crud.editTask(event);
  }

  sendToClear = () => {
    changeTaskStatus.clearSelectedTask();
    this.reset();
    this.handleClearSelectedButton();
  }

  reset = () => {
    todoStructure.generateTodoStructure();
    this.handleTaskList();
    this.handleCheckClick();
  }

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

todoStructure.generateTodoStructure();
const eventHandler = new EventHandlarClass();
eventHandler.handleTaskList();
eventHandler.handleCheckClick();
eventHandler.handleAddInputElement();
eventHandler.handleRefressIcon();
eventHandler.handleClearSelectedButton();
eventHandler.handlingSelectedonRef();
eventHandler.handlingEnterIconClick();
