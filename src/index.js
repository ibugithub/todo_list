import './style.css';
import check from './images/check.png';
import checkBox from './images/checkBox.png';
import dotVertical from './images/dotVertical.png';
import enter from './images/enter.png';
import refresh from './images/refresh.svg';
import bin from './images/bin.png';

const todoListContainer = document.querySelector('#todoList_container');

// creating the Array of object for the toDoList
const taskData = [

  {
    taskDescription: 'Wash dishes',
    taskIndex: 1,
    isCompleted: true,
  },

  {
    taskDescription: 'Reading reac doc',
    taskIndex: 2,
    isCompleted: true,
  },

  {
    taskDescription: 'Complete toDo List project',
    taskIndex: 3,
    isCompleted: true,
  },

];

// Creating the toDoList's structure
document.querySelector('.ref').src = refresh;
document.querySelector('.dth').src = enter;
taskData.forEach((data) => {
  const tdulLi = document.createElement('li');
  tdulLi.classList.add('lsNone', 'tasks');
  const tdulLiBox = document.createElement('div');
  tdulLiBox.classList.add('box');
  const tdBoxImg = document.createElement('img');
  tdBoxImg.classList.add('boxImg');
  tdBoxImg.src = checkBox;
  const tdLiContent = document.createElement('input');
  tdLiContent.classList.add('tdLi_content');
  tdLiContent.value = data.taskDescription;
  const tdLeft = document.createElement('div');
  tdLeft.classList.add('tdLeft');
  const tdLiOption = document.createElement('div');
  tdLiOption.classList.add('tdLi_option');
  const tdOptionImg = document.createElement('img');
  tdOptionImg.classList.add('imgw40');
  tdOptionImg.src = dotVertical;

  todoListContainer.appendChild(tdulLi);
  tdulLi.appendChild(tdLeft);
  tdLeft.appendChild(tdulLiBox);
  tdLeft.appendChild(tdLiContent);
  tdulLi.appendChild(tdLiOption);
  tdulLiBox.appendChild(tdBoxImg);
  tdulLi.appendChild(tdLiOption);
  tdLiOption.appendChild(tdOptionImg);
});

document.querySelector('#todoList_container').addEventListener('click', (event) => {
  const clickedTask = event.target.closest('.tdLeft');
  const clickedBox = event.target.closest('.boxImg');
  const binImg = event.target.closest('.tasks').querySelector('.imgw40');

  if (clickedTask) {
    const optionContainer = event.target.closest('.tasks').querySelector('.tdLi_option');
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
  }

  if (clickedBox) {
    binImg.src = dotVertical;
    if (clickedBox.src.includes('checkBox')) {
      clickedBox.src = check;
    } else {
      clickedBox.src = checkBox;
    }
  }
});
