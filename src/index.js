import './style.css';
import crud from './crud.js';
import todoStructure from './todoStructure.js';
import check from './images/check.png';
import checkBox from './images/checkBox.png';
import dotVertical from './images/dotVertical.png';
import bin from './images/bin.png';
// creating the Array of object for the toDoList

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
      } else {
        event.target.src = checkBox;
      }
      binIcon.src = dotVertical;
      binIcon.classList.add('binImg');
      optionContainer.classList.add('padding_right10');
    }

    sendToAdd = (event) => {
      crud.handleInputAndEnter(event);
      this.reset();
    }

    sendToRemove = (event) => {
      crud.removeTask(event);
      this.reset();
    }

    sendToEdit = (event) => {
      crud.editTask(event);
    }

    reset = () => {
      todoStructure.generateTodoStructure();
      this.handleTaskList();
      this.handleCheckClick();
    }

    handleTaskList = () => {
      const taskLists = document.querySelectorAll('.tdLi_content');
      taskLists.forEach((task) => {
        task.addEventListener('click', this.showBinIconAndYellowBg);
        task.addEventListener('input', this.sendToEdit);
      });
    };

    handleCheckClick = () => {
      const checkBoxs = document.querySelectorAll('.boxImg');
      checkBoxs.forEach((checkbox) => {
        checkbox.addEventListener('click', this.toggleCheckAndBoxIcon);
      });
    };

    handleRemoveClick = () => {
      const removeElement = document.querySelectorAll('.binImg');
      removeElement.forEach((binIcon) => {
        binIcon.addEventListener('click', this.sendToRemove);
      });
    };

    handleAddInputElement = () => {
      const inputElement = document.querySelector('#inputElement');
      inputElement.addEventListener('keypress', this.sendToAdd);
    }
}

todoStructure.generateTodoStructure();
const eventHandler = new EventHandlarClass();
eventHandler.handleTaskList();
eventHandler.handleCheckClick();
eventHandler.handleAddInputElement();
