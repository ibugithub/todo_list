import enter from './images/enter.png';
import refresh from './images/refresh.svg';
import checkBox from './images/checkBox.png';
import dotVertical from './images/dotVertical.png';

// Creating the toDoList's structure
class GenerateTodoStructureClass {
  constructor() {
    document.querySelector('.ref').src = refresh;
    document.querySelector('.dth').src = enter;
  }

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
}

const todoStructure = new GenerateTodoStructureClass();
export default todoStructure;